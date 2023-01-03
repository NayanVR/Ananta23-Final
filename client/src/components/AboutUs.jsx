import React from 'react'
import AboutImg from '../assets/illustrations/AboutUs.svg'

function AboutUs() {
  return (
    <section id='about'>
      <div className='w-full py-32 px-[10%] relative overflow-hidden'>
        <h1 className=' text-4xl font-heading font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent'>
          About Us
        </h1>
        <p className='text-primary-dark-2 text-xl mt-8 md:pr-[20%]'>
          GSFC University is currently one of the fastest-growing universities in Gujarat that caters for a wide range of students across all disciplines with the vision to provide high-quality education to make students industry-ready. To celebrate this fleet of student community we present ANANTA'22- Innovation Inspired Technology.
        </p>

        <p className='text-primary-dark-2 text-xl mt-8 md:pr-[20%]' >
          ANANTA'22 will continue the legacy of our previous fest with the aim to bring together people from all sections of society to commemorate the evergrowing marvels and advancements of technology with the theme “Multiverse of Technology”. During our previous fest, we got an inaugural moment from none other than the MITRA robot with Treasure Hunt, Robo War, a performance from “The Diversity” and Sunburn Campus feat. Dual Vibes.
        </p>
        <img className='hidden md:block absolute h-3/4 animate-aboutAnim translate-x-1/2 right-0 top-1/2 -translate-y-1/2' src={AboutImg} alt="About Ananta" />
      </div>
    </section>
  )
}

export default AboutUs