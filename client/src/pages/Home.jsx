import React from 'react'
import { useEffect, useState, useContext } from 'react'
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "./../contexts/AuthContext";
import Stats from '../components/Stats'
import AboutUs from '../components/AboutUs'
import Events from '../components/Events'
import MajorUSP from '../components/MajorUSP'
import FAQSection from '../components/FAQSection'
import ProgressPopUp from '../components/ProgressPopUp'
import Ellipse from '../assets/illustrations/Ellipse.svg'
import Hero from '../assets/HeroData.json'
import WaveAnim from '../assets/WaveAnim.json'
import HeroVideo from '../assets/HeroSectionVideoHigh.mp4'

function Home() {

    const { currentUser, profile, setProfile } = useContext(AuthContext);
    const navigate = useNavigate()


    //get today date

    const [day, setDay] = useState(0)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [showProgress, setShowProgress] = useState(true)

    useEffect(() => {
        const second = setInterval(() => {
            const current = new Date().getTime()
            const eventTime = new Date('Mar 17, 2023 00:00:00')
            const diff = eventTime - current

            const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
            const diffHours = Math.floor(diff / 1000 / 60 / 60) % 24
            const diffMinutes = Math.floor(diff / 1000 / 60) % 60
            const diffSeconds = Math.floor(diff / 1000) % 60

            if (day !== diffDays) setDay(diffDays)
            if (hour !== diffHours) setHour(diffHours)
            if (minute !== diffMinutes) setMinute(diffMinutes)
            if (second !== diffSeconds) setSecond(diffSeconds)
        }, 1000)

        return () => {
            clearInterval(second)
        }
    }, [])

    return (
        <>
            {
                // profile.ProfileStatus == 0 ?
                // location.href = "/profile"
                // <ProgressPopUp isOpen={showProgress} setIsOpen={setShowProgress} authStatus={true} profileStatus={false} paymentStatus={false} />
                // :
                // <></>
            }
            <section className='w-full h-[calc(100vh-3.5rem)] overflow-hidden relative flex flex-col justify-center items-center gap-10'>

                <video className='absolute top-0 left-0 w-full h-full object-cover' autoPlay muted>
                    <source src={HeroVideo} type="video/mp4" />
                </video>
                <p className='animate-videoContent relative uppercase text-xl text-white z-50 top-40'>
                    {`${day} Days ${hour}H ${minute}M ${second}S To Go`}
                </p>
                <p className='animate-videoContent relative uppercase text-4xl font-bold text-white z-50 top-40'>17-18-19 March</p>
                {
                    !currentUser ?
                        <button className='animate-videoContent top-40 z-50 relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-dark-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-light-2 to-primary-light-3 text-primary-dark-2 rounded-md' onClick={_ => { window.location.href = "/register" }}>Register Now</button>
                        : profile.TxnStatus != "TXN_SUCCESS" ?
                            <button className='animate-videoContent top-40 z-50 relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-dark-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-light-2 to-primary-light-3 text-primary-dark-2 rounded-md' onClick={_ => { window.location.href = "/buypass" }}>Buy Pass</button> :
                            <button className='animate-videoContent top-40 z-50 relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-dark-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-light-2 to-primary-light-3 text-primary-dark-2 rounded-md' onClick={_ => { window.location.href = "/inertia" }}>Start Registeration in Events</button>
                }
                {/* <div style={{ top: 0, transform: "rotate(180deg)" }} className="wrap-grid-container">
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
                </div> */}
                {/* Gradient */}
                {/* <div className='absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-primary-light-2 to-transparent opacity-50 pointer-events-none' />
                <div className='absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-primary-light-2 to-transparent opacity-50 pointer-events-none' /> */}

                {/* <Lottie className='absolute block w-[200%] md:w-[100%]  ' animationData={Hero} loop={false} /> */}
                {/* <p className='relative uppercase text-xl text-white z-50 top-32'>
                    {`${day} Days ${hour}H ${minute}M ${second}S To Go`}
                </p>
                {
                    !currentUser ?
                        <button className='top-40 z-50 relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 text-white rounded-md' onClick={_ => { window.location.href = "/register" }}>Register Now</button>
                        : profile.TxnStatus != "TXN_SUCCESS" ?
                            <button className='top-40 z-50 relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 text-white rounded-md' onClick={_ => { window.location.href = "/buypass" }}>Buy Pass</button> :
                            <button className='top-40 z-50 relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 text-white rounded-md' onClick={_ => { window.location.href = "/inertia" }}>Start Registeration in Events</button>
                } */}

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
                {/* <Lottie className='absolute' animationData={WaveAnim} loop={false} /> */}
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
