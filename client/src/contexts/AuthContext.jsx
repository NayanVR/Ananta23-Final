import React, { useState, useEffect, createContext } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const serverURL = import.meta.env.VITE_SERVER_URL

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken().then(token => {
                    fetch(serverURL + "/api/secure/get-profile", {
                        headers: {
                            Authorization: 'Bearer ' + token,
                            "Content-Type": "application/json"
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            setProfile(data.message)
                        })
                        .catch(err => {
                            setProfile({})
                        })
                })
            } else {
                setProfile({})
            }
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser, profile, setProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}