import React from 'react'
import Lottie from "lottie-react";
import animationData from "../assets/MajorUSPAnimNew.json";
import Ananta from "../assets/logos/ananta_logo.svg";
export default function Loading() {
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            {/* <h1 className='text-9xl font-bold'>Loading...</h1> */}
            <Lottie className='h-1/2' animationData={animationData} loop={true} />

        </div>
    )
}
