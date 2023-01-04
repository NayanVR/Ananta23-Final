import React from 'react'
import EventCard from '../components/EventCard'

function Inertia() {
  return (
    <div className='relative h-screen w-full flex flex-col items-center overflow-y-scroll'>
      <EventCard index={1} />
      <EventCard index={2} />
      <EventCard index={3} />
    </div>
  )
}

export default Inertia