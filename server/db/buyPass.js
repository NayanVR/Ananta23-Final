const { genPaymentID } = require("../util");

async function updateParticipants(
    conn,
    passCode,
    passAmt,
    paymentID,
    participantID,
    kit
) {
    const [updParRows, updParFields] = await conn.execute(
        `UPDATE Participants SET PassCode = '${passCode}', PaymentID = '${paymentID}', PaymentStatus = 1, PaymentMode = 'Online', PaymentAmt = ${passAmt}, Kit = ${kit} WHERE ParticipantID = '${participantID}' `
    );

    if (updParRows) {
        return "Payment Successful";
    }
    return "update failed...";
}

async function insertPaymentRecord(
    conn,
    participantID,
    passCode,
    passAmt,
    oldAmt,
    isupgrade
) {
    const paymentID = genPaymentID(passCode);
    console.log(paymentID);

    let amount = passAmt;
    if (isupgrade) {
        amount = passAmt - oldAmt;
    }

    const [payrow, payfields] = await conn.execute(
        `INSERT INTO Payments (PaymentID, ParticipantID, PassCode, OrderNo, PaymentMode, PaymentStatus, PaymentAmt) VALUES ('${paymentID}', '${participantID}', '${passCode}', 12345678, 'Online', 1, '${amount}')`
    );

    if (payrow) {
        console.log(
            "['PS-DJ', 'PS-C1', 'PS-C2'].includes(passCode)",
            ["PS-DJ", "PS-C1", "PS-C2"].includes(passCode)
        );

        const [checkAtmRows, checkAtmFields] = await conn.execute(
            `SELECT * FROM Atmos WHERE ParticipantID = '${participantID}'`
        );

        if (checkAtmRows.length > 0) {
            if (
                (await updateParticipants(
                    conn,
                    passCode,
                    passAmt,
                    paymentID,
                    participantID,
                    (kit = "1")
                )) == "Payment Successful"
            ) {
                return "Done";
            } else {
                return "Failed";
            }
        } else {
            if (["PS-DJ", "PS-C1", "PS-C2"].includes(passCode)) {
                const [atmRow, atmFields] = await conn.execute(
                    `INSERT INTO Atmos (ParticipantID) VALUES ('${participantID}')`
                );

                console.log(atmRow.length);
                if (atmRow) {
                    if (
                        (await updateParticipants(
                            conn,
                            passCode,
                            passAmt,
                            paymentID,
                            participantID,
                            (kit = "1")
                        )) == "Payment Successful"
                    ) {
                        return "Done";
                    } else {
                        return "Failed";
                    }
                }
            } else {
                if (
                    (await updateParticipants(
                        conn,
                        passCode,
                        passAmt,
                        paymentID,
                        participantID,
                        (kit = "0")
                    )) == "Payment Successful"
                ) {
                    return "Done";
                } else {
                    return "Failed";
                }
            }
        }
    } else {
        return {
            code: 500,
            resMessage: {
                message: "Internal Server Error",
            },
        };
    }
}

async function checkProfileStatus(conn, email) {
    const [rows, fields] = await conn.execute(
        `SELECT ProfileStatus FROM Participants WHERE Email = '${email}'`
    );
    if (rows.len > 0) {
        if (rows[0]['ProfileStatus'] == true) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

async function buyPass(conn, passCode, email) {

    // Checking whether Profile is done or not.
    if (!checkProfileStatus(conn, email)) {
        return 'Profile is not set...';
    }


    // Fetching the ParticipantID to insert it into Payments and Atmos table according to Passes.
    const [parRows, parfields] = await conn.execute(
        `SELECT ParticipantID, PaymentStatus, PaymentAmt FROM Participants WHERE Email = '${email}'`
    );

    const participantID = parRows[0]["ParticipantID"];
    console.log(participantID);

    const [passRows, passFields] = await conn.execute(
        `SELECT PassAmt FROM Passes WHERE PassCode = '${passCode}'`
    );

    if (parRows.length > 0 && passRows.length > 0) {
        const passAmt = passRows[0]["PassAmt"];
        console.log(passAmt);

        console.log(
            "parRows[0]['PaymentStatus'] == true && parRows[0]['PaymentAmt'] > 0",
            parRows[0]["PaymentStatus"] == true && parRows[0]["PaymentAmt"] > 0
        );

        if (
            parRows[0]["PaymentStatus"] == true &&
            parRows[0]["PaymentAmt"] >= passAmt
        ) {
            return "You can't Upgrade to Low Passes";
        } else if (
            parRows[0]["PaymentStatus"] == true &&
            parRows[0]["PaymentAmt"] < passAmt
        ) {
            if (
                await insertPaymentRecord(
                    conn,
                    participantID,
                    passCode,
                    passAmt,
                    parRows[0]["PaymentAmt"],
                    true
                )
            ) {
                return "done";
            }
            return;
        } else {
            console.log("Assume Online Payment Done");

            if (
                await insertPaymentRecord(
                    conn,
                    participantID,
                    passCode,
                    passAmt,
                    0,
                    false
                )
            ) {
                return "done";
            }
        }
    } else {
        return "User Doesn't Exist";
    }
}

module.exports = {
    buyPass,
};
