const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();
app.use(cors());
app.use(express.json());

let otps = {};

let nodemailerEmail = "nvradadiya281@gmail.com";

let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: nodemailerEmail,
        pass: process.env.NODEMAILER_EMAIL_PASS,
    }
});

app.post('/api/generateOTP', (req, res) => {
    const email = req.body.email;
    const otp = ("" + Math.random()).substring(2, 8)

    otps[email] = otp;
    setTimeout(() => { delete otps[email] }, 10 * 60 * 1000);

    transporter.sendMail({
        from: `"Nayan Radadiya" <${nodemailerEmail}>`,
        to: email,
        subject: "OTP for login",
        html: `<h1>OTP for login is ${otp}</h1>`,
    })
        .then((isSent) => {
            if (isSent) {
                return res.status(200).json({ isOTPGenerated: true, message: "OTP sent successfully" });
            } else {
                return res.status(500).json({ isOTPGenerated: false, message: "Something went wrong" });
            }
        })
        .catch((err) => {
            return res.status(500).json({ isOTPGenerated: false, message: "Something went wrong" });
        })
});

app.post('/api/verifyOTP', (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const isVerified = otps[email] === otp;
    if (isVerified) delete otps[email];

    console.log(otps);

    return res.json({ isOTPVerified: isVerified });
});

app.listen(port, () => {
    console.log(`Server listening on PORT : ${port}`);
});