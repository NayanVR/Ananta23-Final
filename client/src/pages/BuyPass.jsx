import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import PassCard from "../components/PassCard";
import goldMark from "../assets/icons/Gold_mark.svg";
import silverMark from "../assets/icons/Silver_mark.svg";
import bronzeMark from "../assets/icons/Bronze_mark.svg";
import comboMark from "../assets/icons/Combo_mark.svg";
import combo2Mark from "../assets/icons/Combo2_mark.svg";
import djMark from "../assets/icons/Dj_mark.svg";
import { useNavigate } from "react-router-dom";

function BuyPass() {
	const navigate = useNavigate();
	const { currentUser, profile, setProfile } = useContext(AuthContext);

	console.log(profile);
	const serverURL = import.meta.env.VITE_SERVER_URL;

	const passes = [
		{
			id: "PS-G",
			name: "GOLD",
			markImg: goldMark,
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
			markImg: silverMark,
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
			markImg: bronzeMark,
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
			markImg: djMark,
			price: 4,
			features: [
				"A night to groove on EDM beats. A spectacle not to MISS OUT!",
			],
			color: "#88D20F",
		},
		{
			id: "PS-C",
			name: "COMBO",
			markImg: comboMark,
			price: 5,
			features: ["All benefits of GOLD & ATMOS Pass"],
			color: "#FFDF00",
		},
	];


	const isDate = (val) =>
		Object.prototype.toString.call(val) === "[object Date]";

	const isObj = (val) => typeof val === "object";

	const stringifyValue = (val) =>
		isObj(val) && !isDate(val) ? JSON.stringify(val) : val;

	function buildForm({ action, params }) {
		const form = document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("action", action);

		Object.keys(params).forEach((key) => {
			// console.log(params)
			const input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", key);
			input.setAttribute("value", stringifyValue(params[key]));
			form.appendChild(input);
		});

		return form;
	}

	function post(details) {
		const form = buildForm(details);
		document.body.appendChild(form);
		form.submit();
		form.remove();
	}

	const getData = (data) => {
		return fetch(`${serverURL}/api/get-payment-info`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.catch((err) => console.log(err));
	};

	const makePayment = (amt, clientEmail, pass) => {
		getData({ amount: amt.toString(), email: clientEmail, passCode: pass }).then(
			(response) => {
				console.log(response);

				let information = {
					action: "https://securegw.paytm.in/order/process",
					params: response,
				};
				post(information);
			}
		);
	};

	// lifting state up
	async function handleBuyClick(passCode) {
		if (currentUser == null) navigate("/login");

		if (profile == {}) navigate("/profile");


		const PID = profile.ParticipantID;
		console.log(profile.ParticipantID);

		const res = await fetch(serverURL + "/api/secure/pass/buy/check", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + currentUser.accessToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ passCode, PID }),
		});
		const check = await res.json();
		console.log(check);
		const amt = await check.payAmount;

		if (check.message == "Profile Not Completed") {
			window.location.href = "/profile";
		} else if (
			check.message == "Buying First Pass" ||
			check.message == "Upgrade Pass"
		) {
			makePayment(amt, profile.Email, passCode);
			// const buyit = await fetch(serverURL + "/api/secure/pass/buy", {
			// 	method: "POST",
			// 	headers: {
			// 		Authorization: "Bearer " + currentUser.accessToken,
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({ PID, passCode, amt }),
			// });
			// const info = await buyit.json();
			// console.log(info);
			// console.log("Making Payment");
		} else if (check.type === "error") {
			toast.error(check.message, { duration: 3000 });
		}
	}

	return (
		<div className="flex justify-center items-center">
			<div className="max-w-[1300px] m-auto flex gap-16 flex-wrap justify-center items-center">
				{passes.map((pass, index) => (
					<PassCard
						buyClick={handleBuyClick}
						passInfo={pass}
						key={index}
					/>
				))}
			</div>
		</div>
	);
}

export default BuyPass;
