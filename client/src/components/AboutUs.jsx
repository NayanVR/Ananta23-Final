import React from 'react'
import AboutImg from '../assets/illustrations/AboutUs.svg'

function AboutUs() {
  return (
    <section id='about'>
      <div className='w-full py-12 md:py-32 px-[10%] relative overflow-hidden'>
        <h1 className='text-center md:text-left text-4xl font-heading font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
          About Us
        </h1>
        <p className='text-justify md:text-left text-primary-dark-2 text-xl mt-8 md:pr-[20%]'>Ananta (अनंत), is a marquee annual event (fest) of GSFC university that serves as the biggest festival of the year. It derives its name from a Sanskrit word meaning “Infinite” and symbolizes the endless possibilities and opportunities it creates for every student connected with us. The annual fest provides a common platform for students, professionals, and enthusiasts alike, coming from different walks of life, and enables them to interact, network, and share their vital experiences. Above all, Ananta is a celebration of college life!</p>

        <p className='text-justify md:text-left text-primary-dark-2 text-xl mt-8 md:pr-[20%]' >
        We stand out as having a core foundation with the university's ideology and integrity of giving holistic development to its students. The prospects and objectives of this fest are to diversify the students of the university by providing them a common platform to showcase and express themselves in preceding spaces like mentorship, entrepreneurship, and managerial skills. We believe in giving opportunities and experiences which will benefit students from all walks of life. The fest is for the students, by the students, and of the students.</p>
        <img className='hidden md:block absolute h-3/4 animate-aboutAnim translate-x-1/2 right-0 top-1/2 -translate-y-1/2' src={AboutImg} alt="About Ananta" />
      </div>
    </section>
  )
}

export default AboutUs