import React from 'react'
import { useState } from 'react'
import LogoBG from '../assets/navbar_rect.svg'
import AnantaLogo from '../assets/ananta_logo.svg'
import '../navbar.css'


function Navbar() {
    
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav>
            <div class="nav" data-is-open={isOpen}>
                <div class="nav__logo">
                    <img alt="NayanVR Logo" />
                </div>
                <div class="nav__links">
                    <a href="#about">About</a>
                    <a href="#work">Work</a>
                    <a href="#skills">Skills</a>
                    <a href="#contact">Contact</a>
                </div>
                <div onClick={_ => { setIsOpen(!isOpen) }} class="nav__toggle">
                    <span class="nav__toggle__bars"></span>
                </div>
            </div>
        </nav>
        )
}

export default Navbar