import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

function Home() {

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (currentUser) {
            currentUser.getIdToken().then((token) => {
                fetch("http://localhost:3000/api/secure/user", {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                    .then(res => res.json())
                    .then(data => console.log(data.message))
            })
        }
    }, [])

    return (
        <div>
            Home
            <br />
            {
                currentUser 
                ? 
                <div>You are logged in with {currentUser.email}</div>
                :
                <div>Who are you</div>
            }
            <br />
            <button onClick={_ => signOut(auth)}>Logout</button>
        </div>
    )
}

export default Home