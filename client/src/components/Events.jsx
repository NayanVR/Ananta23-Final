import React from 'react'
import EventBox from './EventBox'
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
            desc: " Flaunt your skills and prove how smart you are. Planning each and every move will make you the king!",
            link: "/swoosh"
        },
        {
            title: "Upshot",
            sub: "Fun Event",
            desc: "Go down the memory lane by taking a break from the daily ups and downs and  experience the adrenaline rush like never before!",
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
            sub: "Talk Show",
            desc: " Grab the chance to get hands-on experience of learning and showcasing your potential skills. This is definitely everything you want to explore!",
            link: "/kalakriti"
        },
        {
            title: "Equilibrium",
            sub: "Guest Lectures",
            desc: "Knowledge is an ever expanding concept, witnessing exceptional journeys and stories of our esteemed guests,  igniting the best out of you!",
            link: "/equilibrium"
        },
    ]

    return (
        <section id='events'>
            <div className='w-full flex flex-col justify-center items-center px-[10%] my-8'>
                <h1 className='mb-12 text-4xl font-heading font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
                    Events
                </h1>
                <div className='max-w-[1200px] m-auto grid gap-8 grid-cols-1 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 place-items-center my-16'>
                    {events.map((item, index) => <EventBox title={item.title} desc={item.desc} link={item.link} sub={item.sub} key={index} />)}
                </div>
            </div>
        </section>
    )
}

export default Events