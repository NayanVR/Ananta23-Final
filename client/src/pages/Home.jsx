import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

function Home() {

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3000/", {
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(data => console.log(data.message))
    }, [])

    return (
        <div>
            Home
            <br />
            {
                currentUser ? <div>You are logged In</div> : <div>Who are you</div>
            }
            <br />
            <button onClick={_ => signOut(auth)}>Logout</button>
        </div>
    )
}

export default Home