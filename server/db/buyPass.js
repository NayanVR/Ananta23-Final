const { genPaymentID } = require("../util");

const passes = {
	"PS-B": {
		Amount: 1,
		DP: 2000,
		Kit: 0,
		TotalEvents: 2,
		TotalGuests: 1,
		TotalWorkshops: 0,
		Atmos: 0,
	},
	"PS-S": {
		Amount: 2,
		DP: 2500,
		Kit: 0,
		TotalEvents: 4,
		TotalGuests: 2,
		TotalWorkshops: 0,
		Atmos: 0,
	},
	"PS-G": {
		Amount: 3,
		DP: 3000,
		Kit: 1,
		TotalEvents: 30,
		TotalGuests: 6,
		TotalWorkshops: 0,
		Atmos: 0,
	},
	"PS-DJ": {
		Amount: 4,
		DP: 4490,
		Kit: 0,
		TotalEvents: 0,
		TotalGuests: 0,
		TotalWorkshops: 0,
		Atmos: 1,
	},
	"PS-C1": {
		Amount: 5,
		DP: 5490,
		Kit: 1,
		TotalEvents: 30,
		TotalGuests: 6,
		TotalWorkshops: 0,
		Atmos: 1,
	},
	"PS-C2": {
		Amount: 5,
		DP: 5490,
		Kit: 1,
		TotalEvents: 0,
		TotalGuests: 0,
		TotalWorkshops: 10,
		Atmos: 1,
	},
};

async function getOldPassAmount(conn, participantID) {
	const [rows, fields] = await conn.execute(
		`SELECT TxnAmount FROM Participants where ParticipantID = '${participantID}'`
	);

	if (rows.length > 0) {
		return rows[0].TxnAmount;
	}
	return 0;
}

async function getTxnDetails(conn, email) {
    const [rows, fields] = await conn.execute(
		`SELECT py.OrderID as OrderID, pa.PassType as PassType, py.TxnStatus as TxnStatus, py.TxnID as TxnID, py.TxnDate as TxnDate FROM Payments as py inner join Passes as pa on py.PassCode = pa.PassCode and py.PaymentID = ( SELECT PaymentID FROM Participants WHERE Email = '${email}')`
	);

	if (rows.length > 0) {
		return rows;
	}
	return {};
}

// Check If the Selected Pass can be buy or Upgraded...
async function checkBuyPass(conn, selectedPassCode, participantID) {
	const [parRows, parfields] = await conn.execute(
		`SELECT ParticipantID, ProfileStatus, TxnStatus, TotalWorkshops, TotalEvents, TotalGuests, PassCode FROM Participants WHERE ParticipantID = '${participantID}'`
	);

	// Check If Participant Exists
	if (parRows.length < 1) {
		return {
			code: 404,
			resMessage: { message: "Participant Not Found", type: "error" },
		};
	} else {
		// Check If Profile is Completed
		if (parRows[0].ProfileStatus == 0) {
			return {
				code: 400,
				resMessage: { message: "Profile Not Completed", type: "error" },
			};
		}

		// Check if new Registration or need Upgrade
		if (parRows[0].TxnStatus == 0) {
			return {
				code: 200,
				resMessage: {
					message: "Buying First Pass",
					type: "success",
					payAmount: passes[selectedPassCode].Amount,
				},
			};
		} else {
			const parPassCode = parRows[0].PassCode;
			const parEventCount = parRows[0].TotalEvents;
			const parGuestCount = parRows[0].TotalGuests;
			const parWorkshopCount = parRows[0].TotalWorkshops;

			// If Both Purchased and Selected Pass are Same
			if (parPassCode == selectedPassCode) {
				return {
					code: 400,
					resMessage: { message: "Same Pass", type: "error" },
				};
			}

			// If Amount of Selected Pass is Less than that of Purchased Pass
			if (passes[parPassCode].Amount > passes[selectedPassCode].Amount) {
				return {
					code: 400,
					resMessage: {
						message: "Can't Downgrade Pass",
						type: "error",
					},
				};
			}

			// If Pass is from same categories.
			// Eg:
			//    PassBought is Bronze(2E and 1G) and PassSelected is Gold(4E and 2G)
			//    PassBought is Silver(2E and 1G) and PassSelected is Gold(4E and 2G)
			//    PassBought is Bronze(2E and 1G) and PassSelected is Combo 1(AllE and AllG + DJ)
			if (
				["PS-B", "PS-S", "PS-G", "PS-C1", "PS-DJ"].includes(
					parPassCode
				) &&
				["PS-S", "PS-G", "PS-C1"].includes(selectedPassCode)
			) {
				return {
					code: 200,
					resMessage: {
						message: "Upgrade Pass",
						type: "success",
						payAmount:
							passes[selectedPassCode].Amount -
							passes[parPassCode].Amount,
					},
				};
			}

			// If Pass is Combo 2(AllW + DJ)
			// Eg:
			//    PassBought is Bronze(2E and 1G) and PassSelected is Combo2(All W)
			//    PassBought is Combo 1(AllE and AllG + DJ) and PassSelected is Combo2(All W +DJ)
			if (
				["PS-B", "PS-S", "PS-G", "PS-C1", "PS-DJ"].includes(
					parPassCode
				) &&
				["PS-C2"].includes(selectedPassCode)
			) {
				if (parEventCount > 0 || parGuestCount > 0) {
					return {
						code: 400,
						resMessage: {
							message:
								"Remove Registered Events & Guest Lectures",
							type: "error",
						},
					};
				} else {
					return {
						code: 200,
						resMessage: {
							message: "Upgrade Pass",
							type: "success",
							payAmount:
								passes[selectedPassCode].Amount -
								passes[parPassCode].Amount,
						},
					};
				}
			}

			// If Pass is DJ Pass
			// Eg:
			//    PassBought is Bronze, Silver or Gold and PassSelected is DJ Pass
			if (
				["PS-B", "PS-S", "PS-G"].includes(parPassCode) &&
				["PS-DJ"].includes(selectedPassCode)
			) {
				if (parEventCount > 0 || parGuestCount > 0) {
					return {
						code: 400,
						resMessage: {
							message:
								"Remove Registered Events & Guest Lectures",
							type: "error",
						},
					};
				} else {
					return {
						code: 200,
						resMessage: {
							message: "Upgrade Pass",
							type: "success",
							payAmount:
								passes[selectedPassCode].Amount -
								passes[parPassCode].Amount,
						},
					};
				}
			}

			// If Pass is Combo 1
			// Eg:
			//    PassBought is Combo 2 and PassSelected is Combo 1
			if (
				["PS-C2"].includes(parPassCode) &&
				["PS-C1"].includes(selectedPassCode)
			) {
				if (parWorkshopCount > 0) {
					return {
						code: 400,
						resMessage: {
							message: "Remove Registered Workshops",
							type: "error",
						},
					};
				} else {
					return {
						code: 200,
						resMessage: {
							message: "Upgrade Pass",
							type: "success",
							payAmount:
								passes[selectedPassCode].Amount -
								passes[parPassCode].Amount,
						},
					};
				}
			}

			return {
				code: 400,
				resMessage: { message: "Invalid Pass", type: "error" },
			};
		}
	}
}

