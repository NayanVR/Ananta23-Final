import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnantaLogo from '../assets/logos/ananta_logo.svg'
import GSFCULogo from '../assets/logos/GSFCU_logo.svg'
import Twitter from '../assets/icons/Twitter_icon.svg'
import Instagram from '../assets/icons/Insta_icon.svg'
import Linkedin from '../assets/icons/linkedin_icon.svg'
import Facebook from '../assets/icons/Facebook_icon.svg'
import Location from '../assets/icons/Location_icon.svg'
import { toast } from 'react-hot-toast'
import { HashLoader } from "react-spinners/HashLoader"

function Footer() {

  const [spin, setSpin] = useState(false);

  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')

  const serverURL = import.meta.env.VITE_SERVER_URL;

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch(serverURL + "/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, query }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      setEmail('')
      setQuery('')
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }
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
            Phone No : <a href="https://wa.me/+918140390836">+918140390836</a> /
            <a href="https://wa.me/+916359812434"> +916359812434</a>
          </p>
          <p className='text-primary-dark-2 mt-2 md:text-left text-center'>
            Email : <a href="mailto:ananta@gsfcuniversity.ac.in">ananta@gsfcuniversity.ac.in </a> <br />
            <a className='ml-14' href="mailto:support@anantagsfcu.in">support@anantagsfcu.in</a>
          </p>

        </div>
        <div className='min-w-[18rem] max-w-xl w-full flex-1 flex flex-col gap-4 justify-center items-center'>
          <img className='w-1/2' src={GSFCULogo} alt="Gsfcu Logo" />
          <img className='w-1/2' src={AnantaLogo} alt="Ananta Logo" />
          <div className='flex gap-1'>
            <a href="https://twitter.com/AGsfcu">
              <img className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={Twitter} alt="Ananta Twitter" />
            </a>
            <a href="https://www.instagram.com/ananta.gsfcu/">
              <img className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={Instagram} alt="Ananta Instagram" />
            </a>
            <a href="https://www.linkedin.com/company/ananta-gsfcu/">
              <img className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={Linkedin} alt="Ananta WhatsApp" />
            </a>
            <a href="https://www.facebook.com/Ananta22-105912598726593/">
              <img className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={Facebook} alt="Ananta facebook" />
            </a>
            <a href="https://goo.gl/maps/7n3bPjJNzENRBMu5A">
              <img className='w-10 hover:-translate-y-1 hover:shadow-md transition-all' src={Location} alt="Ananta Location" />
            </a>
          </div>
        </div>
        <div className='min-w-[18rem] max-w-xl w-full pl-0 sm:pl-12 flex-1'>
          <h1 className='mb-2 font-heading font-bold text-2xl text-primary text-center'>Ask Query!</h1>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className='px-4 py-2 border border-b-0 rounded-t-lg' required />
            <textarea onChange={e => setQuery(e.target.value)} value={query} placeholder="Type your query" className='px-4 py-2 h-24 border resize-none' style={{ scrollbarWidth: 'thin' }} required name="query"></textarea>
            <button className='py-2 bg-primary-dark-1 text-white rounded-b-lg' type="submit">
              SUBMIT</button>
          </form>
        </div>
      </footer>
      <div className='w-full h-max bg-primary-dark-1 px-8 md:px-24 py-2 flex items-center justify-center md:justify-between'>
        <p className='hidden lg:block text-white'>Made by Team Ananta'23</p>
        <div className='flex justify-center items-center gap-2 sm:gap-6 flex-col sm:flex-row'>
          <Link className='text-white text-center' to="/privacy-policy">Privacy Policy</Link>
          <Link className='text-white text-center' to="/refund-policy">Calcellation & Refund Policy</Link>
          <Link className='text-white text-center' to="/term&condition">Terms & Conditions</Link>
          <Link className='text-white text-center' to="/contact-us">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer