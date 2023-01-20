import React from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/success.json";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import TransactionRecord from "../components/TransactionRecord"

function PaymentSuccess() {
	const { value } = useParams();

	const { currentUser } = useContext(AuthContext);

	// let PayDetails = {};

	const email = currentUser.email;

	(async function () {
		const data = await fetch(
			"http://localhost:3000/api/payment/checkPaymentStatus",
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
		console.log(fetchdata);
		// console.log(typeof fetchdata);
		// PayDetails = fetchdata;
	})();

	// console.log(PayDetails);

	return (
		<div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center ">
      {
                // PayDetails.forEach((row, index) => <TransactionRecord data={row} key={index} />)
            }
			<div className="group max-w-full h-max m-6 px-8 pb-6 flex flex-col items-center justify-between gap-4 bg-primary-light-3 border-4 border-green-600 rounded-2xl relative overflow-hidden">
				<div className="w-full h-max flex flex-col justify-between items-center">
					<Lottie
						className="h-80"
						animationData={animationData}
						loop={false}
					></Lottie>
					<h1 className="text-2xl font-extrabold text-green-600 flex flex-col justify-between items-center">
						Payment Successful
					</h1>
					{/* <div className="flex flex-col justify-between items-center mt-5">{PayDetails} */}
          {/* <div className='max-w-[1200px] m-auto grid grid-cols-1 md:grid-cols-2 md:gap-y-8 lg:grid-cols-3 place-items-center my-16'> */}
            {
                // PayDetails.map((row, index) => <TransactionRecord data={row} key={index} />)
            }
        {/* </div> */}
					{/* </div> */}
				</div>

				<button className='relative before:content-[""] before:absolute before:w-full before:h-full before:top-0 before:bg-gradient-to-r before:from-transparent before:to-transparent before:via-primary-light-1 before:-left-full before:hover:left-full before:transition-all before:duration-500 hover:shadow-lg hover:shadow-primary-light-2 transition-all overflow-hidden bg-gradient-to-b from-primary-dark-1 to-primary-dark-2 py-3 mt-4 w-full bg-primary-dark-1 font-heading font-bold text-white rounded-lg'>
					Download Pass
				</button>
			</div>
		</div>
	);
}

export default PaymentSuccess;
