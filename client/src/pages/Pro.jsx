import React, {
	useRef,
	useState,
	Fragment,
	useContext,
	useEffect,
} from "react";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import profilePic from "../assets/photos/profile.jpg";
import uniList from "../data/uniList.json";
import YourEvent from "../components/YourEvent";
import { Dialog, Transition } from "@headlessui/react";
import { QRCode } from "react-qrcode-logo";
import a_logo from "../assets/icons/faviconANA.svg";
// import Passes from "./../assets/Passes.json";
import { Link, useNavigate } from "react-router-dom";
import DropDown from "../components/DropDown";

function Pro() {
	const Passes = {
		passes: [
			{
				id: "PS-G",
				name: "GOLD",
				markImg: "Gold.png",
				price: 3,
				features: [
					"Access to All Events (INERTIA & SWOOSH)",
					"Access to All Guest Lectures",
					"Access to Zingaat : Cultural Events",
					"500 Digital Wallet Points",
				],
				color: "#FFDF00",
			},
			{
				id: "PS-S",
				name: "SILVER",
				markImg: "Silver.png",
				price: 2,
				features: [
					"Access to any 3 Events (INERTIA & SWOOSH)",
					"Access to any 2 Guest Lectures",
					"Access to Zingaat : Cultural Events",
					"300 Digital Wallet Points",
				],
				color: "#C0C0C0",
			},
			{
				id: "PS-B",
				name: "BRONZE",
				markImg: "Bronze.png",
				price: 1,
				features: [
					"Access to any 2 Events (INERTIA & SWOOSH)",
					"Access to any 1 Guest Lecture",
					"Access to Zingaat : Cultural Events",
					"100 Digital Wallet Points",
				],
				color: "#CD7F32",
			},
			{
				id: "PS-DJ",
				name: "ATMOS",
				markImg: "DJ.png",
				price: 4,
				features: [
					"A night to groove on EDM beats. A spectacle not to MISS OUT!",
				],
				color: "#88D20F",
			},
			{
				id: "PS-C",
				name: "COMBO",
				markImg: "Combo.png",
				price: 5,
				features: ["All benefits of GOLD & ATMOS Pass"],
				color: "#FFDF00",
			},
		],
	};
	const { currentUser, profile, setProfile, pass } = useContext(AuthContext);
	let email_ = currentUser.email;

	const serverURL = import.meta.env.VITE_SERVER_URL;

	const navigate = useNavigate();

	const [canEdit, setCanEdit] = useState(false);

	const [pid, setPid] = useState("");
	const [fName, setFName] = useState("");
	const [lName, setLName] = useState("");
	const [email, setEmail] = useState("");
	const [contactNo, setContactNo] = useState("");
	const [branch, setBranch] = useState("");
	const [uniName, setUniName] = useState("");
	const [gender, setGender] = useState("");
	const [city, setCity] = useState("");

	const [txnStatus, setTxnStatus] = useState("");
	const [passCode, setPassCode] = useState("");
	const [passType, setPassType] = useState("");

	const [dP, setDP] = useState(0);

	const [totalEvents, setTotalEvents] = useState(0);
	const [totalWorkshops, setTotalWorkshops] = useState(0);
	const [totalGuests, setTotalGuests] = useState(0);

	const [maxEvents, setMaxEvents] = useState(0);
	const [maxWorkshops, setMaxWorkshops] = useState(0);
	const [maxGuests, setMaxGuests] = useState(0);

	const [registeredEvents, setRegisteredEvents] = useState([]);

	// Modal Stuff
	const [isOpen, setIsOpen] = useState(false);
	const [guideProfile, setGuideProfile] = useState(false);
	const [guideBuyPass, setGuideBuyPass] = useState(false);
	const [isView, setIsView] = useState(false);
	const [modalColor, setModalColor] = useState("#c22727");

	const [reloadEvents, setReloadEvents] = useState(false);

	const [eventCode, setEventCode] = useState("");
	const [selectedEventType, setSelectedEventType] = useState("");
	const [selectedEventName, setSelectedEventName] = useState("");
	const [color, setColor] = useState("");
	const [teamID, setTeamID] = useState("");
	const [teamName, setTeamName] = useState("");
	const [isSolo, setIsSolo] = useState(false);
	const [role, setRole] = useState("");

	const firstnameRef = useRef();

	let allEvents = [];

	useEffect(() => {
		setEmail(currentUser.email);
		// console.log("Passes Details")
		// console.log(pass);
		if (profile != {}) {
			// const pro = JSON.parse(profile);
			updateProfile(profile);
			if (profile.ProfileStatus === 1) {
				if (pass != {}) {
					// console.log(profile)
					setPassType(pass.PassType);
					setTotalEvents(profile.TotalEvents);
					setMaxEvents(pass.EventsLimit);
					setTotalWorkshops(profile.TotalWorkshops);
					setMaxWorkshops(pass.WorkshopsLimit);
					setTotalGuests(profile.TotalGuests);
					setMaxGuests(pass.GuestsLimit);
				}
				setCanEdit(false);
			} else if (profile.ProfileStatus == 0) {
				setGuideProfile(true);
			} else {
				setCanEdit(true);
				firstnameRef.current.focus();
			}

			// Passes.passes.map((element) => {
			// 	// console.log("Ashish 2003 @")
			// 	if (element["id"] == profile.PassCode) {
			// 		setPassType(element["name"]);
			// setPassColor(element["color"]);
			// setPassImg(element["markImg"]);
			// // console.log(passImg);
			// 	}
			// });
		} else {
			setCanEdit(true);
		}

		// console.log(currentUser);
		// console.log(profile);
	}, [profile]);

	useEffect(() => {
		const fetchEvents = async () => {
			const data = await fetch(serverURL + "/api/secure/getEvents", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + currentUser.accessToken,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email_ }),
			});
			const fetchdata = await data.json();

			if (fetchdata.type == "success") {
				allEvents = [];
				fetchdata.data.solo.forEach((data) => {
					allEvents.push(data);
					setRegisteredEvents(allEvents);
				});
				fetchdata.data.team.forEach((data) => {
					allEvents.push(data);
					setRegisteredEvents(allEvents);
				});
			}
		};

		fetchEvents();
		// console.log(registeredEvents);
	}, [reloadEvents]);

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
		setUniName(pro.University);
		setGender(pro.Gender);
		setCity(pro.City);

		// console.log("participantID: ", pid);

		setTxnStatus(pro.TxnStatus);
		setPassCode(pro.PassCode);
		setDP(pro.DigitalPoints);
	}

	function handleSubmit(e) {
		// // console.log(e)
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
					gender,
					city,
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
								if (profile.ProfileStatus == 0) {
									setGuideBuyPass(true);
								}
								setProfile(data.message);
							})
							.catch((err) => {
								toast.error("Error updating profile!");
								setProfile({});
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
					// // console.log(err);
					setCanEdit(true);
				});
		});
	}

	async function handleDeleteEvent() {
		const unregister = await fetch(serverURL + "/api/secure/deleteEvent", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + currentUser.accessToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				pid,
				eventCode,
				isSolo,
				role,
				teamID,
			}),
		});

		const info = await unregister.json();
		// // console.log(info)
		if (info.type == "success") {
			if (eventCode.includes("IN") || eventCode.includes("SW")) {
				setTotalEvents(() => totalEvents - 1);
			} else if (eventCode.includes("EQ")) {
				setTotalGuests(() => totalGuests - 1);
			} else if (eventCode.includes("KK")) {
				setTotalGuests(() => totalWorkshops - 1);
			}
			toast.success(info.message, { duration: 3000 });
		} else {
			toast.error(info.message, { duration: 3000 });
		}
		closeModal();
		setReloadEvents(!reloadEvents);
		// console.log(registeredEvents.length);
		if (registeredEvents.length == 1) {
			window.location.href = "profile";
		}
	}

	function deleteEvent(info, color) {
		setIsOpen(true);
		setIsView(false);
		setColor(color);
		setModalColor("border-red-600");
		setSelectedEventName(info.EventName);
		setSelectedEventType(info.EventType);
		setEventCode(info.EventCode);

		if (info.HeadCount > 1) {
			setIsSolo(false);
			setRole(info.Role);
			setTeamID(info.TeamID);
		} else {
			setIsSolo(true);
			setRole("");
			setTeamID("");
		}
	}

	function infoEvent(info, color) {
		// console.log(info);

		setIsOpen(true);
		setIsView(true);
		setColor(color);
		setModalColor("border-black");
		setSelectedEventName(info.EventName);
		setSelectedEventType(info.EventType);
		setEventCode(info.EventCode);
		setTeamName(info.TeamName);

		if (info.HeadCount > 1) {
			setIsSolo(false);
			setRole(info.Role);
			setTeamID(info.TeamID);
		} else {
			setIsSolo(true);
			setRole("");
			setTeamID("");
		}
	}

	function closeModal() {
		setIsOpen(false);
		setGuideBuyPass(false);
	}
	function closeGuideProfile() {
		setGuideProfile(false);
		firstnameRef.current.focus();
	}

	return (
		<div className="flex-col my-5 justify-center items-center w-full h-max px-4 lg:py-10 bg-white lg:px-40">
			<div className="my-10 sm:mt-0">
				<div className="md:grid-cols-4 gap-4 mb-10">
					<div className="flex gap-3 flex-col bg-white sm:flex-row flex-wrap rounded-lg ">
						<div className="flex  px-6 justify-center sm:justify-start  rounded-lg border-2 shadow-md border-[#78BDC4]">
							<div className="flex-none flex flex-col justify-center">
								<img
									src={profilePic}
									className="z-10 h-20 rounded-full border-4 border-primary-light-1 shadow-md"
								/>
							</div>
							<div className="flex flex-none flex-col justify-center items-left p-4">
								<div className="flex flex-row text-xl font-semibold">
									{profile.Firstname != null &&
										profile.Lastname != null
										? profile.Firstname +
										" " +
										profile.Lastname
										: "Participant Name"}
								</div>
								<div className="text-xs">{profile.Email}</div>
								<div className="text-sm">
									{" "}
									<span className="font-bold">ID</span> :{" "}
									{pid}
								</div>
								<div>
									<button
										className="w-max px-4 py-1 mt-2 text-[#1C7690] rounded-md bg-white hover:bg-red-50 hover:text-red-600 shadow-md hover:border-red-600 border border-[#1C7690]"
										onClick={() => signOut(auth)}
									>
										Sign Out
									</button>
								</div>
							</div>
						</div>

						<div className="flex grow p-2 shadow-md rounded-lg bg-primary-light-3 flex-row sm:flex-col  border-2 justify-center  text-prim items-center border-[#78BDC4] ">
							<div className="flex  bg-primary-light-3  flex-row sm:flex-col  text-prim justify-center items-center">
								{txnStatus != "TXN_SUCCESS" ? (
									<div className="flex flex-col m-2 gap-3 justify-center items-center">
										<p className="text-lg text-center">
											You can start Events registration
											after buying a pass...
										</p>

										<div className="flex gap-6 justify-center items-center">
											<button
												className='relative px-6   before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-1 transition-all overflow-hidden py-2 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2  inline-flex items-center justify-center w-full rounded-md bg-primary-dark-2 text-white flex-wrap'
												onClick={(_) => {
													navigate("/buypass");
												}}
											>
												Buy&nbsp;Pass
											</button>

											<button
												className='relative px-6  before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-1 transition-all overflow-hidden py-2 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2  inline-flex items-center justify-center w-full rounded-md bg-primary-dark-2 text-white flex-wrap'
												onClick={(_) => {
													navigate("/buypass");
												}}
											>
												Book&nbsp;Workshops
											</button>
										</div>
									</div>
								) : (
									<div className="flex flex-col gap-1 ">
										<div className="flex flex-col">
											{/* <div className="text-lg text-start"> <span className="font-bold">Pass Detail </span></div> */}
											<div className="text-s flex gap-3 ">
												Pass Type :{" "}
												<span className="font-bold">
													{passType}{" "}
												</span>{" "}
											</div>

											<div className="text-s">
												Digital Point :{" "}
												<span className="font-bold">
													{dP}
												</span>
											</div>
											<div className="text-s">
												Events Registred :{" "}
												<span>
													<strong>
														{totalEvents}
													</strong>{" "}
													Out of{" "}
													<strong>{maxEvents}</strong>{" "}
												</span>{" "}
												({" "}
												<span>
													<a
														href="#viewevents"
														className="underline text-blue-700"
													>
														view
													</a>
												</span>{" "}
												){" "}
											</div>
											<div className="text-s">
												Guest Lec. Registred :{" "}
												<span className="font-bold">
													{totalGuests} Out of{" "}
													{maxGuests}{" "}
												</span>{" "}
												({" "}
												<span>
													<a
														href="#viewevents"
														className="underline text-blue-700"
													>
														view
													</a>
												</span>{" "}
												){" "}
											</div>
										</div>
										<div className="flex flex-col sm:flex-row gap-5 justify-center items-center ">
											<div className="text-s">
												Workshop :{" "}
												<span className="font-semibold text-s">
													{" "}
													you have not bought a
													Workshop yet !!
												</span>{" "}
											</div>
											<button
												className='relative px-3  before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-1 transition-all overflow-hidden py-1 bg-gradient-to-b from-primary-dark-1 to-primary-dark-2  inline-flex items-center justify-center rounded-md bg-primary-dark-2 text-white flex-wrap'
												onClick={(_) => {
													window.location.href =
														"/buypass";
												}}
											>
												Book&nbsp;Workshops
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="flex  items-center justify-center rounded-lg border-2 shadow-md border-[#78BDC4] p-2 ">
							<div>
								<div className="col-span-1 bg-primary-light-3 flex-none justify-between items-center ">
									<QRCode
										value={pid}
										size={120}
										logoImage={a_logo}
										qrStyle={"square"}
										logoOpacity={1}
										logoHeight={40}
										logoWidth={40}
										eyeRadius={[
											{
												// top/left eye
												outer: [1, 1, 1, 1],
												inner: [1, 1, 1, 1],
											},
											{
												outer: [1, 1, 1, 1],
												inner: [1, 1, 1, 1],
											},
											{
												// top/left eye
												outer: [1, 1, 1, 1],
												inner: [1, 1, 1, 1],
											},
										]}
										eyeColor={[
											{
												outer: "#022539",
												inner: "black",
											},
											{
												outer: "#022539",
												inner: "black",
											},
											{
												outer: "#022539",
												inner: "black",
											},
										]}
										bgColor={"#FFFFFF"}
										ecLevel={"H"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-0 md:col-span-3 md:mt-0">
					<form onSubmit={handleSubmit}>
						<div className="shadow rounded-lg border border-[#78BDC4]">
							<div className="bg-primary-dark-2 px-4 py-3 flex justify-between items-center sm:px-6 ">
								<h1 className="font-bold justify-center text-[#F2FFFE]">
									Personal Details
								</h1>
								<button
									onClick={(e) => {
										e.preventDefault();
										setCanEdit(!canEdit);
									}}
									className="inline-flex items-center justify-center py-1 px-5 h-1/4 rounded-md bg-primary-light-3 hover:bg-primary-light-2 text-dark shadow-inner"
								>
									{canEdit ? "Cancel" : "Edit"}
								</button>
							</div>
							<div className="bg-primary-light-3   border-t-[#022539] px-4 py-5 sm:p-6">
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-3 md:col-span-2">
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
											ref={firstnameRef}
											value={fName}
											onChange={(e) => {
												setFName(e.target.value);
											}}
											className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3 md:col-span-2">
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

									<div className="col-span-6 sm:col-span-3 md:col-span-2">
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

									<div className="col-span-6 sm:col-span-3 md:col-span-2">
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
												setContactNo(e.target.value);
											}}
											className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3 md:col-span-2">
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
											<option value="">
												Select Gender
											</option>
											<option value="Male">Male</option>
											<option value="Female">
												Female
											</option>
										</select>
									</div>

									<div className="col-span-6 sm:col-span-3 md:col-span-2">
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

									<div className="col-span-6 sm:col-span-3 md:col-span-3">
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
											required
										>
											<option selected value="">
												Select University
											</option>
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
									<div className="col-span-6 sm:col-span-3 md:col-span-3">
										<label
											htmlFor="country"
											className="block text-sm font-medium text-gray-700"
										>
											Course
										</label>
										<DropDown />
										{/* <select
											disabled={!canEdit}
											value={uniName}
											onChange={(e) => {
												setUniName(e.target.value);
											}}
											className="disabled:text-gray-500 disabled:bg-primary-light-3 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-dark-1 focus:outline-none focus:ring-primary-dark-1 sm:text-sm"
											required
										>
											<option selected value="">
												Select University
											</option>
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
										</select> */}
									</div>

									{/* <div className="col-span-6 sm:col-span-3 md:col-span-3">
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
									</div> */}
								</div>
							</div>
							{canEdit && (
								<div className="bg-primary-dark-2 px-4 py-3 text-right sm:px-6">
									<button className="inline-flex items-center justify-center py-1 px-5 h-1/4 rounded-md bg-primary-light-3 text-dark hover:bg-primary-light-2">
										Save
									</button>
								</div>
							)}
						</div>
					</form>
				</div>

				<hr className="my-10" />

				<div
					className="md:grid md:grid-cols-4 md:gap-6"
					id="viewevents"
				>
					<div className="mt-5 md:col-span-4 md:mt-0">
						<div className="overflow-hidden shadow rounded-md">
							<div className="bg-primary-dark-1 mb-5 px-4 py-3 flex justify-between items-center sm:px-6">
								<h1 className="font-bold text-xl text-white justify-center m-auto">
									Your Events
								</h1>
							</div>
							{registeredEvents.length > 0 ? (
								registeredEvents.map((data, index) => (
									<YourEvent
										data={data}
										deleteEvent={deleteEvent}
										infoEvent={infoEvent}
										key={index}
									/>
								))
							) : (
								<div className="bg-white px-4 py-5 sm:p-6">
									<div className="bg-white shadow px-4 py-3 flex justify-between items-center sm:px-6">
										<div className="justify-center">
											<label className="block text-lg font-medium text-gray-700">
												No Event Found
											</label>
											<label
												htmlFor="first-name"
												className="block text-xs font-extralight text-gray-700"
											></label>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-10 py-6 text-left align-middle shadow-xl transition-all border-y-4 ${modalColor} bg-white`}
								>
									<Dialog.Title
										as="h3"
										className="text-center text-lg font-medium leading-6 text-gray-900 mb-6"
									>
										<div className="text-center">
											<label
												className={`text-xs font-medium mr-2 px-1.5 py-0.5 rounded bg-${color}-100 text-${color}-800`}
											>
												{selectedEventType}
											</label>
											<label className="block text-3xl font-medium text-gray-700">
												{selectedEventName}
											</label>
											{!isSolo && <>(3/5)</>}
										</div>
									</Dialog.Title>
									{!isView ? (
										// Deletion of Event --------------------------------

										<>
											<div className="mt-2">
												<p className="text-center text-sm text-gray-500 mb-6">
													{isSolo ? (
														<>
															<label className="bb-6">
																By doing this,
																you might not
																register in this
																event if event
																got full...
															</label>
															<br />
															<br />
															<label>
																Do you want to
																continue?
															</label>
														</>
													) : role == "Leader" ? (
														<>
															<label className="mb-6">
																Unregistering
																yourself means
																you are remove
																your team from
																the event which
																includes all
																team members and
																you might not
																register in this
																event if event
																got full...
															</label>
															<br />
															<br />
															<label>
																Do you want to
																continue?
															</label>
														</>
													) : (
														<>
															<label className="mb-6">
																By doing this,
																you might not
																register in this
																event if event
																got full...
															</label>
															<br />
															<br />
															<label>
																Do you want to
																continue?
															</label>
														</>
													)}
												</p>
											</div>

											<div className="flex m-auto w-min">
												<div className="mx-4">
													<button
														type="button"
														className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#DC3545] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#db6e78] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
														style={{
															margin: "auto",
														}}
														onClick={
															handleDeleteEvent
														}
													>
														Yes
													</button>
												</div>
												<div className="mx-4">
													<button
														type="button"
														className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
														style={{
															margin: "auto",
														}}
														onClick={closeModal}
													>
														No
													</button>
												</div>
											</div>
										</>
									) : (
										// Information -------------------------------------
										<>
											<div className="mt-2">
												<p className="text-center justify-center text-sm text-gray-500 mb-6">
													{isSolo ? (
														<>
															<div className="col-span-6 sm:col-span-3">
																<label
																	htmlFor="first-name"
																	className="text-xs font-medium text-gray-700"
																>
																	Registration
																	Time
																</label>
																<input
																	type="text"
																	autoComplete="given-name"
																	placeholder="First Name"
																	disabled
																	required
																	value={
																		"11:00, 12 Feb 2023"
																	}
																	className="disabled:text-gray-500 disabled:bg-primary-light-3 m-auto text-center mt-1 block w-min rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
																/>
															</div>
														</>
													) : (
														<div
															className={`drop-shadow-md bg-${color}-100 rounded-2xl py-5`}
														>
															<div className="col-span-6 sm:col-span-3 mb-2 mx-2">
																<label
																	htmlFor="first-name"
																	className="text-[0.8rem] block font-medium text-gray-700"
																>
																	Team Name
																</label>
																<label
																	htmlFor="first-name"
																	className="shadow-inner text-xl p-2 text-center m-auto bg-white block w-max px-5 mt-0.5 font-medium text-gray-700 rounded-lg "
																>
																	{teamName}
																</label>
															</div>
															<div className="col-span-6 sm:col-span-3 m-3">
																<label
																	htmlFor="first-name"
																	className="text-xs block font-medium text-gray-700"
																>
																	Team Leader
																</label>
																<label
																	htmlFor="first-name"
																	className="shadow-inner text-md p-2 text-center m-auto bg-white block w-max px-5 mt-0.5 font-bold text-gray-700 rounded-lg "
																>
																	Ashish Kumar
																	Patel
																</label>
															</div>
															<div className="col-span-6 sm:col-span-3 m-3">
																<label
																	htmlFor="first-name"
																	className="text-xs block font-medium text-gray-700"
																>
																	Registration
																	Time
																</label>
																<label
																	htmlFor="first-name"
																	className="shadow-inner text-sm p-2 text-center m-auto bg-white block w-max px-5 mt-0.5 font-medium text-gray-700 rounded "
																>
																	11:00 AM, 12
																	Feb 2023
																</label>
															</div>

															{role ==
																"Leader" && (
																	<div
																		className={`drop-shadow-md bg-white mx-5 rounded-2xl py-2`}
																	>
																		<label className="text-[0.8rem] block font-medium text-gray-700">
																			Members
																		</label>
																	</div>
																)}
														</div>
													)}
												</p>
											</div>

											<div className="flex m-auto w-min">
												<div className="mx-4">
													<button
														type="button"
														className="shadow mx-6 text-[#1C7690] inline-flex justify-center rounded-md border border-[#1C7690] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:text-[#ffffff] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
														style={{
															margin: "auto",
														}}
														onClick={closeModal}
													>
														Close
													</button>
												</div>
											</div>
										</>
									)}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Guide for Completing the Profile First... */}
			<Transition appear show={guideProfile} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={closeGuideProfile}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  border-y-4 border-[#012C3D]"
									style={{ backgroundColor: "#ffffff" }}
								>
									<Dialog.Title
										as="h3"
										className="text-center text-lg font-medium leading-6 text-gray-900"
									>
										Complete Profile
									</Dialog.Title>

									<div className="mt-2">
										<p className="text-center text-sm text-gray-500">
											Please Fill the Information to
											complete the Profile.
										</p>
										<br />
										<p className="text-center text-sm font-semibold text-gray-500">
											<span>NOTE: </span>
											<br />
											Please provide correct Firstname &
											Lastname as it is going to there in
											the Pass your are going to buy.
										</p>
									</div>

									<div className="mt-2"></div>

									<div className="flex m-auto w-min mt-4">
										<div className="mx-4">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={closeGuideProfile}
											>
												<label> Ok </label>
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Guide for Navigate to Buy a Pass further... */}
			<Transition appear show={guideBuyPass} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  border-y-4 border-[#012C3D]"
									style={{ backgroundColor: "#ffffff" }}
								>
									<Dialog.Title
										as="h3"
										className="text-center text-lg font-medium leading-6 text-gray-900"
									>
										Buy a Pass
									</Dialog.Title>

									<div className="mt-2">
										<p className="text-center text-sm text-gray-500">
											Now, you can move forward and can{" "}
											<strong>Buy a Pass</strong> of your
											choice.
											<br /> <br />
											Would you like to go to the Buy Pass
											page?
										</p>
									</div>

									<div className="mt-2"></div>

									<div className="flex m-auto w-min mt-4">
										<div className="mx-4">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={() =>
													(location.href = "/buypass")
												}
											>
												<label> Go </label>
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

export default Pro;
