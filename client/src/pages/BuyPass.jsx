import React from "react";
import { useState, useContext, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import PassCard from "../components/PassCard";
import goldMark from "../assets/icons/Gold_mark.svg";
import silverMark from "../assets/icons/Silver_mark.svg";
import bronzeMark from "../assets/icons/Bronze_mark.svg";
import comboMark from "../assets/icons/Combo_mark.svg";
import combo2Mark from "../assets/icons/Combo2_mark.svg";
import djMark from "../assets/icons/Dj_mark.svg";
import { QRCode } from "react-qrcode-logo";
import { useNavigate } from "react-router-dom";

function BuyPass() {
	const navigate = useNavigate();
	const { currentUser, profile, setProfile } = useContext(AuthContext);

	// console.log(profile);
	const serverURL = import.meta.env.VITE_SERVER_URL;
	const UPI = import.meta.env.VITE_UPI;

	const passes = [
		{
			id: "PS-B",
			name: "BRONZE",
			markImg: bronzeMark,
			price: 200,
			features: [
				"Access to any 2 Events (INERTIA & SWOOSH)",
				"Access to any 1 Guest Lecture",
				"Access to Zingaat : Cultural Events",
				"2000 Ananta Coins",
			],
			color: "#CD7F32",
		},
		{
			id: "PS-G",
			name: "GOLD",
			markImg: goldMark,
			price: 250,
			features: [
				"Access to All Events (INERTIA & SWOOSH)",
				"Access to All Guest Lectures",
				"Access to Zingaat : Cultural Events",
				"2400 Ananta Coins",
			],
			color: "#FFDF00",
		},
		{
			id: "PS-S",
			name: "SILVER",
			markImg: silverMark,
			price: 230,
			features: [
				"Access to any 2 Events (INERTIA & SWOOSH)",
				"Access to any  Guest Lectures",
				"Access to Zingaat : Cultural Events",
				"2200 Ananta Coins",
			],
			color: "#C0C0C0",
		},
		{
			id: "PS-DJ",
			name: "ATMOS",
			markImg: djMark,
			price: 400,
			fakePrice: 450,
			features: [
				"A night to groove on EDM beats. A spectacle not to MISS OUT!",
				"Access to Zingaat : Cultural Events",
				"2600 Ananta Coins"
			],
			color: "#88D20F",
		},
		{
			id: "PS-C",
			name: "COMBO",
			markImg: comboMark,
			price: 500,
			fakePrice: 600,
			features: [
				"All benefits of GOLD & ATMOS Pass",
				"2800 Ananta Coins"
			],
			color: "#FFDF00",
		},
	];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");
	const [paymentUrl, setPaymentUrl] = useState("");

	const [isConfModalOpen, setIsConfModalOpen] = useState(false);
	const [isAreadyOpened, setIsAreadyOpened] = useState(false);

	useEffect(() => {
		window.addEventListener('focus', handleFocusChange);

		return () => {
			window.removeEventListener('focus', handleFocusChange);
		}
	}, [isModalOpen, isAreadyOpened])

	function handleFocusChange(e) {
		if (isModalOpen && !isAreadyOpened) {
			setIsModalOpen(false);
			setIsConfModalOpen(true);
		}
	}


	function showPaymentModal(amt, passCode) {
		const passName = passes.find((pass) => pass.id === passCode).name;
		setModalTitle(passName + " Pass");
		setModalBody(`You are about to pay ₹${amt} for ${passName} pass.`);
		setIsModalOpen(true);
	}

	async function handleBuyClick(passCode) {

		if (currentUser == null) navigate("/login");

		if (profile == {}) navigate("/profile");

		const PID = profile.ParticipantID;
		const fName = profile.Firstname;
		const lName = profile.Lastname;
		const passName = passes.find((pass) => pass.id === passCode).name;
		// console.log(profile.ParticipantID);

		const res = await fetch(serverURL + "/api/secure/pass/buy/check", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + currentUser.accessToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ passCode, PID, fName, lName, passName }),
		});
		const check = await res.json();
		// console.log(check);
		const amt = await check.payAmount;

		if (check.message == "Profile Not Completed") {
			window.location.href = "/profile";
		} else if (check.message == "Buying First Pass") {
			const url = `upi://pay?pa=${UPI}&pn=Ananta%202023&am=${amt}&tn=FP_${passCode}_${PID}&cu=INR`
			setPaymentUrl(url);
			setIsAreadyOpened(false);
			showPaymentModal(amt, passCode);
		} else if (check.message == "Upgrade Pass") {
			const url = `upi://pay?pa=${UPI}&pn=Ananta%202023&am=${amt}&tn=UP_${passCode}_${PID}&cu=INR`
			setPaymentUrl(url);
			setIsAreadyOpened(false);
			showPaymentModal(amt, passCode);
		} else if (check.type === "error") {
			toast.error(check.message, { duration: 3000 });
		}
	}

	return (
		<>
			<div className="relative h-full flex justify-center items-center overflow-hidden">
				<div style={{ top: 0, transform: "rotate(180deg)" }} className="wrap-grid-container opacity-20">
					<div className="grid-container">
						<div className='grid-top-gradient'></div>
						{
							[...Array(250)].map((_, i) => {

								return (
									<div key={i} className='grid-item'></div>
								)
							})
						}
					</div>
				</div>
				<div className="wrap-grid-container opacity-20">
					<div className="grid-container">
						<div className='grid-top-gradient'></div>
						{
							[...Array(250)].map((_, i) => (
								<div key={i} className='grid-item'></div>
							))
						}
					</div>
				</div>
				{/* Gradient */}
				<div className='absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-primary-light-2 to-transparent opacity-50 pointer-events-none' />
				<div className='absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-primary-light-2 to-transparent opacity-50 pointer-events-none' />

				<div className="max-w-[1300px] mx-auto my-16 flex gap-8 flex-wrap justify-center items-center">

					{passes.map((pass, index) => (
						<PassCard
							buyClick={handleBuyClick}
							passInfo={pass}
							key={index}
						/>
					))}
				</div>
			</div>


			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={_ => { setIsModalOpen(false) }}>
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

										onClick={_ => { setIsModalOpen(false) }}
									>
										x
									</button>
									<div className='flex justify-center gap-4'>
										<p className='text-black mb-4'>
											{modalBody}
										</p>
									</div>
									<div className='flex flex-col justify-center items-center'>
										<QRCode className='flex items-center'
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
												href={paymentUrl} >Pay&nbsp;Now
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
				<Dialog as="div" className="relative z-10" onClose={_ => {
					setIsConfModalOpen(false)
					setIsAreadyOpened(true)
				}}>
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

										onClick={_ => {
											setIsConfModalOpen(false)
											setIsAreadyOpened(true)
										}}
									>
										x
									</button>
									<div className='flex justify-center gap-4'>
										<p className='text-black text-center mb-4'>
											We will confirm your payment within 24 hours. Please check your email for further updates.
										</p>
									</div>
									<div className='flex flex-col justify-center items-center'>
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

export default BuyPass;
