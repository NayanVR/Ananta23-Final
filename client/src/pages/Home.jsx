import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

function Home() {

    const { currentUser } = useContext(AuthContext)
    console.log(current)

    return (
        <div>
            Home
            <br />
            {
                currentUser
                    ?
                    <div>
                        <div>You are logged in with {currentUser.email}</div>

                        
                    
                    
                    </div>
                    :
                    <div>Who are you</div>
            }
            <br />
            <button onClick={_ => signOut(auth)}>Logout</button>
        </div>
    )
}

export default Home