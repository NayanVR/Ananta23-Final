import React, { useState, useEffect, createContext } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const serverURL = import.meta.env.VITE_SERVER_URL

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetch(serverURL + "/api/secure/get-profile", {
                    headers: {
                        Authorization: 'Bearer ' + user.accessToken,
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("profile", JSON.stringify(data.message))
                    })
                    .catch(err => {
                        localStorage.setItem("profile", JSON.stringify({}))
                    })
            } else {
                localStorage.setItem("profile", JSON.stringify({}))
            }
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}