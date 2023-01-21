import React from 'react'

function EventCard({ index, event, registerNow, viewDetails }) {
  return (
    <div className='w-full min-h-full pb-20 snap-start sticky top-0 left-0 flex justify-center items-center'>
      <div style={{ zIndex: index }} className='w-[90%] sm:w-3/4 h-full p-4 sm:p-12 flex flex-col-reverse sm:flex-row gap-4 items-center justify-center bg-primary-light-3 border-primary-light-1 border-2 rounded-md'>
        <div className='sm:flex-[2]'>
          <h1 className="font-sans text-4xl text-center sm:text-left font-black bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
            {event.name}
          </h1>
          <p className='hidden sm:block my-4 sm:my-6 text-justify sm:text-left'>
            {event.desc}
          </p>
          <button onClick={() => { registerNow(event.eventCode, event.name) }} className='w-full sm:w-auto py-2 px-4 bg-primary-dark-1 text-white rounded-md'>
            Register Now
          </button>
          <button onClick={() => { viewDetails(event.eventCode) }} className='w-full sm:w-auto py-2 px-4 mt-4 sm:mt-0 sm:ml-4 text-primary-dark-1 bg-white border-primary-dark-1 border rounded-md'>
            View Details
          </button>
        </div>
        <div className='sm:flex-[1]'>
          <img src={event.image} alt="Swift Fingers" className='w-full h-full object-cover' />
        </div>
      </div>
    </div>
  )
}

export default EventCard