const closedWorshops = [
    "KK_DR"
]

async function checkForWorkshop(conn, passCode, participantID) {

    if (closedWorshops.includes(passCode)) {
		return {
			code: 500,
            resMessage: {
                message: "Registration Will Open Soon",
                type: "info",
            }
		};
	}

    console.log(passCode)

    const [checkRegisteredRow, checkRegisteredField] = await conn.execute(`SELECT * FROM SoloRegistration WHERE EventCode = '${passCode}' and ParticipantID = '${participantID}'`);

    if (checkRegisteredRow.length > 0) {
        return {
            code: 400,
            resMessage: {
                message: "You have Already Registered in this Workshop",
                type: "info"
            }
        }
    } else {
        const [fetchAmtRow, fetchAmtField] = await conn.execute(`SELECT PassAmt FROM Passes WHERE PassCode = '${passCode}'`);

        console.log(fetchAmtRow)

        if (fetchAmtRow.length > 0) {
            return {
                code: 200,
                resMessage: {
                    message: "Amount Fetched",
                    type: "success",
                    Amount: fetchAmtRow[0].PassAmt
                }
            }
        } else {
            return {
                code: 500,
                resMessage: {
                    message: "Internal Server Error",
                    type: "error"
                }
            }
        }
    }
}


module.exports = {
    checkForWorkshop
};