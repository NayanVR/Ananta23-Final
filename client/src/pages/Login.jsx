import React from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase"


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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

    function handleGoogleLogin() {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                window.location.href = "/"
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <div>
            Login
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