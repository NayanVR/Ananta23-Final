import React from "react";
import { useContext, Fragment, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

import EQU001 from "../assets/photos/2001.png";
import EQU002 from "../assets/photos/2002.png";
import EQU003 from "../assets/photos/2003.png";
import EQU004 from "../assets/photos/2004.png";
import EQU005 from "../assets/photos/2005.png";

function Equilibrium() {
	const { currentUser } = useContext(AuthContext);

	let email = "";
	if (currentUser) email = currentUser["email"];

	const serverURL = import.meta.env.VITE_SERVER_URL;

	let [selectedEventCode, setSelectedEventCode] = useState();
	let [selectedEventName, setSelectedEventName] = useState();

	let [isSoloOpen, setIsSoloOpen] = useState(false);

	async function handleResposnse(eventCode, eventName) {
		// console.log(eventName, eventCode);

		if (!currentUser) {
			navigate("/login");
			return;
		}

		currentUser.getIdToken().then(async (token) => {
			const check = await fetch(serverURL + "/api/secure/event/check", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ eventCode, email }),
			});
			const response = await check.json();
			// console.log(response);

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
			}

			if (response.Category == "Solo") {
				setIsSoloOpen(true);
			} else if (response.Category == "Team") {
				setIsTeamOpen(true);
			}
		});
		// closeModal()
	}

	// Handling solo registration
	async function handleSoloRegistration() {
		currentUser.getIdToken().then(async (token) => {
			const solo = await fetch(
				serverURL + "/api/secure/events/solo/register",
				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ selectedEventCode, email }),
				}
			);
			const response = await solo.json();
			// // console.log(response);
			if (response.type == "success") {
				toast.success(response.message, { duration: 3000 });
				closeModal();
			} else if (response.type === "info") {
				toast(response.message, {
					icon: "⚠️",
				});
			} else {
				toast.error(response.message, { duration: 3000 });
			}
		});
	}

  function closeModal() {
		setIsSoloOpen(false);
	}

	return (
		<>
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
                    Please Go through the <a className="mx-1 inline-flex justify-center rounded-md border border-transparent bg-[#1C7690] px-1 py-0 text-sm font-medium text-[#F2FFFE] hover:bg-[#A5D9D5] hover:text-[#012C3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }} target = "_blank" href="https://drive.google.com/file/d/1__7eHD1V4XKxdX0NylSxPxI9oLO7i5Db/view?usp=drivesdk">Schedule</a> and check your Availibility
											<br /><br />
											Confirm your registration for
											'
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

			<div className="relative h-full overflow-hidden">
				<div
					style={{ top: 0, transform: "rotate(180deg)" }}
					className="wrap-grid-container opacity-30"
				>
					<div className="grid-container">
						<div className="grid-top-gradient"></div>
						{[...Array(250)].map((_, i) => {
							return <div key={i} className="grid-item"></div>;
						})}
					</div>
				</div>
				<div className="wrap-grid-container opacity-30">
					<div className="grid-container">
						<div className="grid-top-gradient"></div>
						{[...Array(250)].map((_, i) => (
							<div key={i} className="grid-item"></div>
						))}
					</div>
				</div>
				{/* Gradient */}
				<div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-primary-light-2 to-transparent opacity-25 pointer-events-none" />
				<div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-primary-light-2 to-transparent opacity-25 pointer-events-none" />

				<h1 className="font-heading text-center my-12 text-[2rem] sm:text-[4rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
					Equilibrium: Talk Show
				</h1>

				<div className="flex  gap-12 mb-10 mx-10 flex-col  sm:flex-row flex-wrap justify-center align-middle rounded-lg ">
					<div className="relative h-1/2 flex  flex-col bg-primary-light-3 p-2 justify-center items-center rounded-lg border-2 shadow-lg border-[#78BDC4]">
						<img
							src={EQU001}
							className="h-full sm:h-96  items-center  rounded-md border-2 shadow-lg border-[#78BDC4]"
							alt=""
						/>
						<button
							className="btn w-full bg-primary text-white mt-2 py-2 px-5 shadow-lg rounded-md "
							id="EQU001"
							onClick={() =>
								handleResposnse("EQ_DD", "DIGITAL DISRUPTION")
							}
						>
							Book Now
						</button>
					</div>
					<div className="relative h-1/2 flex  flex-col bg-primary-light-3 p-2 justify-center items-center rounded-lg border-2 shadow-lg border-[#78BDC4]">
						<img
							src={EQU002}
							className="h-full sm:h-96  items-center  rounded-md border-2 shadow-lg border-[#78BDC4]"
							alt=""
						/>
						<button
							className="btn w-full bg-primary text-white mt-2 py-2 px-5 shadow-lg rounded-md "
							id="EQU002"
							onClick={() =>
								handleResposnse("EQ_BAS", "BUILD A STARTUP")
							}
						>
							Book Now
						</button>
					</div>
					<div className="relative h-1/2 flex  flex-col bg-primary-light-3 p-2 justify-center items-center rounded-lg border-2 shadow-lg border-[#78BDC4]">
						<img
							src={EQU003}
							className="h-full sm:h-96  items-center  rounded-md border-2 shadow-lg border-[#78BDC4]"
							alt=""
						/>
						<button
							className="btn w-full bg-primary text-white mt-2 py-2 px-5 shadow-lg rounded-md "
							id="EQU003"
							onClick={() =>
								handleResposnse(
									"EQ_OIDW",
									"OPPORTUNITIES IN DIGITAL WORLD"
								)
							}
						>
							Book Now
						</button>
					</div>
					<div className="relative h-1/2 flex  flex-col bg-primary-light-3 p-2 justify-center items-center rounded-lg border-2 shadow-lg border-[#78BDC4]">
						<img
							src={EQU004}
							className="h-full sm:h-96  items-center  rounded-md border-2 shadow-lg border-[#78BDC4]"
							alt=""
						/>
						<button
							className="btn w-full bg-primary text-white mt-2 py-2 px-5 shadow-lg rounded-md "
							id="EQU004"
							onClick={() =>
								handleResposnse("EQ_MR", "MARKET RESEARCH")
							}
						>
							Book Now
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Equilibrium;
