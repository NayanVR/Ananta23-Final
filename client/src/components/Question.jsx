import React from 'react'
import Ananta from '../assets/logos/ananta_logo.svg'
import Quedata from '../assets/Que.json'

function Question() {
    return (
        <div className='w-screen border border-red-700 pb-3 items-center justify-center'>
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
                {/* <img src={Ananta} className='' alt="" /> */}
            </div>

            <div className='flex flex-col pt-3 py-7 mx-4 md:mx-0 items-center'>

                <div className='w-full  md:w-8/12 h-1/4 my-2  border border-5 text-lg border-primary  shadow-md rounded-sm  md:mx-3 text-center'>{Quedata.Question}</div>
                <button className=' w-full md:w-8/12  h-1/4 my-2 border border-5 text-lg border-primary  shadow-md rounded-sm hover:bg-primary hover:text-white  '>{Quedata.Answer1}</button>
                <button className='w-full md:w-8/12 h-1/5 my-2 border border-5 text-lg border-primary  shadow-md rounded-sm hover:bg-primary hover:text-white '>{Quedata.Answer2}</button>
                <button className='w-full md:w-8/12 h-1/5 my-2 border border-5 text-lg border-primary  shadow-md rounded-sm hover:bg-primary hover:text-white '>{Quedata.Answer3}</button>
                <button className='w-full md:w-8/12 h-1/5 my-2 border border-5 text-lg border-primary  shadow-md rounded-sm hover:bg-primary hover:text-white '>{Quedata.Answer4}</button>
            </div>
            <div className='flex justify-around mx-3 items-center'>
                <button className=' z-50 relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 text-white rounded-md' onClick={_ => { window.location.href = "/" }}>Correct</button>
                <button className=' z-50 relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden py-2 px-16 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 text-white rounded-md' onClick={_ => { window.location.href = "/" }}>Clear</button>
            </div>
        </div>
    )
}



export default Question