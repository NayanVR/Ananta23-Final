import React from 'react'
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/success.json";

function PaymentSuccess() {

    const { value } = useParams();

    console.log(value);

    return (
        <div className='w-full h-[calc(100vh-4rem)] flex flex-col items-center'>
            <Lottie className='h-2/3' animationData={animationData} loop={false} >

            </Lottie>
            <h1 className='text-3xl font-bold text-green-600'>
                Payment Success
            </h1>
            <p>
                Your ORDER ID is <strong>{value}</strong>
            </p>
        </div>
    )
}

export default PaymentSuccess