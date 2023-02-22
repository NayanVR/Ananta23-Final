import React from 'react'
import Lottie from "lottie-react";
import animationData from "../assets/MajorUSPAnimNew.json";
import Ananta from "../assets/logos/ananta_logo.svg";
export default function Loading() {
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            {/* <h1 className='text-9xl font-bold'>Loading...</h1> */}
            <Lottie className='h-1/2' animationData={animationData} loop={true} />
            <h1 className="font-heading text-7xl text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                Ananta'23
            </h1>
        </div>
    )
}
