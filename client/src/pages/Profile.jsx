import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function Profile() {

    const { currentUser } = useContext(AuthContext)
    const serverURL = import.meta.env.VITE_SERVER_URL

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
            fetch(serverURL + "/api/secure/create-profile", {
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

    return (
        <div>
            <h1>
                Profile
            </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='First Name' value={fName} onChange={e => setFName(e.target.value)} /><br />
                <input type="text" placeholder='Last Name' value={lName} onChange={e => setLName(e.target.value)} /><br />
                <input type="number" placeholder='Contact No' value={contactNo} onChange={e => setContactNo(e.target.value)} /><br />
                <input type="text" placeholder='University Name' value={uniName} onChange={e => setUniName(e.target.value)} /><br />
                <input type="text" placeholder='Branch' value={branch} onChange={e => setBranch(e.target.value)} /><br />
                <input type="number" placeholder='Study Year' value={year} onChange={e => setYear(e.target.value)} /><br />
                <input type="date" value={dob} onChange={e => setDob(e.target.value)} /><br />
                <input type="radio" value="Male" name="gender" onChange={e => setGender(e.currentTarget.value)} /> Male
                <input type="radio" value="Female" name="gender" onChange={e => setGender(e.currentTarget.value)} /> Female <br />
                <input type="text" placeholder='City' value={city} onChange={e => setCity(e.target.value)} /><br />
                <input type="text" placeholder='State' value={state} onChange={e => setState(e.target.value)} /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Profile