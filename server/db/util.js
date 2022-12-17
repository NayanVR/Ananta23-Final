const { v4: uuidv4 } = require('uuid');

async function createProfile(conn, email, password, googleAuth, profileImg) {

    //check if participant already exist with given email id
    const [checkRows, checkFields] = await conn.execute(`SELECT * FROM Participants WHERE Email = '${email}';`)

    if (checkRows.length > 0) {
        if (checkRows[0].GoogleAuth === 0 && googleAuth === 'TRUE') {
            // update info if user is migrating account to google
            console.log(profileImg);
            const [updateRows, updateFields] = await conn.execute(`UPDATE Participants SET GoogleAuth=${googleAuth}, ProfileImg='${profileImg}' WHERE Email = '${email}';`)
            return { code: 200, resMessage: { message: "Profile Updated" } };
        } else {
            return { code: 200, resMessage: { message: "Please Login with google" } };
        }
    } else {
        const id = uuidv4();

        // create new participant
        let query = `INSERT INTO Participants (ProfileStatus, PaymentStatus, ParticipantID, Email, Password, ProfileImg, GoogleAuth) VALUES (FALSE, FALSE, '${id}', '${email}', '${password}', '${profileImg}', ${googleAuth});`;

        const [profileRows, profileFields] = await conn.execute(query)

        if (profileRows) {
            return { code: 200, resMessage: { message: "Profile created successfully" } };
        } else {
            return { code: 500, resMessage: { message: "Internal Server Error" } };
        }
    }
}

module.exports = {
    createProfile
}