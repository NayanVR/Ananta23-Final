import React from 'react'
import { useState } from 'react'
import AnantaLogo from '../assets/logos/ananta_logo.svg'
import GSFCULogo from '../assets/logos/GSFCU_logo.svg'
import Twitter from '../assets/icons/Twitter_icon.svg'
import Instagram from '../assets/icons/Insta_icon.svg'
import WhatsApp from '../assets/icons/Whatsapp_icon.svg'
import Facebook from '../assets/icons/Facebook_icon.svg'
import Location from '../assets/icons/Location_icon.svg'

function Footer() {

  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div>
    <footer className='bg-primary-light-3 border-primary border-t-[1px] flex justify-center items-center flex-wrap py-16 px-24 gap-8 h-max w-full'>
      <div className='min-w-[18rem] max-w-xl w-full flex-1'>
        <h2 className='font-heading font-bold text-2xl text-primary md:text-left text-center'>Address</h2>
        <p className='text-primary-dark-2 mt-2 md:text-left text-center'>Event Room, GUIITAR Lab 7, Anviksha,<br />
          GSFC University, P. O. Fertilizernagar,<br />
          Vadodara - 391750, Gujarat, India</p>
        <h2 className='font-heading font-bold mt-6 text-2xl text-primary md:text-left text-center'>Contact</h2>
        <p className='text-primary-dark-2 mt-2 md:text-left text-center'>
          Email : <a href="mailto:ananta@gsfcuniversity.ac.in">ananta@gsfcuniversity.ac.in </a>
        </p>
      </div>
      <div className='min-w-[18rem] max-w-xl w-full flex-1 flex flex-col gap-4 justify-center items-center'>
        <img className='w-1/2' src={GSFCULogo} alt="Gsfcu Logo" />
        <img className='w-1/2' src={AnantaLogo} alt="Ananta Logo" />
        <div className='flex gap-1'>
          <a href="">
            <img  className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={Twitter} alt="Ananta Twitter" />
          </a>
          <a href="">
            <img className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={Instagram} alt="Ananta Instagram" />
          </a>
          <a href="">
            <img className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={WhatsApp} alt="Ananta WhatsApp" />
          </a>
          <a href="">
            <img className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={Facebook} alt="Ananta facebook" />
          </a>
          <a href="">
            <img className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={Location} alt="Ananta Location" />
          </a>
        </div>
      </div>
      <div className='min-w-[18rem] max-w-xl w-full pl-0 sm:pl-12 flex-1'>
        <h1 className='mb-2 font-heading font-bold text-2xl text-primary text-center'>Ask Query!</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className='px-4 py-2 border border-b-0 rounded-t-lg' required />
          <textarea onChange={e => setQuery(e.target.value)} value={query} placeholder="Type your query" className='px-4 py-2 h-24 border resize-none' style={{ scrollbarWidth: 'thin' }} required name="query"></textarea>
          <button className='py-2 bg-primary-dark-1 text-white rounded-b-lg' type="submit">SUBMIT</button>
        </form>
      </div>
    </footer>
    <div className='w-full h-max bg-primary-dark-1 px-8 md:px-24 py-2 flex items-center justify-center md:justify-between'>
      <p className='hidden md:block text-white'>Made by Team Ananta❤️</p>
      <div className='flex justify-center items-center gap-2 sm:gap-6 flex-col sm:flex-row'>
        <a className='text-white text-center' href="/privacy-policy">Privacy Policy</a>
        <a className='text-white text-center' href="/refund-policy">Calcellation & Refund Policy</a>
        <a className='text-white text-center' href="/term&condition">Terms & Conditions</a>
      </div>
    </div>
   </div>
  )
}

export default Footer