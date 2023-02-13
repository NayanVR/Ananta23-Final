import React from 'react'
import Coming from '../assets/icons/coming1.png'

function ComingSoon() {
    return (
        <>
            <div className=' sm:h-screen w-full p-0 sm:p-12 flex justify-center items-end'>
                <img src={Coming} className='w-full sm:w-1/2' alt="" />

            </div>
            {/* <div className='flex h-[calc(100vh-3.5rem)] justify-center items-end'>
                <img src={Coming} className="flex overflow-hidden h-[100vh] justify-center items-center sm:items-center " alt="" />
                <h1 className='flex justify-center items-center text-4xl font-heading font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>Coming Soon</h1>
            </div> */}
        </>
    )
}

export default ComingSoon