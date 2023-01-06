import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import profilePic from '../assets/photos/profile.jpg'

function Pro() {

  const { currentUser } = useContext(AuthContext)
  const serverURL = import.meta.env.VITE_SERVER_URL

  const profile = localStorage.getItem('profile')

  const [pid, setPid] = useState('')
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [branch, setBranch] = useState('')
  const [uniName, setUniName] = useState('')
  const [year, setYear] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  useEffect(() => {
    if (profile !== '{}') {
      const pro = JSON.parse(profile)
      if (pro.ProfileStatus === 1) {
        setFName(pro.Firstname)
        setLName(pro.Lastname)
        setEmail(pro.Email)
        setContactNo(pro.ContactNo)
        setBranch(pro.Branch)
        setUniName(pro.University)
        setYear(pro.StudyYear)
        setDob(pro.DOB)
        setGender(pro.Gender)
        setCity(pro.City)
        setState(pro.State)
      }
    }
  }, [profile])


  return (
    <div className='flex-col justify-center items-center w-full h-max px-4 lg:py-10 bg-white lg:px-40' >
      <div className="my-10 sm:mt-0">
        <div className="md:grid md:grid-cols-4 md:gap-6">

          <div className="md:col-span-1">
              <div className="overflow-hidden shadow rounded-md">
                <div className="bg-primary-light-3 p-1">
                  <img className='rounded-md' src={profilePic} />
                </div>
                <div className="bg-primary-light-3 flex justify-center items-center px-1 py-1 text-right">
                  <button
                    className="w-full inline-flex items-center justify-center py-1 h-12 rounded-md bg-primary-dark-1 text-white"
                  >
                    {
                      `Participent ID : ${pid}`
                    }
                  </button>
                </div>
              </div>
          </div>
          <div className="mt-5 md:col-span-3 md:mt-0">
            <form>
              <div className="overflow-hidden shadow rounded-md">
              <div className="bg-primary-light-2 px-4 py-3 flex justify-between items-center sm:px-6">
                  
                  <h1 className='font-bold justify-center'>Personal Details</h1>
                  <button
                    className="inline-flex items-center justify-center py-1 px-5 h-1/4 rounded-md bg-primary-dark-1 text-white"
                  >
                    Edit
                  </button>
                </div>
                <div className="bg-primary-light-3  px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 bg-primary-light-3">
                        First name
                      </label>
                      <input
                        type="text"
                        autoComplete="given-name"
                        placeholder='First Name'
                        value={fName}
                        onChange={e => { setFName(e.target.value) }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        autoComplete="family-name"
                        placeholder='Last Name'
                        value={lName}
                        onChange={e => { setLName(e.target.value) }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        autoComplete="email"
                        placeholder='Email'
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Contact No.
                      </label>
                      <input
                        type="number"
                        placeholder='Contact No'
                        value={contactNo}
                        onChange={e => { setContactNo(e.target.value) }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
                      />
                    </div>


                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Branch / Course
                      </label>
                      <select
                        id="Branch"
                        name="Branch"
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-dark-1 focus:outline-none focus:ring-primary-dark-1 sm:text-sm"
                      >
                        <option>B.Tech</option>
                        <option>B.sc</option>
                        <option>M.sc</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        University
                      </label>
                      <select
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-dark-1 focus:outline-none focus:ring-primary-dark-1 sm:text-sm"
                      >
                        <option>GSFC University</option>
                        <option>MS University</option>
                        <option>Parul University</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Study Year
                      </label>
                      <select
                        id="study-year"
                        name="study-year"
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-dark-1 focus:outline-none focus:ring-primary-dark-1 sm:text-sm"
                      >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        D.O.B.
                      </label>
                      <input
                        type="date"
                        autoComplete="date"
                        value={dob}
                        onChange={e => { setDob(e.target.value) }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        id="study-year"
                        name="study-year"
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-dark-1 focus:outline-none focus:ring-primary-dark-1 sm:text-sm"
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        autoComplete="address-level2"
                        placeholder='City'
                        value={city}
                        onChange={e => { setCity(e.target.value) }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        State 
                      </label>
                      <input
                        type="text"
                        autoComplete="address-level1"
                        placeholder='State'
                        value={state}
                        onChange={e => { setState(e.target.value) }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
                      />
                    </div>

                 
                  </div>
                </div>
                <div className="bg-primary-light-2 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center py-1 px-5 h-1/4 rounded-md bg-primary-dark-1 text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Pro