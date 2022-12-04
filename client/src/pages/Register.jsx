import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState("")
    const [otpScreen, setOtpScreen] = useState(false)

    async function handleInfoSubmit(e) {
        e.preventDefault()

        const res = await fetch("http://localhost:3000/api/generateOTP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })

        const data = await res.json()
        console.log(data);

        setOtpScreen(data.isOTPGenerated)
    }

    async function handleOTPSubmit(e) {
        e.preventDefault()

        const res = await fetch("http://localhost:3000/api/verifyOTP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, otp })
        })

        const data = await res.json()

        if (data.isOTPVerified) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        } else {
            setOtp("")
        }
    }

    return (
        <div>
            Register
            <br />
            {
                !otpScreen ?
                    <form onSubmit={handleInfoSubmit}>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="email" required placeholder="Email" />
                        <br />
                        <input onChange={e => setPassword(e.target.value)} value={password} type="password" required placeholder="Password" />
                        <br />
                        <button>Next</button>
                    </form>
                    :
                    <form onSubmit={handleOTPSubmit}>
                        <input onChange={e => setOtp(e.target.value)} value={otp} type="text" required placeholder="Enter OTP here" />
                        <br />
                        <button>Submit</button>
                    </form>
            }
        </div>
    )
}

export default Register