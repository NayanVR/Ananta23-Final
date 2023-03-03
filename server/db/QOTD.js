async function getQOTD(conn) {
    //getdate with india timezone
    const today = new Date (
        new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"})
    );

    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);

    const todayDate = year + '-' + month + '-' + day;
    console.log(`SELECT * FROM Questions WHERE DateToShow=${todayDate}`);

    const [rows, fields] = await conn.execute(`SELECT * FROM Questions WHERE DateToShow='${todayDate}'`);

    if (rows.length > 0) {
        return {
            code: 200,
            message: 'Question Found',
            type: "success",
            data: rows[0]
        }
    } else {
        return {
            code: 404,
            message: 'Question Not Found',
            type: "error",
            data: null
        }
    }
}

async function answerQOTD(conn, QID, ParticipantID, AnswerByUser) {

    const [checkRows, checkFields] = await conn.execute(`SELECT * FROM AnswersEntries WHERE QID=${QID} AND ParticipantID='${ParticipantID}'`);

    if (checkRows.length > 0) {
        return {
            code: 403,
            message: 'You have already answered this question',
            type: "error"
        }
    } else {
        const [rows, fields] = await conn.execute(`SELECT * FROM Questions WHERE QID=${QID}`);

        if (rows.length > 0) {
        
            if(rows[0]['Answer'] === AnswerByUser) {
                const reward = rows[0]['Reward'];

                const [entryRows, entryFields] = await conn.execute(`INSERT INTO AnswersEntries (QID, ParticipantID, Status, CoinsTransferred) VALUES (${QID}, '${ParticipantID}', 'CORRECT', ${reward})`);

                return {
                    code: 200,
                    message: "Your Answer is Correct",
                    type: "success"
                }
            } else {
                const [rows, fields] = await conn.execute(`INSERT INTO AnswersEntries (QID, ParticipantID, Status, CoinsTransferred) VALUES (${QID}, '${ParticipantID}', 'INCORRECT', 0)`);

                return {
                    code: 200,
                    message: "Your Answer is Incorrect",
                    type: "success"
                }
            }
        } else {
            return {
                code: 404,
                message: 'Question Not Found',
                type: "error",
                data: null
            }
        }
    }
}

module.exports = {
    getQOTD,
    answerQOTD
}