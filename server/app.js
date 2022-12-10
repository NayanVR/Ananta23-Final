const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
require('dotenv').config();
const middleware = require('./middleware');
const mysql = require('mysql2')

const app = express();
const conn = mysql.createConnection(process.env.DATABASE_URL)
const port = process.env.PORT || 3000;

app.use(cors());
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

app.get('/api/secure/user', (req, res) => {
    const user = req.user;
    conn.query('SELECT * FROM users', function (err, rows, fields) {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json({ message: rows });
    })
});

app.post('/api/generateOTP', (req, res) => {
    const email = req.body.email;
    const otp = ("" + Math.random()).substring(2, 8)

    otps[email] = otp;
    // delete otp after 10 minutes
    setTimeout(() => { if (otps[email]) delete otps[email] }, 10 * 60 * 1000);

    transporter.sendMail({
        from: `"Nayan Radadiya" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: "OTP for login",
        html: `<h1>OTP for login is ${otp}</h1>`,
    })
        .then((isSent) => {
            if (isSent) {
                return res.status(200).json({ isOTPGenerated: true, message: "OTP sent successfully" });
            } else {
                delete otps[email]
                return res.status(500).json({ isOTPGenerated: false, message: "Something went wrong" });
            }
        })
        .catch((err) => {
            delete otps[email]
            return res.status(500).json({ isOTPGenerated: false, message: "Something went wrong" });
        })
});

app.post('/api/verifyOTP', (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const isVerified = otps[email] === otp;
    if (isVerified) delete otps[email];

    return res.json({ isOTPVerified: isVerified });
});

app.listen(port, () => {
    console.log(`Server listening on PORT : ${port}`);
});