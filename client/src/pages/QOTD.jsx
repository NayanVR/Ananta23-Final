import React from 'react'
import PMC from '../assets/logos/PMC.png'
import Question from '../components/Question'

function QOTD() {

    return (
        <div className='w-full pb-3 items-center justify-center'>
            <div style={{ top: 0, transform: "rotate(180deg)" }} className="wrap-grid-container opacity-20">
                <div className="grid-container">
                    <div className='grid-top-gradient'></div>
                    {
                        [...Array(250)].map((_, i) => {

                            return (
                                <div key={i} className='grid-item'></div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="wrap-grid-container opacity-20">
                <div className="grid-container">
                    <div className='grid-top-gradient'></div>
                    {
                        [...Array(250)].map((_, i) => (
                            <div key={i} className='grid-item'></div>
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-around items-center'>
                <h1 className='font-heading text-center my-12 text-[2rem] sm:text-[2rem]  font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent' >Question of the day</h1>
                <img src={PMC} className='w-24 md:w-40' alt="" />
            </div>

            <Question />
        </div>
    )
}

export default QOTD