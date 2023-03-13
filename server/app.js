// Dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const mysql = require("mysql2/promise");
const formidable = require("formidable");
const Paytm = require("paytmchecksum");
const https = require("https");


// Required Modules
const middleware = require("./middleware");
const {
	checkEvent,
	registerSoloEvent,
	createTeam,
	joinTeam,
	getTeamInfo,
	getEvents,
	deleteEvent,
	getTeamMembers,
	removeTeamMember
} = require("./db/events");
const { getUniNames, createUniversity, getCoursesNames, createCourse } = require("./db/dropdownData");
const { updateParCoins } = require("./db/AnantaCoins");
const { createProfile, updateProfile } = require("./db/profileUtil");
const { checkBuyPass, buyPass, getTxnDetails } = require("./db/buyPass");
const { autheticateUser, buyPassOffline } = require("./db/buyPassOffline");
const { makePayment } = require("./db/payment");
const { getQOTD, answerQOTD } = require("./db/QOTD");
const { sendResetPassEmail, getParticipantID } = require("./db/util");
const { buyPassMail } = require("./db/mails");
const { checkForWorkshop } = require("./db/workshopRegister");

const app = express();
const port = process.env.PORT || 3000;
let conn;


// --------------- Initializing the MySQL Database Connection....
(async function initDB() {
	conn = await mysql.createConnection(process.env.DATABASE_URL);
})();

app.use(cors({ accessControlAllowOrigin: "*" }));
app.use(express.json());
app.use(middleware.decodeToken);
app.use(express.static(path.join(__dirname, "dist")));


// OTPs Storage Object
let otps = {};

// Creating a Nodemailer Tranporter
let transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_EMAIL_PASS,
	},
});

// Handlebars Option for sending HTML templates in mail...
const handlebarOptions = {
	viewEngine: {
		extName: ".handlebars",
		partialsDir: path.resolve("./Templates"),
		defaultLayout: false,
	},
	viewPath: path.resolve("./Templates"),
	extName: ".handlebars",
};

// Compiling the Handlebars Options.
transporter.use("compile", hbs(handlebarOptions));

