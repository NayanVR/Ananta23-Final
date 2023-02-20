import React from 'react'
import Lottie from "lottie-react";
import animationData from "../assets/MajorUSPAnimNew.json";

function MajorUSP() {

    const points = [
        "“Digitalized management” system to promote a self-reliant model through a web portal developed by the students and for the students.",
        "“K-12 outreach” to promote university culture and developinclusivity, which depicts unity, diversity, equality, andsustainability.",
        "“Categorizing events” in order to boost crucial skills, which makes their presence worth the value.",
        "“Emphasizing Startups” by providing them with a platform to network as well as promote their story. ",
        "Enrich students for their domain-specific careers by providing an “Open Internship” opportunity",
        "“SMS”- A concept to let students run and manage their own stalls in an attempt to sharpen up their business management skills."

    ]

    return (
        <section id='major-usp'>
            <div className='w-full pb-20 gap-8 md:gap-0 px-[10%] flex flex-col md:flex-row'>
                <div className='flex-1 flex justify-center items-center max-h-[70vh]'>
                    <Lottie animationData={animationData} loop={true} />
                </div>
                <div className='flex-1'>
                    <h1 className='text-center md:text-left text-4xl font-heading font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
                        MAJOR USPs
                    </h1>
                    <ul className='mt-8 ml-4 list-disc'>
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