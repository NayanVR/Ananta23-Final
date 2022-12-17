import React from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase"


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
        const email = res.user.email;
        const photoURL = res.user.photoURL;
        const data = await createProfile(email, photoURL)
        if (data.isProfileCreated) {
            window.location.href = "/"
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
            body: JSON.stringify({ email, password: "NULL", photoURL, googleAuth: "TRUE" })
        })
        const data = await res.json()
        return data
    }

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Login
            </h1>
            <br />
            <form onSubmit={handleSubmit}>
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" />
                <br />
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                <br />
                <button>Login</button>
            </form>
            <button onClick={handleGoogleLogin}>Google Login</button>
        </div>
    )
}

export default Login