// Setting up the routes paths for React and Node seperately. 
app.use((req, res, next) => {
	if (req.url.includes("/api")) return next();
	else return res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Route - Footer User Query
app.post("/api/query", async (req, res) => {
	const email = req.body.email;
	const query = req.body.query;

	console.log(email, query);

	const [addQueryRow, addQueryField] = await conn.execute(
		`INSERT INTO Queries (Email, Query) VALUES ('${email}', '${query}')`
	);

	if (addQueryRow) {
		console.log("Success");
		transporter.sendMail(
			{
				from: `Ananta <${process.env.NODEMAILER_EMAIL}>`,
				to: "support@anantagsfcu.in",
				subject: "Query from " + email,
				template: "Query",
				context: {
					email: email,
					query: query,
				},
			},
			(error, info) => {
				if (error) {
					console.log(error);
					console.log("Mail not sent");
					return res.status(500).json({
						message: "Internal Server Error",
						type: "error",
					});
				} else {
					return res.status(200).json({
						message: "Query Submitted",
						type: "success",
					});
				}
			}
		);
	} else {
		return res.status(500).json({
			message: "Internal Server Error",
			type: "error",
		});
	}
});

// Route - Generating the Sending OTP to participant mail.
app.post("/api/generateOTP", async (req, res) => {
	const email = req.body.email;
	console.log(email);
	const [rows, f] = await conn.execute(
		`SELECT * FROM Participants WHERE Email = '${email}';`
	);

	if (rows.length > 0) {
		if (rows[0].GoogleAuth === 1) {
			return res.status(400).json({
				isOTPGenerated: false,
				message: "User already exists, Please Sign in with Google",
				type: "error",
			});
		} else {
			return res.status(400).json({
				isOTPGenerated: false,
				message: "User already exists, Please Login with email and password",
				type: "error",
			});
		}
	}

	const otp = ("" + Math.random()).substring(2, 8);

	otps[email] = otp;
	// delete otp after 10 minutes
	setTimeout(() => {
		if (otps[email]) delete otps[email];
	}, 10 * 60 * 1000);
	// console.log(LoginOTPHTML(otp))
	transporter.sendMail(
		{
			from: `Ananta <${process.env.NODEMAILER_EMAIL}>`,
			to: email,
			subject: "OTP for login",
			template: "LoginOTP",
			context: {
				otp: otp,
			},
		},
		(error, info) => {
			if (error) {
				delete otps[email];
				console.log("Mail not sent");
				return res.status(500).json({
					isOTPGenerated: false,
					message: "Something went Wrong",
					type: "error",
				});
			} else {
				return res.status(200).json({
					isOTPGenerated: true,
					message: "OTP Sent!",
					type: "success",
				});
			}
		}
	);
});

// Route - Verifying the OTP.
app.post("/api/verifyOTP", async (req, res) => {
	const email = req.body.email;
	const otp = req.body.otp;

	const isVerified = otps[email] === otp;
	if (isVerified) delete otps[email];

	return res.json({
		isOTPVerified: isVerified,
		type: isVerified ? "success" : "error",
	});
});

// Route - Creating a New User Profile
app.post("/api/create-profile", async (req, res) => {
	const bd = req.body;

	console.log(bd);
	const response = await createProfile(
		conn,
		transporter,
		bd.email,
		bd.googleAuth,
		bd.photoURL
	);

	console.log(response);

	return res.status(response.code).json(response.resMessage);
});

// Route - Updating the User Profile
app.post("/api/secure/update-profile", async (req, res) => {
	const body = req.body;
	const email = req.user.email;

	const response = await updateProfile(conn, email, body);

	return res.status(response.code).json(response.resMessage);
});

// Route - Fetching all the Information of a User
app.get("/api/secure/get-profile", async (req, res) => {
	const email = req.user.email;

	const [rows, f] = await conn.execute(
		`SELECT ParticipantID, ProfileStatus, Firstname, Lastname, ProfileImg, TotalEvents, TotalGuests, TotalWorkshops, Gender, City, ContactNo, University, Branch, StudyYear, Email, DigitalPoints, TxnStatus, PassCode FROM Participants WHERE Email = '${email}';`
	);

	if (rows.length === 0) {
		// console.log(rows);
		return res.status(404).json({ message: {}, type: "error", pass: {} });
	} else {
		// console.log(rows[0]);
		const [passRow, passField] = await conn.execute(
			`select * from Passes where PassCode = (Select PassCode from Passes where PassCode = '${rows[0].PassCode}')`
		);
		if (passRow.length > 0) {
			console.log(passRow[0]);
			return res
				.status(200)
				.json({ message: rows[0], type: "success", pass: passRow[0] });
		}
		return res
			.status(200)
			.json({ message: rows[0], type: "success", pass: {} });
	}
});

// Route - Fetch all the Events that Participant has registered in.
app.post("/api/secure/getEvents", async (req, res) => {
	const { email_ } = req.body;

	const participantID = await getParticipantID(conn, email_);

	const response = await getEvents(conn, participantID);

	return res.status(response.code).json(response.resMessage);
});

// Route - Fetch members of given team.
app.post("/api/secure/getTeamMembers", async (req, res) => {
	const { teamID } = req.body;

	const response = await getTeamMembers(conn, teamID);

	return res.status(response.code).json(response.resMessage);
});

// Route - Deleting an Event..
app.post("/api/secure/deleteEvent", async (req, res) => {
	const { pid, eventCode, isSolo, role, teamID } = req.body;

	console.log(pid, eventCode, isSolo, role, teamID);

	const response = await deleteEvent(
		conn,
		pid,
		eventCode,
		isSolo,
		role,
		teamID
	);

	return res.status(response.code).json(response.resMessage);
	// res.json({ParticipantID : ParticipantID,SelectedEvent : EventCode})
});

// Route - Remove Team Member
app.post("/api/secure/removeTeamMember", async (req, res) => {
	const { participantID, teamID } = req.body;

	const response = await removeTeamMember(conn, participantID, teamID);

	return res.status(response.code).json(response.resMessage);
});

// Route - Forgot PassWord -> Reset Pass Mail with Firebase.
app.post("/api/forgotpassword/checkuser", async (req, res) => {
	email = req.body.email;

	const check = await sendResetPassEmail(conn, email);

	console.log(check);

	if (check.resMessage.type === "success") {
		console.log("success send the reset password OTP...");
	} else if (check.resMessage.type === "error") {
		console.log(check.resMessage);
	}

	return res.status(check.code).json(check.resMessage);
});

// Route - Select DropDown Data
app.get("/api/university-list", async (req, res) => {
	const response = await getUniNames(conn);

	return res.status(response.code).json(response.resMessage);
});

// Route - Create University which is not exists in database.
app.post("/api/university-list", async (req, res) => {
	const { value } = req.body;

	const response = await createUniversity(conn, value);

	return res.status(response.code).json(response.resMessage);
});

// Route - Select Courses list
app.get("/api/course-list", async (req, res) => {
	const response = await getCoursesNames(conn);

	return res.status(response.code).json(response.resMessage);
});

// Route - Create Course which does not exists in database.
app.post("/api/course-list", async (req, res) => {
	const { value } = req.body;

	const response = await createCourse(conn, value);

	return res.status(response.code).json(response.resMessage);
});

// Route - Checking whether Participant can buy the pass or not...
app.post("/api/secure/pass/buy/check", async (req, res) => {
	const { passCode, PID, fName, lName, passName } = req.body;
	const { email } = req.user;

	const response = await checkBuyPass(conn, passCode, PID, email, fName, lName, passName);

	console.log(response);
	return res.status(response.code).json(response.resMessage);
});

// Route - Checking whether participant can register in Workshop or not.
app.post("/api/secure/workshop/check", async (req, res) => {
	console.log(req.body);

	const check = await checkForWorkshop(conn, req.body.passCode, req.body.PID)

	return res.status(check.code).json(check.resMessage);
})

// Route - Buy Pass Logic
app.post("/api/secure/pass/buy", async (req, res) => {
	const { PID, passCode, amt } = req.body;

	console.log(req.body);
	const response = await buyPass(conn, PID, passCode, amt);

	return res.status(response.code).json(response.resMessage);
});

// Route - To fetch question of the day
app.get("/api/secure/qotd", async (req, res) => {

	const response = await getQOTD(conn);

	return res.status(response.code).json(response.resMessage);
});

// Route - Answer Question of the day
app.post("/api/secure/qotd", async (req, res) => {
	const { QID, PID, Answer } = req.body;

	const response = await answerQOTD(conn, QID, PID, Answer);

	return res.status(response.code).json(response.resMessage);
});

app.post("/api/buyPassOffline", async (req, res) => {

	const response = await buyPassOffline(
		conn,
		transporter,
		req.body.participantID,
		req.body.passCode,
		req.body.passAmt,
		req.body.enrollmentNo,
		req.body.accessToken,
		req.body.payMode
	);

	return res.json(response.resMessage);
});

// Route - Payment Info send to client
app.post("/api/get-payment-info", async (req, res) => {
	const participantID = await getParticipantID(conn, req.body.email);
	const response = await makePayment(conn, req, participantID, timestamp);

	return res.status(response.code).json(response.resMessage);
});

// Route - Callback function redirected by Payment Gateway.
app.post("/api/payment-callback", async (req, res) => {
	const form = new formidable.IncomingForm();

	let resFields = new Promise((resolve, reject) => {
		form.parse(req, async (err, fields, files) => {
			if (err) {
				console.log(err);
				res.status(500).json({
					message: "Something went wrong",
					type: "error",
				});
			}
			resolve(fields);
		});
	});

	resFields.then(async (resFields) => {
		console.log(resFields);

		let paytmParams = {};

		paytmParams.body = {
			mid: resFields.MID,
			orderId: resFields.ORDERID,
		};

		const paytmChecksum = await Paytm.generateSignature(
			JSON.stringify(paytmParams.body),
			process.env.PAYTM_MERCHANT_KEY
		);

		if (paytmChecksum) {
			paytmParams.head = {
				signature: paytmChecksum,
			};

			let post_data = JSON.stringify(paytmParams);

			let options = {
				/* for Staging */
				hostname: "securegw.paytm.in",
				/* for Production */
				// hostname: 'securegw.paytm.in',
				port: 443,
				path: "/v3/order/status",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Content-Length": post_data.length,
				},
			};

			// Set up the request
			let response = "";
			let post_req = https.request(options, async function (post_res) {
				post_res.on("data", function (chunk) {
					response += chunk;
				});

				post_res.on("end", async function () {
					const data = JSON.parse(response);
					console.log(data);

					const [orderRow, orderField] = await conn.execute(
						`SELECT * FROM Orders WHERE OrderID = '${data.body.orderId}'`
					);

					if (orderRow.length > 0) {
						const passCode = orderRow[0].PassCode;
						const email = orderRow[0].Email;
						const payAmt = orderRow[0].PayAmt;
						const participantID = orderRow[0].ParticipantID;

						// paymentStatus[orderIDEmail[data.body.orderId]] = data.body.resultInfo.resultStatus;

						// const passCode = await assumePassCode(conn, orderIDEmail[data.body.orderId], data.body.txnAmount);

						console.log("ParticipantID:", participantID);
						console.log("Email:", email);
						console.log("OrderID:", orderRow[0].OrderID);
						console.log("Amount:", payAmt);
						console.log("PassCode:", passCode);

						const [nameRow, nameField] = await conn.execute(
							`SELECT Firstname, Lastname FROM Participants WHERE ParticipantID = '${participantID}'`
						);

						console.log("Name is feteched");

						const [passTypeRow, npassTypeField] =
							await conn.execute(
								`SELECT PassType FROM Passes WHERE PassCode = '${passCode}'`
							);

						console.log("PassType is feteched");

						console.log(
							nameRow.length,
							passTypeRow.length,
							data.body.resultInfo.resultStatus
						);
						if (
							nameRow.length > 0 &&
							passTypeRow.length > 0 &&
							data.body.resultInfo.resultStatus == "TXN_SUCCESS"
						) {
							console.log(
								"Pass and Name is fetched successfully"
							);
							const fullname =
								nameRow[0].Firstname +
								" " +
								nameRow[0].Lastname;

							const passType = passTypeRow[0].PassType;

							console.log(fullname, passType);
							const updateDatabase = await buyPass(
								conn,
								participantID,
								passCode,
								data.body
							);
							console.log(updateDatabase);

							const [
								updateOrderStatusRow,
								updateOrderStatusField,
							] = await conn.execute(
								`update Orders set TxnStatus = 'TXN_SUCCESS' where OrderID = '${orderRow[0].OrderID}'`
							);

							if (
								updateDatabase &&
								updateOrderStatusRow &&
								(await buyPassMail(
									transporter,
									data,
									participantID,
									email,
									fullname,
									passType
								))
							) {
								res.redirect(
									`${process.env.REACT_URL}/paymentsuccess`
								);
							} else {
								res.redirect(
									`${process.env.REACT_URL}/paymentfail`
								);
							}
						} else {
							// res.redirect(`${process.env.CLIENT_URL}/paymentfailure/${data.body.orderId}`)
							res.redirect(
								`${process.env.REACT_URL}/paymentfail`
							);
						}
					}
				});
			});

			// post the data
			post_req.write(post_data);
			post_req.end();
		}
	});
});

// Route - Getting Payment Transaction Information to display it to the Participant.
app.post("/api/payment/checkPaymentStatus", async (req, res) => {
	const { email } = req.body;
	// console.log(paymentStatus[email]);

	const txnDetails = await getTxnDetails(conn, email);

	return res.json(txnDetails);
});

// Route - Checking if Participant can register in event or not.
app.post("/api/secure/event/check", async (req, res) => {
	console.log(req.body);
	const { eventCode, email } = req.body;

	// console.log(eventCode, email)

	const participantID = await getParticipantID(conn, email);
	// console.log(participantID)
	const response = await checkEvent(conn, eventCode, participantID);
	console.log(response);

	return res.status(response.code).json(response);
});

// Route - Solo Registration
app.post("/api/secure/events/solo/register", async (req, res) => {
	console.log(req.body);
	const { selectedEventCode, email } = req.body;

	const participantID = await getParticipantID(conn, email);

	const response = await registerSoloEvent(
		conn,
		selectedEventCode,
		participantID
	);
	console.log(response);

	return res.status(response.code).json(response);
});

// Route - Create team For Team Event Registration.
app.post("/api/secure/events/team/create", async (req, res) => {
	console.log(req.body);
	const { selectedEventCode, email, teamName, selectedEventName } = req.body;

	const participantID = await getParticipantID(conn, email);

	const response = await createTeam(
		conn,
		selectedEventCode,
		participantID,
		teamName
	);
	console.log(response);

	if (response.type == "success") {
		console.log("success");
		await transporter
			.sendMail({
				from: `"Ananta" <${process.env.NODEMAILER_EMAIL}>`,
				to: email,
				subject: "Team",
				template: "CreateTeam",
				context: {
					teamName: teamName,
					teamID: response.teamID,
					eventName: selectedEventName,
				},
			})
			.then((info) => {
				console.log(info);
				if (info) {
					response.mailStatus = "success";
				} else {
					response.mailStatus = "error";
				}
			})
			.catch((err) => {
				console.log(err);
				response.mailStatus = err;
			});
	}

	return res.status(response.code).json(response);
});

// Route - Join Team for Team Event Registration.
app.post("/api/secure/events/team/join", async (req, res) => {
	console.log(req.body);
	const { selectedEventCode, email, teamID } = req.body;

	const participantID = await getParticipantID(conn, email);

	const response = await joinTeam(
		conn,
		selectedEventCode,
		participantID,
		teamID
	);
	console.log(response);

	return res.status(response.code).json(response);
});

// Route - Fetching the Information of the Team
app.post("/api/secure/events/team/getinfo", async (req, res) => {
	console.log(req.body);
	const { teamID } = req.body;

	const response = await getTeamInfo(conn, teamID);

	return res.status(response.code).json(response.resMessage);
});

async function genTeamID(conn, eventCode) {
	let teamID = "";

	const [fetchTeamsRows, fetchTeamsFields] = await conn.execute(
		`SELECT * FROM Teams WHERE EventCode = '${eventCode}' order by TeamID desc`
	);

	if (fetchTeamsRows.length > 0) {
		const no = parseInt(fetchTeamsRows[0]["TeamID"].split("_")[2]) + 1;
		console.log(no);
		let teamNo = "";
		if (0 < no && no <= 9) {
			teamNo = "00" + no;
		} else if (9 < no && no <= 99) {
			teamNo = "0" + no;
		} else if (99 < no <= 999) {
			teamNo = "" + no + "";
		}
		teamID = eventCode + "_" + teamNo;

	} else {
		teamID = eventCode + "_" + "001";
	}

	console.log(teamID)

	return 0;
}

// Just for Testing for Hosting...
app.get("/api/test", async (req, res) => {
	await genTeamID(conn, "SW_SOM");
	return res.json("Server is running!");
});

app.post("/api/sendMail", async (req, res) => {
	const auth = await autheticateUser(conn, req.body.enrollmentNo, req.body.accessToken);
	console.log(req.body);
	if (auth.resMessage.type == 'success') {
		if (await buyPassMail(transporter, { body: { txnDate: req.body.txnDate } }, req.body.participantID, req.body.email, req.body.fullname, req.body.passType)) {
			return res.send("Mail sent");
		} else {
			return res.send("Mail sending Failed");
		}
	} else {
		return res.send("Authentication Failed");
	}
});

app.get("/api/updateAP", async (req, res) => {
	const [parRows, parFields] = await conn.execute('SELECT * FROM Participants where TxnAmount > 0');
	if (parRows.length > 0) {
		for(let i = 0; i<parRows.length; i++){
			console.log("Participant No.:" + i+1);
			await updateParCoins(conn, parRows[i].ParticipantID);
		}
	}
	return res.json("Ananta Coins Updated Successfully...");
});





// Server listens at port ...
app.listen(port, () => {
	console.log(`Server listening on PORT : ${port}`);
});