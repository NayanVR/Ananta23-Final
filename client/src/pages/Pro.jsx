import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Dashboard from './Dashboard'

function Pro() {

    const { currentUser } = useContext(AuthContext)
    const serverURL = import.meta.env.VITE_SERVER_URL

    const profile = localStorage.getItem('profile')

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [uniName, setUniName] = useState('')
    const [branch, setBranch] = useState('')
    const [year, setYear] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        if (!currentUser) return

        currentUser.getIdToken().then((token) => {
            fetch(serverURL + "/api/secure/update-profile", {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fName, lName, contactNo, uniName, branch, year, dob, gender, city, state })
            })
                .then(res => res.json())
                .then(data => console.log(data.message))
        })
    }

    if (JSON.parse(profile).ProfileStatus === 1) {
        return <Dashboard profile={profile} />;
    } else {
        return (
            <section className='flex justify-center items-center w-full h-max py-24'>
                <div className='flex flex-col w-full max-w-md items-center gap-4 px-8'>
                    <h1 className="font-heading text-4xl font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
                        Profile
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                        <input className='px-4 py-2 border rounded-md' type="text" placeholder='First Name' value={fName} onChange={e => setFName(e.target.value)} />

                        <input className='px-4 py-2 border rounded-md' type="text" placeholder='Last Name' value={lName} onChange={e => setLName(e.target.value)} />

                        <input className='px-4 py-2 border rounded-md' type="number" placeholder='Contact No' value={contactNo} onChange={e => setContactNo(e.target.value)} />

                        <input className='px-4 py-2 border rounded-md' type="text" placeholder='University Name' value={uniName} onChange={e => setUniName(e.target.value)} />

                        <input className='px-4 py-2 border rounded-md' type="text" placeholder='Branch' value={branch} onChange={e => setBranch(e.target.value)} />

                        <input className='px-4 py-2 border rounded-md' type="number" placeholder='Study Year' value={year} onChange={e => setYear(e.target.value)} />

                        <input className='px-4 py-2 border rounded-md' type="date" value={dob} onChange={e => setDob(e.target.value)} />

                        <div>
                            Gender : &nbsp;&nbsp;
                            <input type="radio" value="Male" id='male' name="gender" onChange={e => setGender(e.currentTarget.value)} />
                            <label htmlFor='male'> Male</label>
                            &nbsp;&nbsp;
                            <input type="radio" value="Female" id='female' name="gender" onChange={e => setGender(e.currentTarget.value)} />
                            <label htmlFor='female'> Female</label>
                        </div>

                        <input className='px-4 py-2 border rounded-md' type="text" placeholder='City' value={city} onChange={e => setCity(e.target.value)} />

                        <input className='px-4 py-2 border rounded-md' type="text" placeholder='State' value={state} onChange={e => setState(e.target.value)} />

                        <button className='py-2 bg-primary-dark-1 text-white rounded-md' type="submit">Submit</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default Pro