import React from 'react'
import { Link } from 'react-router-dom'

export default function EventBox({ title, desc, link, sub }) {
    return (
        <div className='group w-64 h-64 p-4 bg-white flex flex-col gap-4 justify-center items-center transition-all relative cursor-pointer'>
            {/* Corner circles */}
            <div className='w-2 h-2 -mt-1 -ml-1 group-hover:scale-150 bg-white rounded-full absolute top-0 left-0 border border-primary transition-all'></div>
            <div className='w-2 h-2 -mb-1 -mr-1 group-hover:scale-150 bg-white rounded-full absolute bottom-0 right-0 border border-primary transition-all'></div>

            {/* background border */}
            <div className='w-[calc(100%+1px)] h-[calc(100%+1px)] absolute -top-[1px] -left-[1px] bg-gradient-to-br from-primary via-transparent to-transparent -z-10'></div>
            <div className='w-[calc(100%+1px)] h-[calc(100%+1px)] absolute -bottom-[1px] -right-[1px] bg-gradient-to-tl from-primary via-transparent to-transparent -z-10'></div>

            {/* heading */}
            <div className='absolute group-hover:relative flex gap-4 group-hover:gap-0 flex-col justify-center items-center transition-all'>
                <h1 className='font-heading text-center text-3xl font-extrabold text-primary'>{title}</h1>
                <h2 className='text-sm font-black text-primary-dark-1 uppercase'>{sub}</h2>
            </div>

            {/* description */}
            <div className='scale-y-0 group-hover:scale-y-100 flex flex-col justify-center items-center transition-transform'>
                <p className='text-center text-sm'>{desc}</p>
                <Link className='font-bold underline underline-offset-4' to={link}>Learn More →</Link>
            </div>
        </div>
    )
}
