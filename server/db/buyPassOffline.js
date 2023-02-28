// const e = require("express");
const { genPaymentID } = require("./util");
const { buyPassMail } = require("./mails");

const passes = require("../assets/passes.json");

async function updateMarketeersRegistrationCount(conn) {

	const date = new Date(
		new Date().toLocaleString("en-us", {
			timeZone: "Asia/Calcutta",
		})
	);
	const timestamp = `${date.getFullYear()}-${(
		"0" +
		(date.getMonth() + 1)
	).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
		"0" + date.getHours()
	).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
		"0" + date.getSeconds()
	).slice(-2)}`;


	const [rows, fields] = await conn.execute(
		`SELECT TotalRegistration, TotalSchools, TotalWorkshops, Funds, AllInOne.EnrollmentNo from 
		(select count(*) as TotalRegistration, Marketeers.EnrollmentNo from Participants 
		inner join Marketeers 
		on 
		Marketeers.EnrollmentNo = Participants.ContactPerson 
		group by Marketeers.EnrollmentNo
		) as AllPasses 
		
	right join
	
		(select TotalWorkshops, TotalSchools, Funds, Funds.EnrollmentNo from 
			(select TotalSchools, TotalWorkshops, AllWorkshops.EnrollmentNo as EnrollmentNo from 
				(select count(*) as TotalWorkshops, Marketeers.EnrollmentNo as EnrollmentNo from PaymentsOffline 
				inner join 
				Marketeers 
				on 
				Marketeers.EnrollmentNo = PaymentsOffline.ContactPerson 
				and 
				PaymentsOffline.PassCode like "KK%" 
				group by Marketeers.EnrollmentNo
				) as AllWorkshops 
			
			left join
			
				(select count(*) as TotalSchools, Marketeers.EnrollmentNo as EnrollmentNo from PaymentsOffline 
				inner join 
				Marketeers 
				on 
				Marketeers.EnrollmentNo = PaymentsOffline.ContactPerson 
				and 
				PaymentsOffline.PassCode = "SP" 
				group by Marketeers.EnrollmentNo
				) as AllSchools 
				
			on AllSchools.EnrollmentNo = AllWorkshops.EnrollmentNo
			
			) as OnForAll
			
		right join 
		
			(select sum(PaymentsOffline.TxnAmount) as Funds, Marketeers.EnrollmentNo from PaymentsOffline 
			inner join Marketeers 
			on 
			Marketeers.EnrollmentNo = PaymentsOffline.ContactPerson
			group by Marketeers.EnrollmentNo
			) as Funds 
			
		on Funds.EnrollmentNo = OnForAll.EnrollmentNo
		
	) as AllInOne on AllPasses.EnrollmentNo = AllInOne.EnrollmentNo`
	);

	if (rows.length > 0) {
		await conn.execute(
			`update Marketeers set TotalRegistrations = 0, Income = 0, TotalWorkshopsReg = 0, TotalSchools = 0, updated_at = '${timestamp}'`
		);
		
		console.log(rows);
		let i = 0;
		for (i; i < rows.length; i++) {
			console.log("\tEnrollmentNo: " + rows[i].EnrollmentNo != null ? rows[i].EnrollmentNo: 0);
			console.log("\tTotalRegistration: " + rows[i].TotalRegistration);
			console.log("\tIncome: "+ rows[i].Funds != null ? rows[i].Funds : 0)
			console.log("\tTotalWorkshop: "+ rows[i].TotalWorkshops != null ? rows[i].TotalWorkshops : 0)
			console.log("\TotalSchools: "+ rows[i].TotalSchools != null ? rows[i].TotalSchools : 0)
			const sqlquery = `update Marketeers set TotalRegistrations = ${
				rows[i].TotalRegistration != null
					? rows[i].TotalRegistration
					: 0
			}, Income = ${
				rows[i].Funds != null ? rows[i].Funds : 0
			}, TotalWorkshopsReg = ${
				rows[i].TotalWorkshops != null ? rows[i].TotalWorkshops : 0
			}, TotalSchools = ${
				rows[i].TotalSchools != null ? rows[i].TotalSchools : 0
			}, updated_at = '${timestamp}' where EnrollmentNo = '${rows[i].EnrollmentNo}'`;
			console.log(sqlquery);
			const [updateRows, updateFields] = await conn.execute(sqlquery);
		}
		
		if (i == rows.length) {
			console.log("✔ Marketeers Records has been updated successfully.");

			const [rows, fields] = await conn.execute(`SELECT TeamID, sum(TotalWorkshopsReg) as Workshops, sum(TotalRegistrations) as Reg, sum(TotalSchools) as School, sum(Income) as Income from Marketeers group by TeamID;`);

			if (rows.length > 0) {
				await conn.execute(
					`update MarketingTeams set TotalRegistrations = 0, Income = 0, TotalWorkshopsReg = 0, TotalSchools = 0, updated_at = '${timestamp}'`
				);

				let i = 0;
				for (i; i < rows.length; i++) {
					const [updateRows, updateFields] = await conn.execute(
						`update MarketingTeams set TotalRegistrations = ${
							rows[i].Reg != null
								? rows[i].Reg
								: 0
						}, Income = ${
							rows[i].Income != null ? rows[i].Income : 0
						}, TotalWorkshopsReg = ${
							rows[i].Workshops != null ? rows[i].Workshops : 0
						}, TotalSchools = ${
							rows[i].School != null ? rows[i].School : 0
						}, updated_at = '${timestamp}' where TeamID = '${rows[i].TeamID}'`
					);
				}
				if (i == rows.length) {
					console.log(
						"✔ MarketingTeams Records has been updated successfully."
					);

					return true;
				} else {
					console.log("✘ MarketingTeams Records Updation Failed.");
					return false;
				}
			}
			return false;
		} else {
			console.log("✘ Marketeers Records Updation Failed.");
			return false;
		}
	}
	return false;
}

