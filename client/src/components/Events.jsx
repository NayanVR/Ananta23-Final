import React from 'react'
import EventChip from './EventChip'

function Events() {

    const events = [
        {
            title: "Equilibrium",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/"
        },
        {
            title: "Inertia",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/"
        },
        {
            title: "Swoosh",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/"
        },
        {
            title: "Equilibrium",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/"
        },
        {
            title: "Inertia",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/"
        },
        {
            title: "Swoosh",
            desc: "Knowledge is an ever-expanding concept, explore the equilibrium panel and find the expert that ignites the best out of you.",
            link: "/"
        },
    ]

    return (
        <section id='events'>
            <div className='w-full flex justify-center items-center px-32'>
                <div className='flex justify-between flex-wrap'>
                    {events.map((item) => <EventChip title={item.title} desc={item.desc} link={item.link} />)}
                </div>
            </div>
        </section>
    )
}

export default Events