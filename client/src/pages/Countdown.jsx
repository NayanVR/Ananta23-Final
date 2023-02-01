import React from 'react'
import { useEffect, useState } from 'react'


function Countdown() {
    
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
            <section className='w-full h-[calc(100vh-4rem)] relative flex flex-col justify-center items-center gap-10'>

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

                
                <div className='text-center '>
                    <h1 className='text-3xl sm:text-7xl m-10 uppercase  text-primary font-heading font-black '>
                         {`${day} Days`}
                    </h1>
                    <h1 className='text-3xl font-heading sm:text-7xl m-10 text-primary font-black '>
                    {`${hour}H : ${minute}M : ${second}S`}
                    </h1>
                    <h1 className='text-3xl font-heading sm:text-7xl m-10 uppercase  text-primary font-black'>
                    LEFT..
                    </h1>
                    
                </div>
                
            </section>

           

            
        </>
    )
}

export default Countdown