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
                        body: JSON.stringify({ email, photoURL: "NULL", googleAuth: "FALSE" })
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
        <section className='flex justify-center items-center w-full h-[calc(100vh-8rem)]'>
            <div className='flex flex-col w-full max-w-md items-center gap-4 px-8'>
                <h1 className="font-heading text-4xl font-extrabold bg-gradient-to-b from-primary-light to-primary bg-clip-text text-transparent">
                    Register
                </h1>
                {
                    !otpScreen ?
                        <form onSubmit={handleInfoSubmit} className="flex flex-col w-full gap-4">
                            <input onChange={e => setEmail(e.target.value)} value={email} type="email" required placeholder="Email" className='px-4 py-2 border' />

                            <input onChange={e => setPassword(e.target.value)} value={password} type="password" required placeholder="Password" className='px-4 py-2 border' />

                            <button type='submit' className='py-2 bg-primary-dark text-white'>Next</button>
                        </form>
                        :
                        <form onSubmit={handleOTPSubmit} className="flex flex-col w-full gap-4">
                            <input onChange={e => setOtp(e.target.value)} value={otp} type="text" required placeholder="Enter OTP here" className='px-4 py-2 border' />

                            <button type='submit' className='py-2 bg-primary-dark text-white'>Submit</button>
                        </form>
                }
            </div>
        </section>
    )
}

export default Register