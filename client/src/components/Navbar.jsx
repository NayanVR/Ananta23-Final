import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AnantaLogo from '../assets/logos/ananta_logo.svg'
import profileIcon from '../assets/icons/Profile.svg'
import '../navbar.css'


function Navbar() {

    const { currentUser } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <nav data-is-open={isOpen}>
                <div className="nav">
                    <div className="nav__logo">
                        <img src={AnantaLogo} alt="NayanVR Logo" />
                    </div>
                    <div className="nav__links">
                        <a href="/">Home</a>
                        <a href="">Events</a>
                        <a href="/buypass">Buy a Pass</a>
                        <a href="">Digital Points</a>
                        <a href="">Schedule</a>
                        <div className="dropdown">
                            <button className="dropbtn">More</button>
                            <div className="dropdown-content">
                                <a href="">About Us</a>
                                <a href="">Our Team</a>
                                <a href="">Our Partners</a>
                            </div>
                        </div>
                    </div>
                    {
                        currentUser ?
                            <button className='px-3 py-3 rounded-md bg-primary-light-2 text-white' onClick={() => { window.location.href = "/profile" }}>
                                <img className='object-contain' src={profileIcon} alt="Profile" />
                            </button>
                            :
                            <button className='py-2 px-6 rounded-md bg-primary-dark-1 text-white' onClick={() => { window.location.href = "/login" }}>LOGIN</button>
                    }
                    <div onClick={_ => { setIsOpen(!isOpen) }} className="nav__toggle">
                        <span className="nav__toggle__bars"></span>
                    </div>
                </div>
            </nav>
            <div className="nav__mob__links">
                <a href="/">Home</a>
                <a href="">Events</a>
                <a href="/buypass">Buy a Pass</a>
                <a href="">Digital Points</a>
                <a href="">Schedule</a>
                <a href="">About Us</a>
                <a href="">Our Team</a>
                <a href="">Our Partners</a>
            </div>
        </>
    )
}

export default Navbar