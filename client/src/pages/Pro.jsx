<<<<<<< HEAD
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import profilePic from "../assets/photos/profile.jpg";
import uniList from "../data/uniList.json";
=======
import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Dashboard from './Dashboard'
>>>>>>> 5350fcc2a91bf20c67ed2e926f1fc47b0a7e2767

function Pro() {
	const { currentUser } = useContext(AuthContext);
	const serverURL = import.meta.env.VITE_SERVER_URL;

<<<<<<< HEAD
	const profile = localStorage.getItem("profile");

	const [canEdit, setCanEdit] = useState(false);

	const [pid, setPid] = useState("");
	const [fName, setFName] = useState("");
	const [lName, setLName] = useState("");
	const [email, setEmail] = useState("");
	const [contactNo, setContactNo] = useState("");
	const [branch, setBranch] = useState("");
	const [uniName, setUniName] = useState("");
	const [year, setYear] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");

	useEffect(() => {
		setEmail(currentUser.email);
			console.log(profile);
		if (profile !== "{}") {
			const pro = JSON.parse(profile);
			if (pro.ProfileStatus === 1) {
				updateProfile(pro);
			}
      else {
        setCanEdit(true);
      }
		} else {
      setCanEdit(true);
    }
	}, [profile]);

	function updateProfile(pro) {
		let date = new Date(pro.DOB);
		let year = date.getFullYear();
		let month = (date.getMonth() + 1).toString().padStart(2, "0");
		let dt = date.getDate().toString().padStart(2, "0");
		const dtStr = year + "-" + month + "-" + dt;

		setPid(pro.ParticipantID);
		setFName(pro.Firstname);
		setLName(pro.Lastname);
		setContactNo(pro.ContactNo);
		setBranch(pro.Branch);
		setYear(pro.StudyYear);
		setDob(dtStr);
		setUniName(pro.University);
		setGender(pro.Gender);
		setCity(pro.City);
		setState(pro.State);
	}

	function handleSubmit(e) {
		// console.log(e)
		e.preventDefault();
		setCanEdit(false);

		if (!currentUser) return;

		currentUser.getIdToken().then((token) => {
			fetch(serverURL + "/api/secure/update-profile", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fName,
					lName,
					contactNo,
					uniName,
					branch,
					year,
					dob,
					gender,
					city,
					state,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.type === "success") {
						fetch(serverURL + "/api/secure/get-profile", {
							headers: {
								Authorization: "Bearer " + token,
								"Content-Type": "application/json",
							},
						})
							.then((res) => res.json())
							.then((data) => {
								toast.success("Profile updated successfully!");
								localStorage.setItem(
									"profile",
									JSON.stringify(data.message)
								);
							})
							.catch((err) => {
								toast.error("Error updating profile!");
								localStorage.setItem(
									"profile",
									JSON.stringify({})
								);
							})
							.finally(() => {
								setCanEdit(false);
								updateProfile(data.message);
							});
					} else {
						setCanEdit(true);
					}
				})
				.catch((err) => {
					console.log(err);
					setCanEdit(true);
				});
		});
	}

	return (
		<div className="flex-col justify-center items-center w-full h-max px-4 lg:py-10 bg-white lg:px-40">
			<div className="my-10 sm:mt-0">
				<div className="md:grid md:grid-cols-4 md:gap-6">
					<div className="md:col-span-1">
						<div className="overflow-hidden shadow rounded-md">
							<div className="bg-primary-light-3 p-1">
								<img className="rounded-md" src={profilePic} />
							</div>
							<div className="bg-primary-light-3 flex justify-center items-center px-1 py-1 text-right">
								<button className="w-full inline-flex items-center justify-center py-1 h-12 rounded-md bg-primary-dark-1 text-white flex-wrap">
									<label className="text-xs">Participent ID:</label> 
                  <b>{pid}</b>
								</button>
							</div>
						</div>
					</div>
					<div className="mt-5 md:col-span-3 md:mt-0">
						<form onSubmit={handleSubmit}>
							<div className="overflow-hidden shadow rounded-md">
								<div className="bg-primary-light-2 px-4 py-3 flex justify-between items-center sm:px-6">
									<h1 className="font-bold justify-center">
										Personal Details
									</h1>
									<button
										onClick={(e) => {
											e.preventDefault();
											setCanEdit(!canEdit);
										}}
										className="inline-flex items-center justify-center py-1 px-5 h-1/4 rounded-md bg-primary-dark-1 text-white"
									>
										{canEdit ? "Cancel" : "Edit"}
									</button>
								</div>
								<div className="bg-primary-light-3  px-4 py-5 sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="first-name"
												className="block text-sm font-medium text-gray-700 bg-primary-light-3"
											>
												First name
											</label>
											<input
												type="text"
												autoComplete="given-name"
												placeholder="First Name"
												disabled={!canEdit}
												required
												value={fName}
												onChange={(e) => {
													setFName(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="last-name"
												className="block text-sm font-medium text-gray-700"
											>
												Last name
											</label>
											<input
												type="text"
												autoComplete="family-name"
												disabled={!canEdit}
												required
												placeholder="Last Name"
												value={lName}
												onChange={(e) => {
													setLName(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="email-address"
												className="block text-sm font-medium text-gray-700"
											>
												Email address
											</label>
											<input
												type="text"
												autoComplete="email"
												disabled={true}
												required
												placeholder="Email"
												value={email}
												onChange={(e) => {
													setEmail(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="email-address"
												className="block text-sm font-medium text-gray-700"
											>
												Contact No.
											</label>
											<input
												type="tel"
												placeholder="Contact No"
												disabled={!canEdit}
												required
												pattern="[0-9]{10}"
												value={contactNo}
												onChange={(e) => {
													setContactNo(
														e.target.value
													);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label
												htmlFor="email-address"
												className="block text-sm font-medium text-gray-700"
											>
												Branch / Course
											</label>
											<input
												type="text"
												placeholder="Branch"
												required
												disabled={!canEdit}
												value={branch}
												onChange={(e) => {
													setBranch(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label
												htmlFor="country"
												className="block text-sm font-medium text-gray-700"
											>
												University
											</label>
											<select
												disabled={!canEdit}
												value={uniName}
												onChange={(e) => {
													setUniName(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-dark-1 focus:outline-none focus:ring-primary-dark-1 sm:text-sm"
											>
												{uniList.map((uni, index) => {
													return (
														<option
															key={index}
															value={uni}
														>
															{uni}
														</option>
													);
												})}
											</select>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label
												htmlFor="country"
												className="block text-sm font-medium text-gray-700"
											>
												Study Year
											</label>
											<select
												required
												disabled={!canEdit}
												value={year}
												onChange={(e) => {
													setYear(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-dark-1 focus:outline-none focus:ring-primary-dark-1 sm:text-sm"
											>
												{[1, 2, 3, 4].map(
													(year, index) => {
														return (
															<option
																key={index}
																value={year}
															>
																{year}
															</option>
														);
													}
												)}
											</select>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="first-name"
												className="block text-sm font-medium text-gray-700"
											>
												D.O.B.
											</label>
											<input
												type="date"
												autoComplete="date"
												required
												disabled={!canEdit}
												value={dob}
												onChange={(e) => {
													setDob(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="country"
												className="block text-sm font-medium text-gray-700"
											>
												Gender
											</label>
											<select
												required
												disabled={!canEdit}
												value={gender}
												onChange={(e) => {
													setGender(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-dark-1 focus:outline-none focus:ring-primary-dark-1 sm:text-sm"
											>
												<option value="Male">
													Male
												</option>
												<option value="Female">
													Female
												</option>
											</select>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="city"
												className="block text-sm font-medium text-gray-700"
											>
												City
											</label>
											<input
												type="text"
												autoComplete="address-level2"
												placeholder="City"
												required
												disabled={!canEdit}
												value={city}
												onChange={(e) => {
													setCity(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label
												htmlFor="region"
												className="block text-sm font-medium text-gray-700"
											>
												State
											</label>
											<input
												type="text"
												autoComplete="address-level1"
												placeholder="State"
												required
												disabled={!canEdit}
												value={state}
												onChange={(e) => {
													setState(e.target.value);
												}}
												className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
											/>
										</div>
									</div>
								</div>
								{canEdit && (
									<div className="bg-primary-light-2 px-4 py-3 text-right sm:px-6">
										<button className="inline-flex items-center justify-center py-1 px-5 h-1/4 rounded-md bg-primary-dark-1 text-white">
											Save
										</button>
									</div>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Pro;
=======
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
>>>>>>> 5350fcc2a91bf20c67ed2e926f1fc47b0a7e2767
