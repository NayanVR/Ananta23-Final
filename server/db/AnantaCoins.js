async function updateCoins(conn, PID, amount, isAdd) {
	const [getCoinRows, getCoinFields] = await conn.execute(
		"SELECT DigitalPoints FROM Participants WHERE ParticipantID = ?",
		[PID]
	);

	if (getCoinRows.length > 0) {
		const currentCoins = getCoinRows[0].DigitalPoints;
		const newCoins = isAdd ? currentCoins + amount : currentCoins - amount;

		if (newCoins < 0) {
			return {
				code: 400,
				resMessage: {
					message: "Insufficient coins",
					type: "error",
				},
			};
		} else {
			const [rows, fields] = await conn.execute(
				"UPDATE Participants SET DigitalPoints = ? WHERE ParticipantID = ?",
				[newCoins, PID]
			);
			if (rows.affectedRows > 0) {
				return {
					code: 200,
					resMessage: {
						message: "Coins updated",
						type: "success",
					},
				};
			} else {
				return {
					code: 400,
					resMessage: {
						message: "Error updating coins",
						type: "error",
					},
				};
			}
		}
	} else {
		return {
			code: 400,
			resMessage: {
				message: "Participant not found",
				type: "error",
			},
		};
	}
}

async function updateParCoins(conn, participantID) {
	/*
    Source of Ananta Coins
    1. Pass
    2. Workshops
    3. DigitalWallet (Fun Events and Attendence)
    4. Question of the Day.

    */

	let anantaCoins = 0;

	// Pass Coins
	const [parRow, parField] = await conn.execute(
		`SELECT * FROM Participants where ParticipantID = '${participantID}'`
	);
	if (parRow.length > 0) {
		const [passRow, passField] = await conn.execute(
			`SELECT * FROM Passes where PassCode = '${parRow[0].PassCode}'`
		);
		if (passRow.length > 0) {
			anantaCoins = anantaCoins + parseInt(passRow[0].DigitalPoints);
		}
	}

	// Workshops
    const [kkRow, kkFields] = await conn.execute(`SELECT sum(DigitalPoints) as ap FROM SoloRegistration as sr inner join Passes as ps on sr.EventCode = ps.PassCode WHERE sr.EventCode like "KK_%" and sr.ParticipantID = '${participantID}'`);
    if (kkRow.length > 0) {
        if (!(kkRow[0].ap == null)) {
            anantaCoins = anantaCoins + parseInt(kkRow[0].ap);
        }
    }

    // Digital Wallet (Fun Events and Attendence of Event and Workshops Points)
    const [dwRow, dwFields] = await conn.execute(`SELECT SUM(PointsInserted) as Debit, SUM(PointsReturned) as Credit FROM DigitalWallet WHERE ParticipantID = '${participantID}'`);
    if (dwRow.length > 0) {
        if (!(dwRow[0].Debit == null || dwRow[0].Credit == null)){
            anantaCoins = anantaCoins - parseInt(dwRow[0].Debit);
            anantaCoins = anantaCoins + parseInt(dwRow[0].Credit);
        }
    }


    // Question of the Day
    const [qotdRow, qotdField] = await conn.execute(`SELECT SUM(CoinsTransferred) as qotdCoins FROM AnswersEntries WHERE ParticipantID = '${participantID}'`);
    if (qotdRow.length > 0) {
        if (!(qotdRow[0].qotdCoins == null)) {
            anantaCoins = anantaCoins + parseInt(qotdRow[0].qotdCoins);
        }
    }

    // Updation of the ParticipantTable.
    const [updateParRow, updateParField] = await conn.execute(`UPDATE Participants SET DigitalPoints = ${anantaCoins} WHERE ParticipantID = '${participantID}'`);
    if (updateParRow) {
        console.log("✔ ParticipantID: ", participantID,", & AnantaCoins: ", anantaCoins);
        return true;
    }

	return false;
}


async function updateParRegCount(conn, participantID) {
	/*

	1. SoloRegistration - Not for EQ or KK
	2. TeamRegistration

	*/
	let totalEvents = 0;
	let totalWorkshops = 0;
	let totalGuests = 0;
	console.log(participantID);
	// SoloRegistration Inertia and Swoosh
	const [inSoloRows, inSoloFields] = conn.execute(`SELECT COUNT(*) as totalSoloEvent FROM SoloRegistration WHERE ParticipantID = '${participantID}' and (EventCode not like "KK%" or EventCode not like "EQ%")`)

	if (inSoloRows.length > 0) {
		if (inSoloRows[0].totalSoloEvent != null) {
			totalEvents = totalEvents + parseInt(inSoloRows[0].totalSoloEvent);
		}
	}


	// Team Registration
	const [inTeamRows, inTeamFields] = conn.execute(`SELECT COUNT(*) as totalSoloEvent FROM TeamRegistration WHERE ParticipantID = '${participantID}'`)

	if (inswinTeamRowsRows.length > 0) {
		if (inTeamRows[0].totalSoloEvent != null) {
			totalEvents = totalEvents + parseInt(inTeamRows[0].totalSoloEvent);
		}
	}


	// Workshop
	const [kkRows, kkFields] = conn.execute(`SELECT COUNT(*) as totalWorkshop FROM SoloRegistration WHERE ParticipantID = '${participantID}' and EventCode like "KK%"`)

	if (kkRows.length > 0) {
		if (kkRows[0].totalWorkshop != null) {
			totalWorkshops = totalWorkshops + parseInt(kkRows[0].totalWorkshop);
		}
	}


	// Workshop
	const [eqRows, eqFields] = conn.execute(`SELECT COUNT(*) as totalGuests FROM SoloRegistration WHERE ParticipantID = '${participantID}' and EventCode like "EQ%"`)

	if (eqRows.length > 0) {
		if (eqRows[0].totalGuests != null) {
			totalGuests = totalGuests + parseInt(eqRows[0].totalGuests);
		}
	}

	console.log("Total Events: ", totalEvents);
	console.log("Total Workshops: ", totalWorkshops);
	console.log("Total Events: ", totalGuests);


	// Workshop
	// const [updateRows, updateFields] = conn.execute(`UPDATE Participants SET TotalEvents = ${totalEvents}, TotalGuests = ${totalGuests}, TotalWorkshops = ${totalWorkshops} WHERE ParticipantID = '${participantID}'`)

	// if (updateRows) {
	// 	return true;
	// }
	return true;





}

module.exports = {
	updateCoins,
    updateParCoins,
	updateParRegCount
};
