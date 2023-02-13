import React from 'react'
import Error from '../assets/404_Error.json'
import Lottie from 'lottie-react'

export default function PageNotFound() {
    return (
        <div className='h-screen w-full p-12 flex justify-center items-center'>
            <Lottie className='w-full sm:w-1/2' animationData={Error} loop={true} />
        </div>
    )
}
