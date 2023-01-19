import React from "react";

import Lottie from "lottie-react";
import animationData from "../assets/Fail.json";

function PaymentFail() {
  

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center ">
      <div className="group max-w-full h-max m-6 px-8 pb-6 flex flex-col items-center justify-between gap-4 shadow-lg  border-4 border-red-500 rounded-2xl relative overflow-hidden">
        <div className="w-full h-max flex  flex-col justify-between items-center">
          <Lottie
            className="h-60"
            animationData={animationData}
            loop={true}
          ></Lottie>
          <h1 className="text-2xl font-extrabold  text-red-500 flex flex-col justify-between items-center">
            Payment Failed
          </h1>
          <p className="flex flex-col justify-between items-center font-semibold mt-5">
            Somethig Went Wrong..
          </p>
          <p className="flex flex-col justify-between font-semibold items-center">
            Please Try Again !!
          </p>
        </div>

        <button className='relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 py-3 mt-4 w-full bg-primary-dark-1 font-heading font-bold text-white rounded-lg'>
          Please TRY Again
        </button>
      </div>
    </div>
  );
}

export default PaymentFail;