async function updateUniversityRegistratioin(conn) {


	const date = new Date(
		new Date().toLocaleString("en-us", {
			timeZone: "Asia/Calcutta",
		})
	);
	const timestamp = `${date.getFullYear()}-${(
		"0" +
		(date.getMonth() + 1)
	).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
		"0" + date.getHours()
	).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
		"0" + date.getSeconds()
	).slice(-2)}`;


	const [rows, fields] = await conn.execute(
		`select count(*) as Sold, sum(TxnAmount) as Funds, University from Participants where University != '' and TxnAmount > 0 group by University`
	);

	if (rows.length > 0) {
		await conn.execute(
			`update Universities set TotalRegistration=0, Funds = 0, updated_at = '${timestamp}'`
		);

		let i = 0;
		for (i; i < rows.length; i++) {
			const [updateRows, updateFields] = await conn.execute(
				`update Universities set TotalRegistration = ${rows[i].Sold}, Funds = ${rows[i].Funds}, updated_at = '${timestamp}' where University = '${rows[i].University}'`
			);
		}
		if (i == rows.length) {
			console.log("✔ University Records has been updated successfully.");
			return true;
		} else {
			console.log("✘ Universities Records Updation Failed.");
			return false;
		}
	}
	return false;
}

async function updateSoldPasses(conn) {

	const date = new Date(
		new Date().toLocaleString("en-us", {
			timeZone: "Asia/Calcutta",
		})
	);
	const timestamp = `${date.getFullYear()}-${(
		"0" +
		(date.getMonth() + 1)
	).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
		"0" + date.getHours()
	).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
		"0" + date.getSeconds()
	).slice(-2)}`;

	const [rows, fields] = await conn.execute(
		`SELECT PassCode, COUNT(PassCode) as Sold from Participants where PassCode != "NIL" group by PassCode union select EventCode as PassCode, COUNT(EventCode) as Sold from SoloRegistration where EventCode like "KK%" group by EventCode`
	);

	if (rows.length > 0) {
		const [r, f] = await conn.execute(`update Passes set Sold=0, Timestamp = '${timestamp}'`);

		let i = 0;
		for (i; i < rows.length; i++) {
			const [updateRows, updateFields] = await conn.execute(
				`update Passes set Sold = ${rows[i].Sold}, Timestamp = '${timestamp}' where PassCode = '${rows[i].PassCode}'`
			);
		}
		if (i == rows.length) {
			console.log("✔ PassSold Updation Complete.");
			return true;
		} else {
			console.log("✘ PassSold Updation Failed.");
			return false;
		}
	}
	return false;
}

async function getOldPassAmount(conn, participantID) {
	const [rows, fields] = await conn.execute(
		`SELECT TxnAmount FROM Participants where ParticipantID = '${participantID}'`
	);

	if (rows.length > 0) {
		return rows[0].TxnAmount;
	}
	return 0;
}

async function autheticateUser(conn, enrollmentNo, accessToken) {
	const [authAccessRow, authAccessField] = await conn.execute(
		`SELECT AccessToken FROM OrganizingTeam WHERE EnrollmentNo = '${enrollmentNo}'`
	);

	if (authAccessRow.length > 0) {
		if (authAccessRow[0].AccessToken == accessToken) {
			console.log("⦿ Authenticated Successfully...");
			return {
				code: 200,
				resMessage: {
					message: "Authentication Success",
					type: "success",
				},
			};
		} else {
			console.log("⊘ Authenticated Failed...");
			return {
				code: 200,
				resMessage: {
					message: "Authentication Failed",
					type: "error",
				},
			};
		}
	} else {
		console.log("🌻User Not Found");
		return {
			code: 200,
			resMessage: {
				message: "User Not Found...",
				type: "error",
			},
		};
	}
}

