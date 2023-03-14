import React from "react";

import EQU001 from "../assets/photos/2001.png";
import EQU002 from "../assets/photos/2002.png";
import EQU003 from "../assets/photos/2003.png";
import EQU004 from "../assets/photos/2004.png";
import EQU005 from "../assets/photos/2005.png";

function Equilibrium() {
  return (
    <div className="relative h-full overflow-hidden">
        <div
        style={{ top: 0, transform: "rotate(180deg)" }}
        className="wrap-grid-container opacity-30"
      >
        <div className="grid-container">
          <div className="grid-top-gradient"></div>
          {[...Array(250)].map((_, i) => {
            return <div key={i} className="grid-item"></div>;
          })}
        </div>
      </div>
      <div className="wrap-grid-container opacity-30">
        <div className="grid-container">
          <div className="grid-top-gradient"></div>
          {[...Array(250)].map((_, i) => (
            <div key={i} className="grid-item"></div>
          ))}
        </div>
      </div>
      {/* Gradient */}
      <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-primary-light-2 to-transparent opacity-25 pointer-events-none" />
      <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-primary-light-2 to-transparent opacity-25 pointer-events-none" />


      <h1 className="font-heading text-center my-12 text-[2rem] sm:text-[4rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
        Equilibrium: Talk Show
      </h1>

      <div className="flex  gap-12 mb-10 mx-10 flex-col  sm:flex-row flex-wrap justify-center align-middle rounded-lg ">
        <div className="relative h-1/2 flex  flex-col bg-primary-light-3 p-2 justify-center items-center rounded-lg border-2 shadow-lg border-[#78BDC4]">
          <img
            src={EQU001}
            className="h-full sm:h-96  items-center  rounded-md border-2 shadow-lg border-[#78BDC4]"
            alt=""
          />
          {/* <button className="btn w-full bg-primary text-white mt-2 py-2 px-5 shadow-lg rounded-md " id="EQU001">
            Book Now
          </button> */}
        </div>
        <div className="relative h-1/2 flex  flex-col bg-primary-light-3 p-2 justify-center items-center rounded-lg border-2 shadow-lg border-[#78BDC4]">
          <img
            src={EQU002}
            className="h-full sm:h-96  items-center  rounded-md border-2 shadow-lg border-[#78BDC4]"
            alt=""
          />
          {/* <button className="btn w-full bg-primary text-white mt-2 py-2 px-5 shadow-lg rounded-md " id="EQU002">
            Book Now
          </button> */}
        </div>
        <div className="relative h-1/2 flex  flex-col bg-primary-light-3 p-2 justify-center items-center rounded-lg border-2 shadow-lg border-[#78BDC4]">
          <img
            src={EQU003}
            className="h-full sm:h-96  items-center  rounded-md border-2 shadow-lg border-[#78BDC4]"
            alt=""
          />
          {/* <button className="btn w-full bg-primary text-white mt-2 py-2 px-5 shadow-lg rounded-md " id="EQU003">
            Book Now
          </button> */}
        </div>
        <div className="relative h-1/2 flex  flex-col bg-primary-light-3 p-2 justify-center items-center rounded-lg border-2 shadow-lg border-[#78BDC4]">
          <img
            src={EQU004}
            className="h-full sm:h-96  items-center  rounded-md border-2 shadow-lg border-[#78BDC4]"
            alt=""
          />
          {/* <button className="btn w-full bg-primary text-white mt-2 py-2 px-5 shadow-lg rounded-md " id="EQU004">
            Book Now
          </button> */}
        </div>
       
      </div>
    </div>
  );
}

export default Equilibrium;
