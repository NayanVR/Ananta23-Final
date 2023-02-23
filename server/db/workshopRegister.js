const { Connect } = require("aws-sdk");

async function checkForWorkshop(conn, eventCode, participantID) {

    console.log(eventCode)

    const [checkRegisteredRow, checkRegisteredField] = await conn.execute(`SELECT * FROM SoloRegistration WHERE EventCode = '${eventCode}' and ParticipantID = '${participantID}'`);

    if (checkRegisteredRow.length > 0) {
        return {
            code: 500,
            resMessage: {
                message: "You have Already Registered in this Workshop",
                type: "info"
            }
        }
    } else {
        const [fetchAmtRow, fetchAmtField] = await conn.execute(`SELECT PassAmt FROM Passes WHERE PassCode = '${eventCode}'`);

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