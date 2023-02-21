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
} = require("./db/events");
const { createProfile, updateProfile } = require("./db/profileUtil");
const { checkBuyPass, buyPass, getTxnDetails } = require("./db/buyPass");
const { buyPassOffline } = require("./db/buyPassOffline");
const { makePayment } = require("./db/payment");
const { sendResetPassEmail, getParticipantID } = require("./db/util");
const { buyPassMail } = require("./db/mails");

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
				to: process.env.NODEMAILER_EMAIL,
				subject: "Query",
				template: "Query",
				context: {
					email: email,
					query: query,
				},
			},
			(error, info) => {
				if (error) {
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

	if (rows.length > 0)
		return res.status(400).json({
			isOTPGenerated: false,
			message: "User Already Exists",
			type: "error",
		});

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

// Creating a New User Profile
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

// Updating the User Profile
app.post("/api/secure/update-profile", async (req, res) => {
	const body = req.body;
	const email = req.user.email;

	const response = await updateProfile(conn, email, body);

	return res.status(response.code).json(response.resMessage);
});

// Fetching all the Information of a User
app.get("/api/secure/get-profile", async (req, res) => {
	const email = req.user.email;

	const [rows, f] = await conn.execute(
		`SELECT ParticipantID, ProfileStatus, Firstname, Lastname, ProfileImg, TotalEvents, TotalGuests, TotalWorkshops, Gender, City, ContactNo, University, Branch, Email, DigitalPoints, TxnStatus, PassCode FROM Participants WHERE Email = '${email}';`
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


app.post("/api/secure/getEvents", async (req, res) => {
	const { email_ } = req.body;

	// participantID = await getParticipantID(email);
	console.log(req.body);
	const participantID = await getParticipantID(conn, email_);

	console.log(participantID);
	const response = await getEvents(conn, participantID);

	return res.status(response.code).json(response.resMessage);
	// res.json({ParticipantID : ParticipantID,SelectedEvent : EventCode})
});

app.post("/api/secure/deleteEvent", async (req, res) => {
	const { pid, eventCode, isSolo, role, teamID } = req.body;

	console.log(req.body);
	const response = await deleteEvent(
		conn,
		pid,
		eventCode,
		isSolo,
		role,
		teamID
	);

	console.log(response);

	return res.status(response.code).json(response.resMessage);
	// res.json({ParticipantID : ParticipantID,SelectedEvent : EventCode})
});

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

app.post("/api/secure/pass/buy/check", async (req, res) => {
	const { passCode, PID } = req.body;

	const response = await checkBuyPass(conn, passCode, PID);

	console.log(response);
	return res.status(response.code).json(response.resMessage);
	// res.json({ParticipantID : ParticipantID,SelectedEvent : EventCode})
});

// Buy Pass Logic
app.post("/api/secure/pass/buy", async (req, res) => {
	const { PID, passCode, amt } = req.body;

	// participantID = await getParticipantID(email);
	console.log(req.body);
	const response = await buyPass(conn, PID, passCode, amt);

	return res.status(response.code).json(response.resMessage);
	// res.json({ParticipantID : ParticipantID,SelectedEvent : EventCode})
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

// Payment Logic
app.post("/api/get-payment-info", async (req, res) => {
	const participantID = await getParticipantID(conn, req.body.email);
	const response = await makePayment(conn, req, participantID, timestamp);

	// if (response.code == 200) {
	// console.log(response.resMessage.EMAIL, response.resMessage.ORDER_ID);
	// orderIDEmail[response.resMessage.ORDER_ID] = response.resMessage.EMAIL;
	// console.log(orderIDEmail[response.resMessage.ORDER_ID])

	// setTimeout(() => {
	// 	if (orderIDEmail[response.resMessage.ORDER_ID]) delete orderIDEmail[response.resMessage.ORDER_ID];
	// }, 30 * 60 * 1000);

	// }

	return res.status(response.code).json(response.resMessage);
});

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

app.post("/api/payment/checkPaymentStatus", async (req, res) => {
	const { email } = req.body;
	// console.log(paymentStatus[email]);

	const txnDetails = await getTxnDetails(conn, email);

	return res.json(txnDetails);
});

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

app.post("/api/secure/events/team/getinfo", async (req, res) => {
	console.log(req.body);
	const { teamID } = req.body;

	const response = await getTeamInfo(conn, teamID);

	return res.status(response.code).json(response.resMessage);
});

app.get("/api/test", (req, res) => {
	res.json("Server is running!");
});

app.listen(port, () => {
	console.log(`Server listening on PORT : ${port}`);
});
