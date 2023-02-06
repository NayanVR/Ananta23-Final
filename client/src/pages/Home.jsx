import React from 'react'
import { useEffect, useState, useContext } from 'react'
import Ellipse from '../assets/illustrations/Ellipse.svg'
import Stats from '../components/Stats'
import AboutUs from '../components/AboutUs'
import Events from '../components/Events'
import MajorUSP from '../components/MajorUSP'
import { AuthContext } from "./../contexts/AuthContext";
import FAQSection from '../components/FAQSection'
import Hero from '../assets/HeroData.json'
import Lottie from 'lottie-react'

function Home() {

    const { currentUser, profile, setProfile } = useContext(AuthContext);

    //get today date

    const [day, setDay] = useState(0)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)

    useEffect(() => {
        const second = setInterval(() => {
            const current = new Date().getTime()
            const eventTime = new Date('Mar 17, 2023 00:00:00')
            const diff = eventTime - current

            const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
            const diffHours = Math.floor(diff / 1000 / 60 / 60) % 24
            const diffMinutes = Math.floor(diff / 1000 / 60) % 60
            const diffSeconds = Math.floor(diff / 1000) % 60

            setDay(diffDays)
            setHour(diffHours)
            setMinute(diffMinutes)
            setSecond(diffSeconds)
        }, 1000)

        return () => {
            clearInterval(second)
        }
    }, [])

    return (
        <>
            <section className='w-full h-[calc(100vh-3.5rem)] relative flex flex-col justify-center items-center gap-10'>

                <div style={{ top: 0, transform: "rotate(180deg)" }} className="wrap-grid-container">
                    <div className="grid-container">
                        <div className='grid-top-gradient'></div>
                        {
                            [...Array(250)].map((_, i) => {

                                return (
                                    <div key={i} className='grid-item'></div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="wrap-grid-container">
                    <div className="grid-container">
                        <div className='grid-top-gradient'></div>
                        {
                            [...Array(250)].map((_, i) => (
                                <div key={i} className='grid-item'></div>
                            ))
                        }
                    </div>
                </div>
                {/* Left gradient */}
                <div className='absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-primary-light-2 to-transparent opacity-50 pointer-events-none' />
                {/* Left ellipses */}
                {/* <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 10}px + 50%)` }} className='absolute -z-10 h-5/6 left-12 animate-wiggleLeft' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 8}px + 50%)` }} className='absolute -z-10 h-4/6 left-20 animate-wiggleLeft' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 6}px + 50%)` }} className='absolute -z-10 h-3/6 left-28 animate-wiggleLeft' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 4}px + 50%)` }} className='absolute -z-10 h-2/6 left-36 animate-wiggleLeft' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 3}px + 50%)` }} className='absolute -z-10 h-1/6 left-44 animate-wiggleLeft' /> */}
                {/* Right gradient */}
                <div className='absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-primary-light-2 to-transparent opacity-50 pointer-events-none' />
                {/* Right ellipses */}
                {/* <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 10}px + 50%)` }} className='absolute -z-10 h-5/6 right-12 animate-wiggleRight' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 8}px + 50%)` }} className='absolute -z-10 h-4/6 right-20 animate-wiggleRight' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 6}px + 50%)` }} className='absolute -z-10 h-3/6 right-28 animate-wiggleRight' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 4}px + 50%)` }} className='absolute -z-10 h-2/6 right-36 animate-wiggleRight' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 3}px + 50%)` }} className='absolute -z-10 h-1/6 right-44 animate-wiggleRight' /> */}


                {/* <div className='text-center'>
                    <h1 className='text-3xl sm:text-7xl font-heading font-black bg-gradient-to-b from-primary-dark-2 to-gray-900 bg-clip-text text-transparent'>
                        REVOLUTION
                    </h1>
                    <h1 className='text-3xl sm:text-7xl font-heading font-black bg-gradient-to-b from-primary-dark-2 to-gray-900 bg-clip-text text-transparent'>
                        THROUGH
                    </h1>
                    <h1 className='text-3xl sm:text-7xl font-heading font-black bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
                        DISRUPTION
                    </h1>
                </div> */}
                <Lottie className='absolute w-[200%] md:w-[100%]  ' animationData={Hero} loop={true} />
                <p className='relative uppercase text-xl text-primary after:content-[""] top-60 after:block after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-white after:blur-md after:z-[-1]'>
                    {`${day} Days ${hour}H ${minute}M ${second}S To Go`}
                </p>
                {
                    !currentUser ?
                        <button className='top-52 relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 text-white rounded-md' onClick={_ => { window.location.href = "/register" }}>Register Now</button>
                        : profile.TxnStatus != "TXN_SUCCESS" ?
                            <button className='relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 text-white rounded-md' onClick={_ => { window.location.href = "/buypass" }}>Buy Pass</button> :
                            <button className='relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 text-white rounded-md' onClick={_ => { window.location.href = "/inertia" }}>Start Registeration in Events</button>
                }

            </section>

            {/* Stats */}
            <Stats />

            {/* About us */}
            <AboutUs />

            {/* Major USPs */}
            <MajorUSP />

            {/* Events */}
            <Events />



            <section id="aftermovie">
                <div className="w-full flex flex-col justify-center items-center px-8 py-8">
                    <h1 className='mb-12 text-4xl font-heading font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
                        Aftermovie
                    </h1>
                    <iframe className='w-full sm:w-2/3 max-w-3xl h-auto aspect-video' src="https://www.youtube-nocookie.com/embed/89qIfl9yKOc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </section>

            <FAQSection />
        </>
    )
}

export default Home
