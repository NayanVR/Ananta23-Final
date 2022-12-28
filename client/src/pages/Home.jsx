import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import Ellipse from '../assets/ellipse.svg'
import Stats from '../components/Stats'
import AboutUs from '../components/AboutUs'
import Events from '../components/Events'

function Home() {

    const { currentUser } = useContext(AuthContext)
    const wH = window.innerHeight

    const [mousePos, setMousePos] = useState({ x: 0, y: wH/2});

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    //clamp value in new range
    function clamp(value, newMin, newMax) {
        return (value / wH) * (newMax - newMin) + newMin;
    }

    return (
        <>
            <section className='w-full h-[calc(100vh-4rem)] relative flex flex-col justify-center items-center'>

                {/* Left gradient */}
                <div className='absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-primary-light-2 to-transparent opacity-50' />
                {/* Left ellipses */}
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 10}px + 50%)` }} className='absolute -z-10 h-5/6 left-12 animate-wiggleLeft' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 8}px + 50%)` }} className='absolute -z-10 h-4/6 left-20 animate-wiggleLeft' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 6}px + 50%)` }} className='absolute -z-10 h-3/6 left-28 animate-wiggleLeft' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 4}px + 50%)` }} className='absolute -z-10 h-2/6 left-36 animate-wiggleLeft' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 3}px + 50%)` }} className='absolute -z-10 h-1/6 left-44 animate-wiggleLeft' />
                {/* Right gradient */}
                <div className='absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-primary-light-2 to-transparent opacity-50' />
                {/* Right ellipses */}
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 10}px + 50%)` }} className='absolute -z-10 h-5/6 right-12 animate-wiggleRight' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 8}px + 50%)` }} className='absolute -z-10 h-4/6 right-20 animate-wiggleRight' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 6}px + 50%)` }} className='absolute -z-10 h-3/6 right-28 animate-wiggleRight' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 4}px + 50%)` }} className='absolute -z-10 h-2/6 right-36 animate-wiggleRight' />
                <img src={Ellipse} style={{ top: `calc(${clamp(mousePos.y, -300, 300) / 3}px + 50%)` }} className='absolute -z-10 h-1/6 right-44 animate-wiggleRight' />


                <h1 className='text-3xl sm:text-7xl font-heading font-black bg-gradient-to-b from-primary-dark-2 to-gray-900 bg-clip-text text-transparent'>
                    FUSION
                </h1>
                <h1 className='text-3xl sm:text-7xl font-heading font-black bg-gradient-to-b from-primary-dark-2 to-gray-900 bg-clip-text text-transparent'>
                    FOR
                </h1>
                <h1 className='text-3xl sm:text-7xl font-heading font-black bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
                    FUTURE
                </h1>
                <p className='my-2'>Coming soon</p>
                <button className='py-2 px-16 bg-primary-dark-1 text-white rounded-md' onClick={_ => signOut(auth)}>Logout</button>
            </section>

            {/* Stats */}
            <Stats />

            {/* About us */}
            <AboutUs />

            {/* Events */}
            <Events />
        </>
    )
}

export default Home