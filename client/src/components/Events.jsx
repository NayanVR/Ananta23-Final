import React from 'react'
import EventChip from './EventChip'


function Events() {

    const events = [
        {
            title: "Inertia",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/inertia"
        },
        {
            title: "Swoosh",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/swoosh"
        },
        {
            title: "Upshot",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/upshot"
        },
        {
            title: "Zingaat",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/zingaat"
        },
        {
            title: "Kalakriti",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/kalakriti"
        },
        {
            title: "Equilibrium",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/equilibrium"
        },
    ]

    return (
        <section id='events'>
            <div className='w-full flex flex-col justify-center items-center px-[10%] my-8'>
                <h1 className='mb-12 text-4xl font-heading font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
                    Events
                </h1>
                <div className='flex justify-between flex-wrap gap-12'>
                    {events.map((item, index) => <EventChip title={item.title} desc={item.desc} link={item.link} key={index} />)}
                </div>
            </div>
        </section>
    )
}

export default Events