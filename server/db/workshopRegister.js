const closedWorshops = [
    // "KK_DR"
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

        const [checkLimitRows, checkLimitFields] = await conn.execute(`SELECT * FROM Events WHERE EventCode = '${passCode}'`);

        if (
            checkLimitRows[0]["TotalRegistration"] <
            checkLimitRows[0]["MaxRegistration"]
        ) {
            const [fetchAmtRow, fetchAmtField] = await conn.execute(`SELECT PassAmt FROM Passes WHERE PassCode = '${passCode}'`);

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
        } else {
            return { 
                code: 200, 
                resMessage: {
                    message: "Vacancy Full",
                    type: "warning" 
                }
            };
        }
    }
}


module.exports = {
    checkForWorkshop
};