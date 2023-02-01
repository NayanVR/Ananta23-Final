import React from 'react'
import Anantalogo from '../assets/logos/ananta_logo.svg'
import Renish from '../assets/photos/Renish.jpg'

function Team() {
    return (
        <div className='flex min-h-screen items-center justify-center '>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 '>
                <div className='group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow rounded-md '>
                    <div className='h-96 w-72'>
                        <img src={Renish} className='h-full w-full object-cover group-hover:rotate-1 group-hover:scale-125 transition-transform ' alt="" />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70'></div>
                    <div className='absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[40%] group-hover:translate-y-0 transition-all'>
                        <h1 className='text-3xl font-bold text-white'>Sponsorship Head</h1>
                        <p className='text-lg itallic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity '>Renish Narola</p>
                        <button className='rounded-full shadow-black/60  bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white'>
                            See More
                        </button>
                    </div>

                </div>
                <div className='group relative items-center justify-center overflow-hidden cursor=pointer hover:shadow-xl hover:shadow-black/30  rounded-md'>
                    <div className='h-96 w-72'>
                        <img src={Renish} className='h-full w-full object-cover group-hover:rotate-1 group-hover:scale-125    transition-transform ' alt="" />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70'></div>
                    <div className='absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[40%] group-hover:translate-y-0 transition-all'>
                        <h1 className='text-3xl font-bold text-white'>Web Head</h1>
                        <h7 className='text-lg itallic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity'>Nishant Viroja</h7>
                        <p className='text-lg itallic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity'> im Noob</p>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Team 