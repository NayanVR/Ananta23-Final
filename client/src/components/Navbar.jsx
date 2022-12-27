import React from 'react'
import { useState } from 'react'
import AnantaLogo from '../assets/ananta_logo.svg'
import '../navbar.css'


function Navbar() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav>
            <div className="nav" data-is-open={isOpen}>
                <div className="nav__logo">
                    <img src={AnantaLogo} alt="NayanVR Logo" />
                </div>
                <div className="nav__links">
                    <a href="/">Home</a>
                    <a href="">Events</a>
                    <a href="/buypass">Buy a Pass</a>
                    <a href="">Digital Points</a>
                    <a href="">Schedule</a>
                    <a href="">More</a>
                </div>
                <button className='py-2 px-6 rounded-md bg-primary-dark-1 text-white' onClick={() => { window.location.href = "/login" }}>LOGIN</button>
                <div onClick={_ => { setIsOpen(!isOpen) }} className="nav__toggle">
                    <span className="nav__toggle__bars"></span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar