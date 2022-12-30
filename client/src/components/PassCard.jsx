import React from 'react'

function PassCard({ passInfo, buyClick }) {
  return (
    <div style={{ borderColor: passInfo.color }} className='w-80 px-8 pb-6 flex flex-col items-center justify-between gap-4 bg-primary-light-3 border-4 rounded-2xl'>
      <div className='w-full h-max flex justify-between items-center'>
        <h1 style={{ color: passInfo.color }} className='font-heading font-black text-2xl text-[#FFDF00]'>
          {passInfo.name}
          <span style={{ backgroundColor: passInfo.color }} className='w-1/2 h-1 block'></span>
        </h1>
        <img className='h-20' src={passInfo.markImg} alt="Gold Pass" />
      </div>
      <div>
        <h1 className='text-2xl font-bold'>
          ₹ {passInfo.price}
        </h1>
        <ul className='text-center'>
          {
            passInfo.features.map((feature, index) => <li key={index}>{feature}</li>)
          }
        </ul>
      </div>
      <button className='py-3 mt-4 w-full bg-primary-dark-1 font-heading font-bold text-white rounded-lg' onClick={() => { buyClick(passInfo.id) }}>BUY NOW</button>
    </div>

  )
}

export default PassCard