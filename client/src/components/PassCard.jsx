import React from 'react'

function PassCard({ passInfo, buyClick }) {
  return (
    <>
      <div style={{ borderColor: passInfo.color }} className='group max-w-full sm:w-80 h-max sm:h-96 m-6 px-8 pb-6 flex flex-col items-center justify-between gap-4 bg-primary-light-3 border-4 rounded-2xl hover:scale-105 transition-all relative overflow-hidden'>
        <div style={{ backgroundColor: passInfo.color }} className='absolute w-60 h-60 top-0 right-0 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity'></div>
        <div className='w-full h-max flex justify-between items-center'>
          <h1 style={{ color: passInfo.color }} className='font-heading font-black text-2xl'>
            {passInfo.name}
            <span style={{ backgroundColor: passInfo.color }} className='w-1/2 h-1 block'></span>
          </h1>
          <img className='h-20 -translate-y-[1px]' src={passInfo.markImg} alt={passInfo.name} />
        </div>
        <div>
          <h1 className='text-2xl text-center font-bold bg-gradient-to-b from-primary to-primary-dark-1 bg-clip-text text-transparent '>
            ₹ {passInfo.price}
          </h1>
          <ul className='text-center'>
            {
              passInfo.features.map((feature, index) => {
                return <li key={index}>{feature}</li>
              })
            }
          </ul>
        </div>
        <button className='relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 py-3 mt-4 w-full bg-primary-dark-1 font-heading font-bold text-white rounded-lg'
          onClick={() => { buyClick(passInfo.id) }}
        >BUY NOW</button>
      </div>
    </>
  )
}

export default PassCard