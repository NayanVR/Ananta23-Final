import React from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/success.json";

function PaymentSuccess() {
  const { value } = useParams();

  console.log(value);

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center ">
      <div className="group max-w-full h-max m-6 px-8 pb-6 flex flex-col items-center justify-between gap-4 bg-primary-light-3 border-4 border-green-600 rounded-2xl relative overflow-hidden">
        <div className="w-full h-max flex flex-col justify-between items-center">
          <Lottie
            className="h-80"
            animationData={animationData}
            loop={false}
          ></Lottie>
          <h1 className="text-2xl font-extrabold text-green-600 flex flex-col justify-between items-center">
            Payment Successfull
          </h1>
          <p className="flex flex-col justify-between items-center mt-5">
            Your ORDER ID is <strong>{value}</strong>
          </p>
        </div>

        <button className='relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 py-3 mt-4 w-full bg-primary-dark-1 font-heading font-bold text-white rounded-lg'>
          Dowload Pass
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;

