import React from 'react'
import Lottie from "lottie-react";
import animationData from "../assets/MajorUSPAnimNew.json";

function MajorUSP() {

    const points = [
        "Digital money-handling experience to enhance financial skills and attract more participants by having a positive and competitive environment throughout the event.",
        "Enrich students for their domain-specific careers by providing an open internship opportunity.",
        "Strengthening students' managerial, entrepreneurial, and leadership skills by giving students an opportunity to manage and run their own stalls throughout the event.",
        "“Emphasizing Startups” by providing them with a platform to network as well as promote their story. ",
        "Digitized management system to promote a self-reliant model through a web portal developed by the students and for the students.",
        "K-12 outreach to promote university culture and develop inclusivity, which depicts unity, diversity, equality, and sustainability."

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