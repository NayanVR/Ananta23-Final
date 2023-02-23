import React from "react";
import { useState, useContext, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import EventCard from "../components/EventCardNew";
import { AuthContext } from "../contexts/AuthContext";
import Swift from "../assets/photos/upshots/swift.png";
import profilePic from "../assets/photos/profile.jpg";
import EventsData from "../assets/Events.json";
import { toast } from "react-hot-toast";
import { QRCode } from "react-qrcode-logo";
import ComingSoon from "../components/ComingSoon";
import { useNavigate } from "react-router-dom";


function KalaKrirti() {
	const { currentUser, profile, setProfile } = useContext(AuthContext);

	// console.log(profile);
	const serverURL = import.meta.env.VITE_SERVER_URL;
	const UPI = import.meta.env.VITE_UPI;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");
	const [paymentUrl, setPaymentUrl] = useState("");

	const [isConfModalOpen, setIsConfModalOpen] = useState(false);
	const [isAreadyOpened, setIsAreadyOpened] = useState(false);

	const navigate = useNavigate();


	function viewDetails(eventCode) {
		console.log("View Details", eventCode);
	}

	function showPaymentModal(amt, passCode) {
		const passName = passes.find((pass) => pass.id === passCode).name;
		setModalTitle(passName + " Pass");
		setModalBody(`You are about to pay ₹${amt} for ${passName} pass.`);
		setIsModalOpen(true);
	}

	async function handleBuyClick(passCode, name) {
		if (currentUser == null) navigate("/login");

		if (profile == {}) navigate("/profile");

    if (profile.ProfileStatus == 0) navigate("/profile");

		const PID = profile.ParticipantID;

		const res = await fetch(serverURL + "/api/secure/workshop/check", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + currentUser.accessToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ passCode, PID }),
		});

		const check = await res.json();
		const amt = await check.payAmount;
		if (check.type == "info") {
			toast(check.message, {
				icon: "👍🏻",
			});

		} else if (check.type == "success") {
			const url = `upi://pay?pa=${UPI}&pn=Ananta%202023&am=${amt}&tn=FP_${passCode}_${PID}&cu=INR`;
			setPaymentUrl(url);
			setIsAreadyOpened(false);
			showPaymentModal(amt, passCode);
		} else if (check.type === "error") {
			toast.error(check.message, { duration: 3000 });
		}
	}

	return (
		<>
			<h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
				KalaKrirti: Workshops
			</h1>

			{/* <ComingSoon /> */}
			<div className="max-w-[1200px] m-auto my-16 px-4 flex gap-16 flex-wrap justify-center items-center">
				{EventsData.kalakriti.map((event, index) => (
					<EventCard
						key={index}
						event={event}
						registerNow={handleBuyClick}
						viewDetails={viewDetails}
					/>
				))}
			</div>

			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={(_) => {
						setIsModalOpen(false);
					}}
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
										className="text-center text-lg font-medium leading-6 text-gray-900 mb-6"
									>
										{modalTitle}
									</Dialog.Title>
									<button
										type="button"
										className="absolute top-3 right-3 inline-flex justify-center rounded-md border border-transparent bg-[#DC3545] px-2 py-0 text-lg font-medium text-[#F2FFFE]  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
										onClick={(_) => {
											setIsModalOpen(false);
										}}
									>
										x
									</button>
									<div className="flex justify-center gap-4">
										<p className="text-black mb-4">
											{modalBody}
										</p>
									</div>
									<div className="flex flex-col justify-center items-center">
										<QRCode
											className="flex items-center"
											value={paymentUrl}
											size={200}
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
										<div className="flex row items-center w-[200px] gap-2 text-gray-400">
											<span className="h-px w-full bg-gray-300"></span>
											OR
											<span className="h-px w-full bg-gray-300"></span>
										</div>
										<div className="flex justify-center  w-[200px] align-middle ">
											<a
												className=" btn my-1 w-full inline-flex justify-center rounded-md border border-transparent bg-primary-dark-2 px-4 py-2 text-sm font-medium text-[#F2FFFE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												href={paymentUrl}
											>
												Pay&nbsp;Now
											</a>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			<Transition appear show={isConfModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={(_) => {
						setIsConfModalOpen(false);
						setIsAreadyOpened(true);
					}}
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
										className="text-center text-lg font-medium leading-6 text-gray-900 mb-6"
									>
										Attention!!!
									</Dialog.Title>
									<button
										type="button"
										className="absolute top-3 right-3 inline-flex justify-center rounded-md border border-transparent bg-[#DC3545] px-2 py-0 text-lg font-medium text-[#F2FFFE]  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
										onClick={(_) => {
											setIsConfModalOpen(false);
											setIsAreadyOpened(true);
										}}
									>
										x
									</button>
									<div className="flex justify-center gap-4">
										<p className="text-black text-center mb-4">
											We will confirm your payment within
											24 hours. Please check your email
											for further updates.
										</p>
									</div>
									<div className="flex flex-col justify-center items-center">
										<div className="flex justify-center  w-[200px] align-middle ">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={() => {
													setIsConfModalOpen(false);
													setIsAreadyOpened(true);
												}}
											>
												OKAY
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export default KalaKrirti;
