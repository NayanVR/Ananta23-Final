import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AnantaLogo from '../assets/logos/ananta_logo.svg'
import profileIcon from '../assets/icons/Profile.svg'
import '../navbar.css'
import { signOut } from 'firebase/auth'
import { auth, provider } from "../firebase"

// import DropdownButton from 'react-bootstrap/DropdownButton';


function Navbar() {

    const { currentUser } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <nav data-is-open={isOpen}>
                <div className="nav">
                    <div className="nav__logo">
                        <img src={AnantaLogo} alt="Ananta logo" />
                    </div>
                    <div className="nav__links">
                        <a href="/">Home</a>
                        <div className="dropdown" data-dropdown-placement="left-end">
                            <button className="dropbtn">Events</button>
                            <div className="dropdown-content z-20 hidden bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700">
                                <a href="/inertia">Inertia</a>
                                <a href="">Swoosh</a>
                                <a href="">Upshot</a>
                                <a href="">Zingaat</a>
                                <a href="">Kala Kriti</a>
                                <a href="">Equilibrium</a>
                                <a href="">Atmos</a>
                            </div>
                        </div>
                        <a href="/buypass">Buy a Pass</a>
                        <a href="">Digital Points</a>
                        <a href="">Schedule</a>
                        <div className="dropdown" data-dropdown-placement="left-end">
                            <button className="dropbtn">More</button>
                            <div className="dropdown-content z-20 hidden bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700">
                                <a href="/aboutUs">About Us</a>
                                <a href="">Our Team</a>
                                <a href="">Our Partners</a>
                            </div>
                        </div>
                    </div>
                    {
                        currentUser ?

                            <button className="dropdown rounded-md bg-primary-light-1 text-white">
                                <button className='px-3 py-3 rounded-md bg-primary-light-2 text-white'>
                                    <img className='object-contain' src={profileIcon} alt="Profile" />
                                </button>
                                <div className="dropdown-content right-0 br-3">
                                    <a href="/Profile">Profile</a>
                                    <a onClick={() => signOut(auth)}>Logout</a>
                                </div>
                            </button>
                            // <button className='py-3 px-3 rounded-md bg-primary-light-1 text-white' onClick={() => { () => signOut(auth) }}>
                            //     <img className='object-contain' src={profileIcon} alt="Profile" />
                            // </button>
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