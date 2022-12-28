import React from 'react'
import CPUChip from '../assets/cpu_chip.svg'

function EventChip({ title, desc, link }) {
  return (
    <div className='w-max h-max flex justify-center items-center flex-grow'>
        <div className='w-max group relative'>
            <img src={CPUChip} />
            <div className='w-[53%] h-[53%] absolute flex flex-col justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <p className='text-center text-sm'>{desc}</p>
                <a className='font-bold underline underline-offset-4' href={link}>Learn More →</a>
            </div>
            <div className='w-[53%] h-[53%] z-10 rounded-lg group-hover:scale-y-0 group-hover:opacity-0 transition-all duration-500 absolute bg-gradient-to-b from-primary-light-1 to-primary-light-2 flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <h1 className='text-2xl font-black text-primary-dark-1 uppercase'>
                    {title}    
                </h1>
            </div>
        </div>
    </div>
  )
}

export default EventChip