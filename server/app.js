const express = require('express');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require("nodemailer");
const mysql = require('mysql2/promise')
const middleware = require('./middleware');
const { createProfile, updateProfile } = require('./db/profileUtil')
const { checkBuyPass, buyPass } = require('./db/buyPass');
const { makePayment } = require('./payment');

const app = express();
const port = process.env.PORT || 3000;
let conn;

(async function initDB() {
    conn = await mysql.createConnection(process.env.DATABASE_URL)
})()

app.use(cors({ accessControlAllowOrigin: '*' }));
app.use(express.json());
app.use(middleware.decodeToken);

let otps = {};

let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_EMAIL_PASS,
    }
});

// OTP Logic

app.post('/api/generateOTP', async (req, res) => {
    const email = req.body.email;

    const [rows, f] = await conn.execute(`SELECT * FROM Participants WHERE Email = '${email}';`)

    if (rows.length > 0)
        return res.status(400).json({ isOTPGenerated: false, message: "User already exist", type: "info" })

    const otp = ("" + Math.random()).substring(2, 8)

    otps[email] = otp;
    // delete otp after 10 minutes
    setTimeout(() => { if (otps[email]) delete otps[email] }, 10 * 60 * 1000);

    transporter.sendMail({
        from: `"Ananta" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: "OTP for login",
        html: `<h1>OTP for login is ${otp}</h1>`,
    })
        .then((isSent) => {
            if (isSent) {
                return res.status(200).json({ isOTPGenerated: true, message: "OTP sent successfully", type: "success" });
            } else {
                delete otps[email]
                return res.status(500).json({ isOTPGenerated: false, message: "Something went wrong", type: "error" });
            }
        })
        .catch((err) => {
            delete otps[email]
            return res.status(500).json({ isOTPGenerated: false, message: "Something went wrong", type: "error" });
        })
});

app.post('/api/verifyOTP', (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const isVerified = otps[email] === otp;
    if (isVerified) delete otps[email];

    return res.json({ isOTPVerified: isVerified, type: isVerified ? "success" : "error" });
});

// Profile Logic

app.post('/api/create-profile', async (req, res) => {
    const bd = req.body;

    const response = await createProfile(conn, bd.email, bd.googleAuth, bd.photoURL);

    return res.status(response.code).json(response.resMessage)
});

app.post('/api/secure/update-profile', async (req, res) => {
    const body = req.body;
    const email = req.user.email;

    const response = await updateProfile(conn, email, body);

    return res.status(response.code).json(response.resMessage)
})

app.get('/api/secure/get-profile', async (req, res) => {
    const email = req.user.email;

    const [rows, f] = await conn.execute(`SELECT ParticipantID, ProfileStatus, Firstname, Lastname, Gender, DOB, City, State, ContactNo, University, Branch, StudyYear, Email, DigitalPoints FROM Participants WHERE Email = '${email}';`)

    if (rows.length === 0) {
        return res.status(404).json({ message: {}, type: "error" })
    } else {
        return res.status(200).json({ message: rows[0], type: "success" })
    }
})

// Buy Pass Logic

app.post('/api/secure/pass/buy', async (req, res) => {
    const { PID, passCode, amt } = req.body

    // participantID = await getParticipantID(email);
    console.log(req.body)
    const response = await buyPass(conn, PID, passCode, amt)

    return res.status(response.code).json(response.resMessage)
    // res.json({ParticipantID : ParticipantID,SelectedEvent : EventCode})
})

app.post('/api/secure/pass/buy/check', async (req, res) => {
    const { passCode, PID } = req.body

    const response = await checkBuyPass(conn, passCode, PID)

    return res.status(response.code).json(response.resMessage)
    // res.json({ParticipantID : ParticipantID,SelectedEvent : EventCode})
})

app.listen(port, () => {
    console.log(`Server listening on PORT : ${port}`);
});