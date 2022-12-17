import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useEffect } from 'react'

function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState("")
    const [otpScreen, setOtpScreen] = useState(false)
    const serverURL = import.meta.env.VITE_SERVER_URL

    async function handleInfoSubmit(e) {
        e.preventDefault()

        const res = await fetch(serverURL + "/api/generateOTP", {
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

        const res = await fetch(serverURL + "/api/verifyOTP", {
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
                    fetch(serverURL + "/api/create-profile", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password, photoURL: "NULL", googleAuth: "FALSE" })
                    })
                    console.log(user);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        } else {
            setOtp("")
            console.log("OTP is not verified");
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