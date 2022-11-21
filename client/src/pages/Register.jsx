import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <div>
            Register
            <br />
            <form onSubmit={handleSubmit}>
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                <br />
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                <br />
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register