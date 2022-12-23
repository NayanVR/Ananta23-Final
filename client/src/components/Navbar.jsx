import React from 'react'
import { useState } from 'react'
import LogoBG from '../assets/navbar_rect.svg'
import AnantaLogo from '../assets/ananta_logo.svg'

function Navbar() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav data-open={isOpen} className='group w-screen h-max'>
            {/* Top Line */}
            <div className='w-full h-2 bg-primary'>
            </div>
            {/* Navbar */}
            <div className='w-full h-16 flex justify-between items-center sm:flex-row'>
                <div className='h-full relative'>
                    <img className='h-full' src={LogoBG} />
                    <img className='h-2/3 absolute top-[45%] left-2 -translate-y-1/2' src={AnantaLogo} alt="Ananta Logo" />
                </div>
                <ul className='absolute -top-80 group-data-[open=true]:top-16 flex justify-center items-center flex-col h-max md:h-full md:relative md:flex-row md: inset-0'>
                    <li className='px-4'>
                        <a href='#'>Home</a>
                    </li>
                    <li className='px-4'>
                        <a href='#'>About</a>
                    </li>
                    <li className='px-4'>
                        <a href='#'>Contact</a>
                    </li>
                    <li>
                        <button className='bg-primary text-white px-6 py-2 mx-4'>Login</button>
                    </li>
                </ul>
                <button onClick={_ => { setIsOpen(!isOpen) }} className='bg-primary text-white px-6 py-2 mx-4 md:hidden'>Menu</button>
            </div>
        </nav>
    )
}

export default Navbar