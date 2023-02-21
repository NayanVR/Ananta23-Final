const { genParticipantID } = require('util');

async function createProfile(conn, transporter, email, googleAuth, profileImg) {
    // console.log();
    console.log('ashish');
    //check if participant already exist with given email id
    const [checkRows, checkFields] = await conn.execute(`SELECT * FROM Participants WHERE Email = '${email}';`)
    console.log(checkRows)
    if (checkRows.length > 0) {
        console.log('aman')
        //!TODO handle if user's log in method is email&pass
        if (checkRows[0].GoogleAuth === 0 && googleAuth === 'TRUE') {
            // update info if user is migrating account to google
            const [updateRows, updateFields] = await conn.execute(`UPDATE Participants SET GoogleAuth=${googleAuth}, ProfileImg='${profileImg}' WHERE Email = '${email}';`);
            console.log("profile updated")
            return { code: 200, resMessage: { message: "Profile Updated", type: "success" } };
        } else {
            console.log("login with google")
            return { code: 200, resMessage: { message: "Login with google", type: "success" } };
        }
    } else {
        console.log("inserting the record...")
        let id = await genParticipantID(conn, email);

        // create new participant
        let query = `INSERT INTO Participants (ProfileStatus, TxnStatus, ParticipantID, Email, ProfileImg, GoogleAuth) VALUES (FALSE, FALSE, '${id}', '${email}', '${profileImg}', ${googleAuth});`;

        const [profileRows, profileFields] = await conn.execute(query)

        if (profileRows) {
            transporter.sendMail(
                {
                    from: `Ananta <${process.env.NODEMAILER_EMAIL}>`,
                    to: email,
                    subject: "Account Verification and Steps for Registration",
                    template: "InfoEmail",
                },
                (error, info) => {
                    if (error) {
                        console.log("Mail Not Sent...")
                    } else {
                        console.log("Mail send successfully...")
                    }
                }
            );
            return { code: 200, resMessage: { message: "Profile created successfully", type: "success" } };
        } else {
            return { code: 500, resMessage: { message: "Internal Server Error", type: "error" } };
        }
    }
}

async function updateProfile(conn, email, body) {
    const { fName, lName, contactNo, uniName, branch, gender, city } = body;

    const [rows, fields] = await conn.execute(`UPDATE Participants SET ProfileStatus=TRUE, Firstname='${fName}', Lastname='${lName}', ContactNo='${contactNo}', University='${uniName}', Branch='${branch}', Gender='${gender}', City='${city}' WHERE Email = '${email}'`);

    if (rows) {
        return { code: 200, resMessage: { message: "Profile Updated", type: "success" } };
    } else {
        return { code: 500, resMessage: { message: "Internal Server Error", type: "error" } };
    }
}

module.exports = {
    createProfile,
    updateProfile
}