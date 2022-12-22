import React from 'react'
import LogoBG from '../assets/navbar_rect.svg'
import AnantaLogo from '../assets/ananta_logo.svg'

function Navbar() {
    return (
        <div className='w-screen h-max'>
            {/* Top Line */}
            <div className='w-full h-2 bg-primary-light-1'>
            </div>
            {/* Navbar */}
            <nav className='w-full h-16 flex justify-between items-center sm:flex-row'>
                <div className='h-full relative'>
                    <img className='h-full' src={LogoBG} />
                    <img className='h-2/3 absolute top-[45%] left-2 -translate-y-1/2' src={AnantaLogo} alt="Ananta Logo" />
                </div>
                <div>
                    <ul className='flex justify-center '>
                        <li className='px-4 py-2'>
                            <a href='#'>Home</a>
                        </li>
                        <li className='px-4 py-2'>
                            <a href='#'>About</a>
                        </li>
                        <li className='px-4 py-2'>
                            <a href='#'>Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar