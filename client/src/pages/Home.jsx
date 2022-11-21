import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

function Home() {

    const { currentUser } = useContext(AuthContext)

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