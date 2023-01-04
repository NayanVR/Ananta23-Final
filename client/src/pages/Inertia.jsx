import React from 'react'
import EventCard from '../components/EventCard'
import Swift from '../assets/photos/upshots/swift.png'

function Inertia() {

  const events = [
    {
      eventCode: 'STEMSHOWCASE',
      name: 'STEM Showcase',
      desc: 'Science, technology, engineering and mathematics are the four basic topics we see around ourselves everyday. Bring out working models, business models and prototypes to display your ideas and potential talent. Science, technology, engineering and mathematics are the four basic topics we see around ourselves everyday. Bring out working models, business models and prototypes to display your ideas and potential talent.',
      mobDesc: 'Science, technology, engineering and mathematics are the four basic topics we see around ourselves everyday. Bring out working models, business models and prototypes to display your ideas and potential talent.',
      image: Swift,
    },
    {
      eventCode: 'CODEWARS',
      name: 'Code Wars',
      desc: 'Code Wars is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round. Code Wars is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round.',
      mobDesc: 'Code Wars is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round.',
      image: Swift,
    },
    {
      eventCode: 'HACKATHON',
      name: 'Hackathon',
      desc: 'Hackathon is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round. Hackathon is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round.',
      mobDesc: 'Hackathon is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round.',
      image: Swift,
    }
  ]

  function registerNow(eventCode) {
    console.log('Register Now', eventCode)
  }

  function viewDetails(eventCode) {
    console.log('View Details', eventCode)
  } 

  return (
    <>
      <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
        Inertia
      </h1>
      <div style={{ scrollbarWidth: 'none' }} className='relative h-[calc(100vh-13rem)] mb-20 w-full snap-y snap-mandatory flex gap-[10rem] flex-col items-center overflow-y-scroll'>
        {
          events.map((event, index) => (
            <EventCard key={index} index={index} event={event} registerNow={registerNow} viewDetails={viewDetails} />
          ))
        }
      </div>
    </>
  )
}

export default Inertia