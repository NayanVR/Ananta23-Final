import React from 'react'

function EventCard() {
  return (
    <div className='w-3/4 h-[70vh] flex bg-primary-light-3 border-primary border-2 rounded-md'>
      <div className='flex-[2]'>
        <h1 className="font-heading text-4xl font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
          STEM Showcase
        </h1>
        <p>
          Science, technology, engineering and mathematics are the four basic topics we see around ourselves everyday. Bring out working models, business models and prototypes to display your ideas and potential talent.
        </p>
        <button type='submit' className='py-2 px-4 bg-primary-dark-1 text-white rounded-md'>
          Register Now
        </button>
        <button type='submit' className='py-2 px-4 ml-4 text-primary-dark-1 bg-white border-primary-dark-1 border rounded-md'>
          View Details
        </button>
      </div>
      <div className='flex-[1]'>

      </div>
    </div>
  )
}

export default EventCard