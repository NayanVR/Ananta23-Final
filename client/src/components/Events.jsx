import React from 'react'
import EventChip from './EventChip'


function Events() {

    const events = [
        {
            title: "Inertia ",
            sub: "Technical Event",
            desc: "Technical Skills are mastery of complexity, sharpen up your knowledge with a series of fun yet competitive events.",
            link: "/inertia"
        },
        {
            title: "Swoosh",
            sub: "Non-Technical Event",
            desc: "Time for you to be street smart as well as book smart, prove that you are the smartest person in the room and bring out your soft skills to use.",
            link: "/swoosh"
        },
        {
            title: "Upshot",
            sub: "Fun Event",
            desc: "Take a break from the daily ups and downs of life with these carnivalesque events and go downmemory lane.",
            link: "/upshot"
        },
        {
            title: "Zingaat",
            sub: "Cultural Night",
            desc: "Creativity can be contagious, and it won’t just wait for the perfect moment. Join in the cultural event one of its kind packed with loads of cheers and flashes.",
            link: "/zingaat"
        },
        {
            title: "Kalakriti",
            sub: "Workshops",
            desc: "Get introduced to new ideas, feel inspired to further explore concepts on your own, and illustrate them in a hands-on manner",
            link: "/kalakriti"
        },
        {
            title: "Equilibrium",
            sub: "Guest Lectures",
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
                    {events.map((item, index) => <EventChip title={item.title} desc={item.desc} link={item.link} sub={item.sub} key={index} />)}
                </div>
            </div>
        </section>
    )
}

export default Events