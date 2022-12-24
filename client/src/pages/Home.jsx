import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

function Home() {

    const { currentUser } = useContext(AuthContext)

    return (
        <section className='w-full h-[calc(100vh-4rem)] flex flex-col justify-center items-center'>
            <h1 className='text-3xl sm:text-7xl font-heading font-black bg-gradient-to-b from-primary-dark-2 to-gray-900 bg-clip-text text-transparent'>
                FUSION
            </h1>
            <h1 className='text-3xl sm:text-7xl font-heading font-black bg-gradient-to-b from-primary-dark-2 to-gray-900 bg-clip-text text-transparent'>
                FOR
            </h1>
            <h1 className='text-3xl sm:text-7xl font-heading font-black bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
                FUTURE
            </h1>
            <p className='my-2'>Coming soon</p>
            <button className='py-2 px-16 bg-primary-dark-1 text-white rounded-md' onClick={_ => signOut(auth)}>Logout</button>
        </section>
    )
}

export default Home