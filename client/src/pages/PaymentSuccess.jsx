import React from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/success.json";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import TransactionRecord from "../components/TransactionRecord";
import { useEffect } from "react";

function PaymentSuccess() {
	// const { value } = useParams();

	const { currentUser, profile, setProfile } = useContext(AuthContext);

	let [PayDetails, setPayDetails] = useState([]);

	let [pass, setPass] = useState('');

	const server_URL = import.meta.env.VITE_SERVER_URL;
	const email = currentUser.email;
	console.log(email);

	useEffect(() => {
		const getdetails = async () => {
			if (profile.TxnStatus != "TXN_SUCCESS") location.href = '/';
			console.log("varada");
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
			console.log("ashishalkjsdlfjafjlsadfljasd;jk");
			console.log(fetchdata);
			// console.log(typeof fetchdata);

			setPayDetails(fetchdata);
			// PayDetails = fetchdata;
		};
		getdetails();
	}, []);

	console.log(PayDetails);

	return (
		<div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center ">
			{
				// PayDetails.forEach((row, index) => <TransactionRecord data={row} key={index} />)
			}
			<div className="group max-w-full h-max m-6 px-8 pb-6 flex flex-col items-center justify-between gap-4 bg-primary-light-3 border-4 border-green-600 rounded-2xl relative overflow-hidden">
				<div className="w-full h-max flex flex-col justify-between items-center">
					<Lottie
						className="h-60 w-80"
						animationData={animationData}
						loop={false}
					></Lottie>
					<h1 className="text-2xl font-extrabold text-green-600 flex flex-col justify-between items-center">
						Payment Successful
					</h1>
					<div className="">
						<div className="">
							{console.log(PayDetails)}
							{PayDetails.length != 0 ? (
								PayDetails.map((data) => {
									return (
										<div className="flex flex-col justify-center items-center text-sm sm:text-lg ">
											<div className="flex flex-wrap">
												<p className="font-bold">PassType :</p>
												<p>{data.PassType}</p>
											</div>
											<div className="flex flex-col justify-center items-center">
												<p className="font-bold">OrderID :</p>
												<p>{data.OrderID}</p>
											</div>
											{/* <tr>
											<p className="w-full">Transaction Status</p>
											<p>{data.TxnStatus}</p>
										</tr> */}
											<div className="flex flex-wrap justify-center items-center">
												<p className="font-bold">Transaction ID :</p>
												<p>{data.TxnID}</p>
											</div>
											{/* <tr>
											<p className="w-full">Date</p>
											<p>{data.TxnDate}</p>
										</tr> */}

										</div>);
								})
							) : (
								<tr className="m-auto">
									<p className="flex items-center justify-center">Record not found</p>
								</tr>
							)}
						</div>
					</div>
				</div>

				<a className='relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 py-3 mt-4 w-1/3 bg-primary-dark-1 font-heading font-bold text-white rounded-lg'
				onClick={server_URL+`/assets/pdfs/${profile.ParticipantID}.pdf`}
				target = "_blank">
					Download Pass
				</a>
			</div>
		</div>
	);
}

export default PaymentSuccess;