// Database Queries to commit the Buy Pass and Upgrade... ------------------------------------
async function buyPass(conn, participantID, passCode, paymentData) {
	/* 
    Following Steps must follow to Complete the Payment Process:
    1. INSERT into Payments table.
    2. Check if Pass includes Atmos and insert it into if Participant is not in Atmos table..
    3. UPDATE the Participants table with new pass if the pass is Upgrade.
    */

	console.log(participantID, passCode, paymentData);

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

	const [insertPaymentRows, insertPaymentFields] = await conn.execute(
		`INSERT INTO Payments (PaymentID, ParticipantID, PassCode, TxnID, BankTxnID, TxnStatus, OrderID, TxnAmount, TxnType, GatewayName, BankName, PaymentMode, TxnDate) VALUES ('${paymentID}', '${participantID}', '${passCode}', ${paymentData.txnId}, '${paymentData.bankTxnId}', '${paymentData.resultInfo.resultStatus}', '${paymentData.orderId}', ${paymentData.txnAmount}, '${paymentData.txnType}', '${paymentData.gatewayName}', '${paymentData.bankName}', '${paymentData.paymentMode}', '${paymentData.txnDate}')`
	);

	console.log(
		`INSERT INTO Payments (PaymentID, ParticipantID, PassCode, TxnID, BankTxnID, TxnStatus, OrderID, TxnAmount, TxnType, GatewayName, BankName, PaymentMode, TxnDate) VALUES ('${paymentID}', '${participantID}', '${passCode}', ${paymentData.txnId}, ${paymentData.bankTxnId}, '${paymentData.resultInfo.resultStatus}', '${paymentData.orderId}', ${paymentData.txnAmount}, '${paymentData.txnType}', '${paymentData.gatewayName}', '${paymentData.bankName}', '${paymentData.paymentMode}', '${paymentData.txndate}')`
	);

	// INSERT into Payments
	if (insertPaymentRows) {
		res.resMessage.message += "Payment";
		res.resMessage.payInsert = 1;
		res.resMessage.type = "success";

		// Check if Participant has Atmos access or not?
		const [atmosRows, atmosFields] = await conn.execute(
			`SELECT COUNT(ParticipantID) AS Count FROM Atmos WHERE ParticipantID = '${participantID}'`
		);

		if (atmosRows[0].Count == 0) {
			if (["PS-DJ", "PS-C1", "PS-C2"].includes(passCode)) {
				const [atmosRows, atmosFields] = await conn.execute(
					`INSERT INTO Atmos (ParticipantID) VALUES ('${participantID}') `
				);

				if (atmosRows) {
					res.resMessage.message += ", Atmos";
					res.resMessage.atmos = 1;
				}
			}
		}

        const oldAmount = await getOldPassAmount(conn, participantID)
		console.log(oldAmount)

		// Updating the Participant's Pass and Payment Info...
		const [parUpdateRows, parUpdateFields] = await conn.execute(
			`UPDATE Participants SET PassCode = '${passCode}', PaymentID = '${paymentID}', PaymentMode = '${paymentData.paymentMode}', TxnAmount = ${paymentData.txnAmount + oldAmount}, TxnStatus = '${paymentData.resultInfo.resultStatus}', Kit = ${passes[passCode]["Kit"]}, DigitalPoints = ${passes[passCode]["DP"]} WHERE ParticipantID = '${participantID}'`
		);

		console.log(
			`UPDATE Participants SET PassCode = '${passCode}', PaymentID = '${paymentID}', PaymentMode = '${paymentData.paymentMode}', TxnAmount = ${paymentData.txnAmount}, TxnStatus = '${paymentData.resultInfo.resultStatus}', Kit = ${passes[passCode]["Kit"]}, DigitalPoints = ${passes[passCode]["DP"]} WHERE ParticipantID = '${participantID}'`
		);

		if (parUpdateRows) {
			res.code = 200;

			res.resMessage.message += ", UpdateParticipant";
			res.resMessage.parUpdate = 1;
		}

		console.log(res);
		return res;
	} else {
		res.resMessage.message = "Payment Failed";
		return res;
	}
}

module.exports = {
	checkBuyPass,
	buyPass,
    getTxnDetails
};
