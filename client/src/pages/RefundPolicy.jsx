import React from 'react'

function RefundPolicy() {
  return (
    <div>
        <div className='w-full h-max py-20 bg-gradient-to-b from-primary-light-1 to-primary'>
            <h2 className='text-4xl font-heading font-bold text-white text-center'>
            Cancellation and Refund Policy
            </h2>
        </div>
        <div className='py-16 px-[10%] text-xl flex flex-col gap-12 text-justify'>
        <p className='mb-2 text-end text-sm font-semibold'>Last Updated: 20-Jan-2023</p>
             
             <ul className='list-disc'>
               <li>If a participant who holds any kind pass listed on <a href="/buypass" className='text-blue-900 underline'> https://anantagsfcu.in/buypass</a>  wishes to cancel or withdraw his participation, then Ananta, an Event Management Body under GFSC University shall <span className='font-bold'> not be liable for giving any refund </span>to the participant.</li><br/>
               <li>If a participant wishes to upgrade his pass type, then no refund of the current pass shall be given to that participant. Instead you will only have to pay the remaining amount from the actual price.</li>
             </ul>
          <a href="/term&condition" className='text-blue-900 underline'>Terms and conditions Apply*</a>
  
        </div>
    </div>
  )
}

export default RefundPolicy