// Database Queries to commit the Buy Pass and Upgrade... ------------------------------------
async function buyPassOffline(
	conn,
	transporter,
	participantID,
	passCode,
	payAmt,
	enrollmentNo,
	accessToken,
	payMode
) {
	const authenticate = await autheticateUser(conn, enrollmentNo, accessToken);

	if (authenticate.resMessage.type == "error") {
		return authenticate;
	}

	/* 
    Following Steps must follow to Complete the Payment Process:
    1. INSERT into Payments table.
    2. Check if Pass includes Atmos and insert it into if Participant is not in Atmos table..
    3. UPDATE the Participants table with new pass if the pass is Upgrade.
    */

	const res = {
		code: 400,
		resMessage: {
			message: "",
			type: "error",
			payInsert: 0,
			atmos: 0,
			parUpdate: 0,
		},
	};

	const paymentID = await genPaymentID(conn, passCode);

	const date = new Date(
		new Date().toLocaleString("en-us", {
			timeZone: "Asia/Calcutta",
		})
	);
	const timestamp = `${date.getFullYear()}-${(
		"0" +
		(date.getMonth() + 1)
	).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
		"0" + date.getHours()
	).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
		"0" + date.getSeconds()
	).slice(-2)}`;

	const [insertPaymentRows, insertPaymentFields] = await conn.execute(
		`INSERT INTO PaymentsOffline (PaymentID, ParticipantID, PassCode, TxnStatus, TxnAmount, PaymentMode, TxnDate, ContactPerson) VALUES ('${paymentID}', '${participantID}', '${passCode}', 'TXN_SUCCESS', ${payAmt}, '${payMode}', '${timestamp}', '${enrollmentNo}')`
	);

	// INSERT into Payments
	if (insertPaymentRows && passCode.includes("PS-")) {
		console.log("✔ Payment Record inserted into PaymentsOffline Table.");
		console.log("⟴ Pass Registration Started...");

		res.resMessage.message += "Payment";
		res.resMessage.payInsert = 1;
		res.resMessage.type = "success";

		// Check if Participant has Atmos access or not?
		const [atmosRows, atmosFields] = await conn.execute(
			`SELECT COUNT(ParticipantID) AS Count FROM Atmos WHERE ParticipantID = '${participantID}'`
		);

		if (atmosRows[0].Count == 0) {
			if (["PS-DJ", "PS-C"].includes(passCode)) {
				const [atmosRows, atmosFields] = await conn.execute(
					`INSERT INTO Atmos (ParticipantID, Timestamp) VALUES ('${participantID}', '${timestamp}') `
				);

				if (atmosRows) {
					console.log("✔ Atmos Registration is complete.");
					res.resMessage.message += ", Atmos";
					res.resMessage.atmos = 1;
				}
			}
		}

		const oldAmount = await getOldPassAmount(conn, participantID);

		// Updating the Participant's Pass and Payment Info...
		const [parUpdateRows, parUpdateFields] = await conn.execute(
			`UPDATE Participants SET PassCode = '${passCode}', PaymentID = '${paymentID}', PaymentMode = '${payMode}', TxnAmount = ${
				payAmt + oldAmount
			}, TxnStatus = 'TXN_SUCCESS', Kit = ${
				passes[passCode]["Kit"]
			}, DigitalPoints = ${
				passes[passCode]["DP"]
			}, ContactPerson = '${enrollmentNo}', Timestamp = '${timestamp}', UpdatedAt = '${timestamp}' WHERE ParticipantID = '${participantID}'`
		);

		if (parUpdateRows) {
			console.log("✔ Participant Record updated with new Pass.");
			res.code = 200;
			res.resMessage.message += ", UpdateParticipant";
			res.resMessage.parUpdate = 1;
		} else {
			console.log("✘ Participant Record updated with new Pass Failed...");
			res.code = 200;
			res.resMessage.message += ", UpdateParticipantFailed";
			res.resMessage.parUpdate = 0;
		}
	}

	// KalaKriti Registration
	if (insertPaymentRows && passCode.includes("KK_")) {
		console.log("✔ Payment Record inserted into PaymentsOffline Table.");
		console.log("⟴ Workshops Registration Started");

		res.resMessage.message += "Payment, KK Found";
		res.resMessage.payInsert = 1;
		res.resMessage.kkFound = 1;
		res.resMessage.type = "success";

		const [regKKRows, regKKFields] = await conn.execute(
			`insert into SoloRegistration (EventCode, ParticipantID, Timestamp) values ('${passCode}', '${participantID}', '${timestamp}')`
		);

		if (regKKRows) {
			console.log(
				"✔ Payment Record inserted into SoloRegistration Table."
			);
			res.code = 200;
			res.resMessage.message += ", InertKK";
			res.resMessage.insertKK = 1;

			const [fetchKKRows, fetchKKFields] = await conn.execute(
				`select TotalWorkshops from Participants where ParticipantID = '${participantID}'`
			);

			if (fetchKKRows.length > 0) {
				const [updateParRows, updateParFields] = await conn.execute(
					`update Participants set TotalWorkshops = ${
						fetchKKRows[0].TotalWorkshops + 1
					} where ParticipantID = '${participantID}'`
				);
				if (updateParRows) {
					console.log(
						"✔ Total Workshop count is updated in Participant Table."
					);
					res.code = 200;
					res.resMessage.message += ", updateParticipant";
					res.resMessage.parUpdate = 1;
				} else {
					console.log(
						"✘ Participant Record updated with new Pass Failed..."
					);
					res.code = 500;
					res.resMessage.message += ", updateParticipantFailed";
					res.resMessage.parUpdate = 0;
					res.resMessage.type = "error";
				}
			} else {
				console.log("✘ Participant Not Found...");
				res.code = 500;
				res.resMessage.message += ", ParticipantNotFound";
				res.resMessage.parFound = 0;
				res.resMessage.type = "error";
			}
		} else {
			console.log("✘ Participant Not Found...");
			res.code = 200;
			res.resMessage.message += ", InertKKFailed";
			res.resMessage.insertKK = 0;
			res.resMessage.type = "error";
		}
	}

	if (
		(await updateSoldPasses(conn)) &&
		(await updateUniversityRegistratioin(conn)) &&
		(await updateMarketeersRegistrationCount(conn))
	) {
		res.resMessage.message += ", PassesSoldUpdated";
		res.resMessage.updateSold = 1;
	} else {
		res.resMessage.message += ", PassesSoldUpdatedFailed";
		res.resMessage.updateSold = 1;
		res.resMessage.type = "error";
	}

	//Sending Mail
	if (passCode.includes("PS-")) {
		console.log(`➔ Pass Sending it to Mail Begins.............`);
		const [parRows, parFields] = await conn.execute(
			`SELECT Participants.ParticipantID, Email, Firstname, Lastname, PassType, PaymentsOffline.TxnDate AS Timestamp FROM Participants INNER JOIN Passes INNER JOIN PaymentsOffline ON Participants.PassCode = Passes.PassCode AND Participants.PaymentID = PaymentsOffline.PaymentID WHERE Participants.ParticipantID = '${participantID}'`
		);

		if (parRows.length > 0) {
			let data = { body: { txnDate: parRows[0].Timestamp } };
			const sendMail = await buyPassMail(
				transporter,
				data,
				participantID,
				parRows[0].Email,
				parRows[0].Firstname + " " + parRows[0].Lastname,
				parRows[0].PassType
			);

			if (sendMail) {
				res.resMessage.message += ", MailSent";
				res.resMessage.mailsent = 1;
			} else {
				res.resMessage.message += ", MailSentFailed";
				res.resMessage.updateSold = 0;
			}
		}
	} else {
		console.log("⋙ Workshop Sending it to Mail Begins.............");
		const [parRows, parFields] = await conn.execute(
			`SELECT * FROM Participants where ParticipantID = '${participantID}'`
		);

		if (parRows.length > 0) {
			const [payOfflineRows, payOfflineFields] = await conn.execute(
				`SELECT * FROM PaymentsOffline where PassCode = '${passCode}' and ParticipantID = '${participantID}'`
			);

			if (payOfflineRows.length > 0) {
				const [passRows, passFields] = await conn.execute(
					`SELECT * FROM Passes WHERE PassCode = '${passCode}'`
				);

				if (passRows.length > 0) {
					let data = { body: { txnDate: payOfflineRows[0].TxnDate } };
					const sendMail = await buyPassMail(
						transporter,
						data,
						participantID,
						parRows[0].Email,
						parRows[0].Firstname + " " + parRows[0].Lastname,
						passRows[0].PassType
					);

					if (sendMail) {
						res.resMessage.message += ", MailSent";
						res.resMessage.mailsent = 1;
					} else {
						res.resMessage.message += ", MailSentFailed";
						res.resMessage.updateSold = 0;
					}
				}
			}
		}
	}

	return res;
}

module.exports = {
	buyPassOffline,
};
