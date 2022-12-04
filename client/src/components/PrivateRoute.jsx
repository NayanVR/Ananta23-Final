import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from "react-router-dom";

function PrivateRoute({ Component }) {

    const { currentUser } = useContext(AuthContext)

    return (
        currentUser ? Component : <Navigate replace to={"/login"} />
    )
}

export default PrivateRoute