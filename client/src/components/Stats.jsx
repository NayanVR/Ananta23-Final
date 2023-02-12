import React from 'react'

function Stats() {
    return (
        <section id='statistics'>
            <div className='w-full h-max py-16 px-24 gap-16 flex flex-wrap justify-around items-center bg-gradient-to-b from-primary-light-1 to-primary'>
                <div className='flex flex-col justify-center items-center text-white'>
                    <h2 className='text-4xl font-bold'>30+</h2>
                    <h3 className='text-xl'>Events</h3>
                </div>
                <div className='flex flex-col justify-center items-center text-white'>
                    <h2 className='text-4xl font-bold'>1500+</h2>
                    <h3 className='text-xl'>Participants</h3>
                </div>
                <div className='flex flex-col justify-center items-center text-white'>
                    <h2 className='text-4xl font-bold'>15+</h2>
                    <h3 className='text-xl'>Associations</h3>
                </div>
                <div className='flex flex-col justify-center items-center text-white'>
                    <h2 className='text-4xl font-bold'>46+</h2>
                    <h3 className='text-xl'>Institutions</h3>
                </div>
            </div>
        </section>
    )
}

export default Stats