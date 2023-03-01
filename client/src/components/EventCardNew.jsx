import React from 'react'
import Divider from '../assets/icons/card_divider.svg'
import Doc from '../assets/icons/Doc1.svg'

function EventCard1({ event, registerNow, viewDetails }) {
    return (
        <>
            <div className='flex my-10 flex-col justify-center items-center h-[70vh] max-h-[50rem] w-full max-w-xs'>
                <div className='relative w-full h-1/3 bg-gradient-to-t from-[rgba(120,189,196)] -z-10'>
                    <img src={`/events/${event.image}`} className='absolute w-40 top-1/3 left-1/2 -translate-x-1/2 animate-levitate' />
                    <img src={Divider} className='absolute bottom-0 left-0' alt="Divider" />
                </div>
                <div className='p-4 flex flex-col justify-between rounded-b-md w-full h-2/3 bg-primary-dark-1'>
                    <div>
                        <h1 className="text-white text-bold text-center text-2xl font-semibold">{event.name}</h1>
                        <p className='text-primary-light-2 text-justify p-1 h-44 overflow-y-auto no-scrollbar'>{event.desc}</p>
                    </div>
                    <div className='flex flex-row h-12 justify-around'>
                        <button className='bg-primary-light-1 w-4/5 h-10 rounded-md text-lg font-semibold uppercase' onClick={() => { registerNow(event.eventCode, event.name) }}>
                            {
                                event.price
                                    ?
                                    event.fakePrice
                                        ?
                                        <>
                                            PAY&nbsp;
                                            <span className='relative line-through after:content-[""] after:block after:w-full after:h-[1px] after:bg-black after:text-black after:absolute after:top-1/2 after:left-0'>₹{event.fakePrice}</span>
                                            &nbsp;
                                            <span className=''>
                                                ₹ {event.price}
                                            </span>
                                        </>
                                        :
                                        `Pay ₹${event.price}`
                                    :
                                    "Register"
                            }
                        </button>
                        <button className='flex bg-primary justify-center items-center h-10 w-10 rounded-md' onClick={() => { window.open(event.link, "_blank") }}>
                            <img className='h-6' src={Doc} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}





export default EventCard1