import React from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/success.json";
import { useState, useContext, Fragment } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Dialog, Transition } from "@headlessui/react";
// import TransactionRecord from "../components/TransactionRecord";
import { useEffect } from "react";

function PaymentSuccess() {
	// const { value } = useParams();

	const { currentUser, profile, setProfile } = useContext(AuthContext);

	let [PayDetails, setPayDetails] = useState([]);

	let [pass, setPass] = useState("");

	const [guidePaySuccess, setGuidePaySuccess] = useState(false);

	const server_URL = import.meta.env.VITE_SERVER_URL;
	const email = currentUser.email;
	// console.log(email);

	useEffect(() => {
		const getdetails = async () => {
			// console.log("Profile TXN Status", profile.TxnStatus);
			// if (profile.TxnStatus != "TXN_SUCCESS") location.href = '/';
			// console.log("varada");
			const data = await fetch(
				server_URL + "/api/payment/checkPaymentStatus",
				{
					method: "POST",
					headers: {
						// Authorization: 'Bearer ' + currentUser.accessToken,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				}
			);
			const fetchdata = await data.json();
			// console.log("ashishalkjsdlfjafjlsadfljasd;jk");
			// console.log(fetchdata);
			// // console.log(typeof fetchdata);

			setPayDetails(fetchdata);
			// if (PayDetails.length > 0) {
			// 	if (PayDetails[0].OrderID != value) {
			// 		location.href = "/";
			// 	}
			// }

			setTimeout(()=>{
				setGuidePaySuccess(true);
			}, 5000)



			// PayDetails = fetchdata;
		};
		getdetails();
	}, []);

	function closeModal() {
		setGuidePaySuccess(false);
	}

	
	// console.log(PayDetails);

	return (
		<div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center ">
			<div className="group max-w-full h-max m-6 px-8 pb-6 flex flex-col items-center justify-between gap-4 bg-primary-light-3 border-4 border-green-600 rounded-2xl relative overflow-hidden">
				<div className="w-full h-max flex flex-col justify-between items-center">
					<Lottie
						className="h-60 w-80"
						animationData={animationData}
						loop={false}
					></Lottie>
					<h1 className="text-2xl font-extrabold text-green-600 flex flex-col justify-between items-center mb-6">
						Payment Successful
					</h1>
					<div className="">
						<div className="">
							{
							// console.log(PayDetails)
							}
							{PayDetails.length != 0 ? (
								PayDetails.map((data) => {
									return (
										<div className="flex flex-col justify-center items-center text-sm sm:text-lg ">
											<div className="flex flex-wrap">
												<p className="font-bold">
													PassType :
												</p>
												<p>{data.PassType}</p>
											</div>
											<div className="flex flex-col justify-center items-center">
												<p className="text-sm">
													OrderID : {data.OrderID}
												</p>
												<p className="font-bold text-sm"></p>
											</div>
											{/* <tr>
											<p className="w-full">Transaction Status</p>
											<p>{data.TxnStatus}</p>
										</tr> */}
											{/* <div className="flex flex-wrap justify-center items-center">
												<p className="font-bold">
													Transaction ID :
												</p>
												<p>{data.TxnID}</p>
											</div> */}
											{/* <tr>
											<p className="w-full">Date</p>
											<p>{data.TxnDate}</p>
										</tr> */}
										</div>
									);
								})
							) : (
								<tr className="m-auto">
									<p className="flex items-center justify-center">
										Record not found
									</p>
								</tr>
							)}
						</div>
					</div>
				</div>
					
			</div>

			{/* Guide for Navigate to Buy a Pass further... */}
			<Transition appear show={guidePaySuccess} as={Fragment}>
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
										Pass Info
									</Dialog.Title>

									<div className="mt-2">
										<p className="text-center text-sm text-gray-500">
											Your Pass will be send to your registered Email account. 
										</p>
									</div>

									<div className="mt-2">
										
									</div>

									<div className="flex m-auto w-min mt-4">
										<div className="mx-4">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={() => location.href = '/buypass'}
											>
													OK
												
											</button>
										</div>
									</div>

									<div className="mt-2">
										<p className="text-center text-xs gon text-gray-500">
											In case, you didn't receive within few hours. Please feel free to contact us.<br /><b>HOPE TO SEE YOU IN OUR FEST</b>
										</p>
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

export default PaymentSuccess;
