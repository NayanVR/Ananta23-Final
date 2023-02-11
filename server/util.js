async function genParticipantID(conn, email) {
	let emailName = email.split("@")[0];

	let firstChar = emailName[0];
	let middleChar = emailName[Math.floor(emailName.length / 2)];
	let lastChar = emailName[emailName.length - 1];

	let CharsString = "AaBbCcDcEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz012345678"

	let result = "";
	// const charactersLength = CharsString.length;
	for (let i = 0; i < 12; i++) {
		result += CharsString.charAt(
			Math.floor(Math.random() * CharsString.length)
		);
	}

	const id =
		"A23_" +
		result


	console.log(id);
	

	const [checkParticipantIDRows, checkParticipantIDFields] =
		await conn.execute(
			`SELECT ParticipantID FROM Participants WHERE ParticipantID = '${id}'`
		);

	if (checkParticipantIDRows.length > 0) {
		return await genParticipantID(conn, email);
	} else {
	console.log(id);
		return id;
	}
}

async function genPaymentID(conn, passCode) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < 7; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}

	const [checkPaymentIDRows, checkPaymentIDFields] = await conn.execute(
		`SELECT PaymentID FROM Payments WHERE PaymentID = '${
			passCode + result
		}'`
	);

	if (checkPaymentIDRows.length > 0) {
		return await genPaymentID(conn, passCode);
	} else {
		return passCode + result;
	}
}

async function sendResetPassEmail(conn, email) {
	const [rows, f] = await conn.execute(
		`SELECT * FROM Participants WHERE Email = '${email}';`
	);

	if (rows.length == 0) {
		return {
			code: 400,
			resMessage: {
				isOTPGenerated: false,
				message: "User not found",
				type: "error",
			},
		};
	}

	if (rows[0].GoogleAuth == 1) {
		return {
			code: 200,
			resMessage: {
				isOTPGenerated: false,
				message: "You are registered with Google",
				type: "error",
			},
		};
	}

	return {
		code: 200,
		resMessage: {
			isOTPGenerated: true,
			message: "Mail sent",
			type: "success",
		},
	};
}

async function getParticipantID(conn, email) {
	const [row, field] = await conn.execute(
		`SELECT ParticipantID FROM Participants WHERE Email = '${email}'`
	);
	if (row.length > 0) {
		return row[0].ParticipantID;
	}
}

async function assumePassCode(conn, email, amt) {
	console.log(email, amt);
	const query = `select PassCode from Passes where PassAmt = (SELECT sum(Payments.TxnAmount) FROM Participants INNER JOIN Payments ON Participants.ParticipantID=Payments.ParticipantID where Email='${email}')+${amt}`;
	console.log(query);
	const [result, f] = await conn.execute(query);
	console.log(result.length);
	if (result.length > 0) {
		console.log(result);
		return result[0].PassCode;
	} else {
		const [sqlR, sqlF] = await conn.execute(
			`SELECT PassCode FROM Passes WHERE PassAmt = ${parseInt(amt)}`
		);
		console.log(sqlR);
		if (sqlR.length > 0) {
			return sqlR[0].PassCode;
		}
	}
}

module.exports = {
	genParticipantID,
	genPaymentID,
	sendResetPassEmail,
	assumePassCode,
	getParticipantID,
};
