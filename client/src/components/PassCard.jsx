import React from 'react'

function PassCard({ passInfo, buyClick }) {
    return (
        <div className='bg-primary-light-1 rounded-2xl m-5 flex flex-col items-center p-8'>
            <h3>
                {passInfo.name}
            </h3>
            <h4>
                ₹{passInfo.price}
            </h4>
            <button
                onClick={() => buyClick(passInfo.id)}
                className="inline-block rounded-lg bg-primary px-4 py-1 font-semibold leading-7 text-white"
            >
                Buy
            </button>
        </div>
    )
}

export default PassCard