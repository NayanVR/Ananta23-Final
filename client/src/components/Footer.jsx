import React from 'react'
import { useState } from 'react'
import AnantaLogo from '../assets/ananta_logo.svg'
import Twitter from '../assets/Twitter_icon.svg'
import Instagram from '../assets/Insta_icon.svg'
import WhatsApp from '../assets/Whatsapp_icon.svg'
import Facebook from '../assets/Facebook_icon.svg'
import Location from '../assets/Location_icon.svg'

function Footer() {

  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')

  return (
    <footer className='bg-primary-light-3 flex justify-center items-center flex-wrap py-16 px-24 gap-8 h-max w-full'>
      <div className='min-w-[18rem] max-w-xl w-full flex-1'>
        <h2 className='font-heading font-bold text-2xl text-primary md:text-left text-center'>Address</h2>
        <p className='text-primary-dark-2 mt-2 md:text-left text-center'>Event Room, GUIITAR Lab 7, Anviksha,<br />
          GSFC University, P. O. Fertilizernagar,<br />
          Vadodara - 391750, Gujarat, India</p>
        <h2 className='font-heading font-bold text-2xl text-primary mt-4 md:text-left text-center'>Contact Details</h2>
        <p className='text-primary-dark-2 mt-2 md:text-left text-center'>
          Email : <a href="mailto:ananta@gsfcuniversity.ac.in">ananta@gsfcuniversity.ac.in </a>
        </p>
      </div>
      <div className='min-w-[18rem] max-w-xl w-full flex-1 flex flex-col gap-4 justify-center items-center'>
        <img src={AnantaLogo} alt="AnantaLogo" />
        <img src={AnantaLogo} alt="AnantaLogo" />
        <div className='flex gap-1'>
          <a href="">
            <img className='w-10' src={Twitter} alt="Ananta Twitter" />
          </a>
          <a href="">
            <img className='w-10' src={Instagram} alt="Ananta Instagram" />
          </a>
          <a href="">
            <img className='w-10' src={WhatsApp} alt="Ananta WhatsApp" />
          </a>
          <a href="">
            <img className='w-10' src={Facebook} alt="Ananta facebook" />
          </a>
          <a href="">
            <img className='w-10' src={Location} alt="Ananta Location" />
          </a>
        </div>
      </div>
      <div className='min-w-[18rem] max-w-xl w-full pl-0 sm:pl-12 flex-1'>
        <h1 className='mb-2 font-heading font-bold text-2xl text-primary text-center'>Ask Query!</h1>
        <form className='flex flex-col'>
          <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className='px-4 py-2 border rounded-t-md' required />
          <textarea onChange={e => setQuery(e.target.value)} value={query} placeholder="Type your query" className='px-4 py-2 h-24 border resize-none' required name="query"></textarea>
          <button className='py-2 bg-primary-dark-1 text-white rounded-b-md' type="submit">SUBMIT</button>
        </form>
      </div>
    </footer>
  )
}

export default Footer