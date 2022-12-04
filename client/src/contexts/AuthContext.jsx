import React, { useState, useEffect, createContext } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdToken().then((token) => {
                    localStorage.setItem("token", token)
                });
            } else {
                localStorage.removeItem("token")
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