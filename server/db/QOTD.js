const { updateCoins } = require('./AnantaCoins');

async function getQOTD(conn) {
    //getdate with india timezone
    const today = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);

    const todayDate = year + '-' + month + '-' + day;

    const [rows, fields] = await conn.execute(`SELECT * FROM Questions WHERE DateToShow='${todayDate}'`);

    if (rows.length > 0) {
        return {
            code: 200,
            resMessage: {
                message: 'Question Found',
                type: "success",
                data: rows[0]
            }
        }
    } else {
        return {
            code: 200,
            resMessage: {
                message: 'Question Not Found',
                type: "error",
                data: {}
            }
        }
    }
}

async function answerQOTD(conn, QID, ParticipantID, AnswerByUser) {

    const [checkRows, checkFields] = await conn.execute(`SELECT * FROM AnswersEntries WHERE QID=${QID} AND ParticipantID='${ParticipantID}'`);

    if (checkRows.length > 0) {
        return {
            code: 200,
            resMessage: {
                message: 'You have already answered this question',
                type: "error"
            }
        }
    } else {
        const [rows, fields] = await conn.execute(`SELECT * FROM Questions WHERE QID=${QID}`);

        if (rows.length > 0) {

            if (rows[0]['Answer'] === AnswerByUser) {
                const reward = rows[0]['Reward'];

                const [entryRows, entryFields] = await conn.execute(`INSERT INTO AnswersEntries (QID, ParticipantID, Status, CoinsTransferred) VALUES (${QID}, '${ParticipantID}', 'CORRECT', ${reward})`);

                const { code, resMessage } = await updateCoins(conn, ParticipantID, reward, true);

                if (code === 200) {
                    return {
                        code: 200,
                        resMessage: {
                            message: "Your Answer is Correct",
                            type: "success"
                        }
                    }
                }
            } else {
                const [rows, fields] = await conn.execute(`INSERT INTO AnswersEntries (QID, ParticipantID, Status, CoinsTransferred) VALUES (${QID}, '${ParticipantID}', 'INCORRECT', 0)`);

                return {
                    code: 200,
                    resMessage: {
                        message: "Your Answer is Incorrect",
                        type: "success"
                    }
                }
            }
        } else {
            return {
                code: 200,
                resMessage: {
                    message: 'Question Not Found',
                    type: "error"
                }
            }
        }
    }
}

module.exports = {
    getQOTD,
    answerQOTD
}