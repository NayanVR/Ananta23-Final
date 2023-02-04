import React from 'react'
import Divider from '../assets/icons/card_divider.svg'
import Doc from '../assets/icons/Doc1.svg'

function EventCard1({ event, registerNow, viewDetails }) {
    return (
        <>
            <div className='flex flex-col justify-center items-center h-[70vh] max-h-[30rem] w-full max-w-xs'>
                <div className='relative w-full h-1/3 bg-gradient-to-t from-[rgba(120,189,196)]'>
                    <img src={`/events/${event.image}`} className='absolute w-60 top-1/2 left-1/2 -translate-x-1/2 animate-levitate' />
                    <img src={Divider} className='absolute bottom-0 left-0' alt="Divider" />
                </div>
                <div className='p-4 flex flex-col justify-between rounded-b-md w-full h-2/3 bg-primary-dark-1'>
                    <div>
                        <h1 className="text-white text-bold text-center text-2xl font-semibold">{event.name}</h1>
                        <p className='text-primary-light-2 text-justify p-1 h-44 overflow-y-auto'>{event.desc}</p>
                    </div>
                    <div className='flex flex-row h-12 justify-around'>
                        <button className='bg-primary-light-1 w-4/5 h-10 rounded-md text-lg font-semibold uppercase' onClick={() => { registerNow(event.eventCode, event.name) }}>Register</button>
                        <button className='flex bg-primary justify-center items-center h-10 w-10 rounded-md' onClick={() => { viewDetails(event.eventCode) }}>
                            <img className='h-6' src={Doc} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}





export default EventCard1