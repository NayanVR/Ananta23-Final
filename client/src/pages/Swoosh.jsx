import React from "react";
import { useContext, Fragment, useState } from "react";
import EventCard from "../components/EventCardNew";
import { AuthContext } from "../contexts/AuthContext";
// import profilePic from "../assets/photos/profile.jpg";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";
import PuffLoader from "react-spinners/PuffLoader";
import EventsData from "../assets/Events.json"
import { useNavigate } from "react-router-dom";


function Swoosh() {
	const events = [
		{
			eventCode: "SW_AB",
			name: "Anime Battle",
			desc: "Everyone knows how colorful the world of microbes is. Why not represent it in a beautiful way? Bring out your inner artist by using streaking, preading and pouring to make a colorful creation on Agar using microbes.",
			mobDesc:
				"Science, technology, engineering and mathematics are the four basic topics we see around ourselves everyday. Bring out working models, business models and prototypes to display your ideas and potential talent.",
			image: Swift,
		},
		{
			eventCode: "SW_ER",
			name: "Escape Room",
			desc: "Explore a new world of stock market, deduce the effect of news, buy and sell virtual stocks on the stock market along with share prices in a risk-free environment.",
			mobDesc:
				"Code Wars is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round.",
			image: profilePic,
		},
		{
			eventCode: "SW_TH",
			name: "Treasure hunt",
			desc: "You think you know chemistry? Take this fun quiz and show how much it takes to sort the jeopardy that is indeed chemical engineering.",
			mobDesc:
				"Hackathon is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round.",
			image: Swift,
		},
		{
			eventCode: "SW_V",
			name: "Valorant",
			desc: "You think you know chemistry? Take this fun quiz and show how much it takes to sort the jeopardy that is indeed chemical engineering.",
			mobDesc:
				"Hackathon is a coding competition where you can showcase your coding skills and win exciting prizes. The competition will be held in two rounds, the first round will be a coding round and the second round will be a quiz round.",
			image: Swift,
		},
	];

	const { currentUser } = useContext(AuthContext);

	let [isSoloOpen, setIsSoloOpen] = useState(false);
	let [isTeamOpen, setIsTeamOpen] = useState(false);
	let [isCTOpen, setIsCTOpen] = useState(false);
	let [isJTOpen, setIsJTOpen] = useState(false);

	let [teamName, setTeamName] = useState();
	let [teamID, setTeamID] = useState();
	const [leader, setLeader] = useState();

	const [showInfo, setShowInfo] = useState(false);

	const serverURL = import.meta.env.VITE_SERVER_URL;
	const navigate = useNavigate();
	let email = "";
	if (currentUser) email = currentUser["email"];

	let [loader, setLoader] = useState(false);
	let [selectedEventCode, setSelectedEventCode] = useState();
	let [selectedEventName, setSelectedEventName] = useState();

	async function handleResposnse(eventCode, eventName) {
		console.log(eventName, eventCode);

		if (!currentUser) {
			navigate("/login");
			return;
		}

		const check = await fetch(serverURL + "/api/secure/event/check", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + currentUser["accessToken"],
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ eventCode, email }),
		});
		const response = await check.json();
		console.log(response);

		setSelectedEventName(eventName);
		setSelectedEventCode(eventCode);

		if (response.type == "Warning") {
			if (response.message == "Profile") {
				navigate("/profile");
			} else if (response.message == "BuyPass") {
				navigate("/buypass");
			} else {
				toast(response.message, {
					icon: "⚠️",
				});
			}
		} else if (response.type == "Info") {
			toast(response.message, {
				icon: "👍🏻",
			});
		} else {
		}
		if (response.Category == "Solo") {
			setIsSoloOpen(true);
		} else if (response.Category == "Team") {
			setIsTeamOpen(true);
		}
		// closeModal()
	}

	// Handling solo registration
	async function handleSoloRegistration() {
		const solo = await fetch(
			serverURL + "/api/secure/events/solo/register",
			{
				method: "POST",
				headers: {
					Authorization: "Bearer " + currentUser["accessToken"],
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ selectedEventCode, email }),
			}
		);
		const response = await solo.json();
		console.log(response);
		if (response.type == "success") {
			toast.success(response.message, { duration: 3000 });
			closeModal();
		}
	}

	// Handling Create Team
	async function handleCT() {
		setLoader(true);
		const CT = await fetch(serverURL + "/api/secure/events/team/create", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + currentUser["accessToken"],
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				selectedEventCode,
				email,
				teamName,
				selectedEventName,
			}),
		});
		const response = await CT.json();

		if (response.type == "success") {
			toast.success(response.message, { duration: 3000 });
			closeModal();
		} else {
			toast.error(response.message, { duration: 3000 });
		}
		setLoader(false);
	}

	// Handling Join Team
	async function handleJT() {
		const JT = await fetch(serverURL + "/api/secure/events/team/join", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + currentUser["accessToken"],
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ selectedEventCode, email, teamID }),
		});
		const response = await JT.json();
		if (response.type == "success") {
			toast.success(response.message, { duration: 3000 });
			setTeamName("");
			closeModal();
		} else {
			toast.error(response.message, { duration: 2000 });
		}
		setShowInfo(false);
	}

	async function getTeamInfo() {
		const teamInfo = await fetch(
			serverURL + "/api/secure/events/team/getinfo",
			{
				method: "POST",
				headers: {
					Authorization: "Bearer " + currentUser["accessToken"],
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ selectedEventCode, email, teamID }),
			}
		);
		const response = await teamInfo.json();
		console.log(response);
		if (response.type == "success") {
			setLeader(response.teamLeader);
			setTeamName(response.teamName);
			setShowInfo(true);
		} else {
			toast.error(response.message, { duration: 2000 });
		}
	}

	function viewDetails(eventCode) {
		console.log(eventCode);
	}

	function closeModal() {
		setIsSoloOpen(false);
		setIsTeamOpen(false);
		setIsCTOpen(false);
		setIsJTOpen(false);
	}

	return (
		<>
			<h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
				SWOOSH
			</h1>
			<div className="max-w-[1200px] m-auto my-16 px-4 flex gap-16 flex-wrap justify-center items-center">
				{EventsData.swoosh.map((event, index) => (
					<EventCard
						key={index}
						event={event}
						registerNow={handleResposnse}
						viewDetails={viewDetails}
					/>
				))}
			</div>
			{/* Solo */}
			<Transition appear show={isSoloOpen} as={Fragment}>
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
										className="text-center text-lg font-medium leading-6 text-gray-900 mb-6"
									>
										Confirm Registration
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-center text-sm text-gray-500 mb-6">
											Please confirm your registration by
											typing '
											<i>
												<b>{selectedEventName}</b>
											</i>
											'.
										</p>
									</div>
									<div className="flex m-auto w-min">
										<div className="mx-4">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={handleSoloRegistration}
											>
												Register
											</button>
										</div>
										<div className="mx-4">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#DC3545] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#db6e78] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={closeModal}
											>
												Cancel
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Team */}
			<Transition appear show={isTeamOpen} as={Fragment}>
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
										Choose One
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-center text-sm text-gray-500">
											Please Choose any One of them to
											register in '
											<i>
												<b>{selectedEventName}</b>
											</i>
											'.
										</p>
									</div>

									<div className="flex m-auto w-min mt-4">
										<div className="mx-4">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={() => {
													setIsTeamOpen(false);
													setIsCTOpen(true);
												}}
											>
												Create&nbsp;Team
											</button>
										</div>
										<div className="mx-4">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={() => {
													setIsTeamOpen(false);
													setIsJTOpen(true);
												}}
											>
												Join&nbsp;Team
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Create Team */}
			<Transition appear show={isCTOpen} as={Fragment}>
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
										Create Team
									</Dialog.Title>

									<div className="mt-2">
										<p className="text-center text-sm text-gray-500">
											Enter <b>Team Name</b> to register
											in '
											<i>
												<b>{selectedEventName}</b>
											</i>
											'.
										</p>
									</div>

									<div className="mt-2">
										<div className="md:flex md:items-center mb-6">
											<div className="m-auto md:w-2/3">
												<input
													className="text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#1C7690]"
													id="typedEvent"
													type="text"
													placeholder="Team Name"
													onKeyUp={(e) => {
														setTeamName(
															e.target.value
														);
													}}
												/>
											</div>
										</div>
									</div>

									<div className="flex m-auto w-min mt-4">
										<div className="mx-4">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={handleCT}
											>
												{!loader ? (
													<label> Register </label>
												) : (
													<PuffLoader
														color={"#fff"}
														loading={true}
														size={20}
														className="m-auto mx-8 items-center"
													> Wait </PuffLoader>
												)}
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Join Team */}
			<Transition appear show={isJTOpen} as={Fragment}>
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
										Join Team
									</Dialog.Title>

									<div className="mt-4">
										<p className="text-center text-sm text-gray-500">
											Enter <b>Team ID</b> of your Team
											Leader '
											<i>
												<b>{selectedEventName}</b>
											</i>
											'.
										</p>
									</div>

									<div className="mt-2">
										<div className="md:flex md:items-center mb-6">
											<div className="m-auto md:w-2/3">
												<input
													className="text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#1C7690]"
													id="typedEvent"
													type="text"
													placeholder="Team ID"
													onKeyUp={(e) => {
														setTeamID(
															e.target.value
														);
													}}
												/>
											</div>
										</div>
									</div>
									{showInfo ? (
										<>
											<div className="mt-4">
												<p className="text-center text-sm text-gray-500">
													<table className="m-auto">
														<tr>
															<td className="text-right">
																Team Name:
															</td>
															<td className="text-left">
																{teamName}
															</td>
														</tr>
														<tr>
															<td className="text-right">
																Team Leader:
															</td>
															<td className="text-left">
																{leader}
															</td>
														</tr>
													</table>
												</p>
											</div>
											<div className="flex m-auto w-min mt-4">
												<div className="mx-4">
													<button
														type="button"
														className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D] focus-visible:ring-offset-2"
														style={{
															margin: "auto",
														}}
														onClick={handleJT}
													>
														Register
													</button>
												</div>
											</div>
										</>
									) : (
										<>
											<div className="flex m-auto w-min mt-4">
												<div className="mx-4">
													<button
														type="button"
														className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
														style={{
															margin: "auto",
														}}
														onClick={getTeamInfo}
													>
														Check
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
		</>
	);
}

export default Swoosh;
