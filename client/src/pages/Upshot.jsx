import React from 'react'
import { useState, useContext, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import EventCard from '../components/EventCardNew'
import { AuthContext } from "../contexts/AuthContext";
import Swift from '../assets/photos/upshots/swift.png'
import profilePic from '../assets/photos/profile.jpg'
import EventsData from "../assets/Events.json"
import { QRCode } from "react-qrcode-logo";

import ComingSoon from '../components/ComingSoon'

function Upshot() {
    return (
        <>
            <h1 className="font-heading text-center my-12 text-[2rem] sm:text-[4rem]  font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                UPSHOT : FUN EVENTS
            </h1>
            {/* <ComingSoon /> */}
            <div className="max-w-[1200px] m-auto my-16 px-4 flex gap-16 flex-wrap justify-center items-center">
                {EventsData.upshot.map((event, index) => (
                    <EventCard
                        key={index}
                        event={event}
                    // registerNow={handleBuyClick}
                    // viewDetails={viewDetails}
                    />
                ))}
            </div>
        </>
    )
}

export default Upshot