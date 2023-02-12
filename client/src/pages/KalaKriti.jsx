import React from 'react'
import EventCard from '../components/EventCard'
import Swift from '../assets/photos/upshots/swift.png'
import profilePic from '../assets/photos/profile.jpg'
import ComingSoon from '../components/ComingSoon'

function Inertia() {

  const events = [
    {
      eventCode: 'IN_AA',
      name: 'Agar Art',
      desc: 'Everyone knows how colorful the world of microbes is. Why not represent it in a beautiful way? Bring out your inner artist by using streaking, preading and pouring to make a colorful creation on Agar using microbes.',
      mobDesc: 'Science, technology, engineering and mathematics are the four basic topics we see around ourselves everyday. Bring out working models, business models and prototypes to display your ideas and potential talent.',
      image: Swift,
    },
    {
      eventCode: 'IN_VSM',
      name: 'Virtual Stock Market',
      desc: 'Explore a new world of stock market, deduce the effect of news, buy and sell virtual stocks on the stock market along with share prices in a risk-free environment.',
      mobDesc: 'Code Wars is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round.',
      image: profilePic,
    },
    {
      eventCode: 'HACKATHON',
      name: 'Hackathon',
      desc: 'You think you know chemistry? Take this fun quiz and show how much it takes to sort the jeopardy that is indeed chemical engineering.',
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
    // <>
    //   <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
    //     Inertia
    //   </h1>
    //   <div style={{ scrollbarWidth: 'none' }} className='relative h-[calc(100vh-13rem)] mb-20 w-full snap-y snap-mandatory flex gap-[10rem] flex-col items-center overflow-y-scroll'>
    //     {
    //       events.map((event, index) => (
    //         <EventCard key={index} index={index} event={event} registerNow={registerNow} viewDetails={viewDetails} />
    //       ))
    //     }
    //   </div>
    // </>
    <>
      <ComingSoon />
    </>
  )
}

export default Inertia