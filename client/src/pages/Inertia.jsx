import React from 'react'
import EventCard from '../components/EventCard'

function Inertia() {
  return (
    <div className='relative h-screen overflow-y-scroll'>
      <EventCard index={1} />
      <EventCard index={2} />
    </div>
  )
}

export default Inertia