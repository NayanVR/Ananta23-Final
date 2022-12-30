import React from 'react'
import { useState } from 'react'
import googleLogo from '../assets/google_icon.svg'
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase"
import { toast } from 'react-hot-toast'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const serverURL = import.meta.env.VITE_SERVER_URL

    function handleSubmit(e) {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                window.location.href = "/"
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    async function handleGoogleLogin() {
        const res = await signInWithPopup(auth, provider)
        console.log(res);
        const email = res.user.email;
        const photoURL = res.user.photoURL;
        const data = await createProfile(email, photoURL)
        console.log(data);
        if (data.type === "success") {
            window.location.href = "/"
        } else {
            toast.error(data.message, { duration: 3000 })
        }
        // .then((result) => {
        //     const user = result.user;
        //     const email = user.email;
        //     const photoURL = user.photoURL;
        //     createProfile(email, photoURL)
        //     console.log(user);
        //     window.location.href = "/"
        // }).catch((error) => {
        //     const errorMessage = error.message;
        //     console.log(errorMessage);
        // });
    }

    async function createProfile(email, photoURL) {
        const res = await fetch(serverURL + "/api/create-profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, photoURL, googleAuth: "TRUE" })
        })
        const data = await res.json()
        return data
    }

    return (
        <section className='flex justify-center items-center w-full h-[calc(100vh-8rem)]'>
            <div className='flex flex-col w-full max-w-md items-center gap-4 px-8'>
                <h1 className="font-heading text-4xl font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">

                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className='px-4 py-2 border rounded-md' required />

                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className='px-4 py-2 border rounded-md' required />

                    <button type='submit' className='py-2 bg-primary-dark-1 text-white rounded-md'>Login</button>
                </form>
                <div className='flex row items-center w-full gap-2 text-gray-400'>
                    <span className='h-px w-full bg-gray-300'></span>
                    OR
                    <span className='h-px w-full bg-gray-300'></span>
                </div>
                <button onClick={handleGoogleLogin} className='w-full mx-8 py-2 border rounded-md text-primary-dark-1 border-primary-dark-1 flex flex-row justify-center items-center gap-2'>
                    <img className='h-5' src={googleLogo} /> Sign in with Google
                </button>
            </div>
        </section>
    )
}

export default Login