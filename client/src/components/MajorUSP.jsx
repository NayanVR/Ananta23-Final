import React from 'react'
import Lottie from "lottie-react";
import animationData from "../assets/MajorUSPAnim.json";

function MajorUSP() {

    const points = [
        "A fest for the students and by the students.",
        "A fully digitalized QR based Digital Registration System.",
        "“Equilibrium”- An elite series of stories by founders, motivational speakers and emerging creators.",
        "“Kala Kriti”- Series of Technical and Non-Technical Workshops",
        "“Zingaat”- Celebration of our Culture and Heritage.",
        "“RYOS”- A concept to let students run and manage their own stalls in an attempt to sharpen up their business management skills.",
        "Events such as “Mini Shark Tank” to promote entrepreneurship and leadership skills.",
        "“Atmos”- A night to groove on EDM beats."
    ]

    return (
        <section id='about'>
            <div className='w-full pb-20 gap-8 md:gap-0 px-[10%] flex flex-col md:flex-row'>
                <div className='flex-1 flex justify-center items-center'>
                    <Lottie animationData={animationData} loop={true} />
                </div>
                <div className='flex-1'>
                    <h1 className='text-center md:text-left text-4xl font-heading font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
                        MAJOR USP
                    </h1>
                    <ul className='mt-8 list-disc'>
                        {
                            points.map((point, index) => (
                                <li className='text-justify md:text-left text-primary-dark-2 text-lg mt-2' key={index}>{point}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default MajorUSP