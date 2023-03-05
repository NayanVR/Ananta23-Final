import React from 'react'
import PMC from '../assets/logos/PMC.png'
import Question from '../components/Question'
import Lottie from 'lottie-react'
import Celebrate from '../assets/celebrate.json'

function QOTD() {

    function showSuccess() {
        toast.success('Success', { duration: 3000 })
    }

    return (
        <div className='w-full relativersd pb-3 items-center justify-center'>
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
            <div className='flex-col flex md:flex-row justify-center md:justify-around items-center'>
                <h1 className='font-heading text-center my-12 text-[2rem] sm:text-[2rem]  font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent' >Question of the day</h1>
                <img src={PMC} className='w-24 md:w-40 ' alt="" />
            </div>

            <Question showSuccess={showSuccess} />

            <div className='flex justify-center items-center mx-3'>
                <h3> *For every right answer you will be rewarded with <span className='font-bold'>60 Ananta coins</span></h3>
            </div>
            <Lottie animationData={Celebrate} className='absolute top-0' />
        </div>
    )
}

export default QOTD