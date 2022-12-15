import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {

    const { currentUser } = useContext(AuthContext)

    return (
        currentUser ? element : <Navigate replace to={"/login"} />
    )
}

export default PrivateRoute