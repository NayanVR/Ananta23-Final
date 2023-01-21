import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import PuffLoader from "react-spinners/PuffLoader";
import PulseLoader from "react-spinners/PulseLoader";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-hot-toast";
import googleLogo from "../assets/icons/google_icon.svg";
import { signInWithPopup } from "firebase/auth";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [otp, setOtp] = useState("");
	const [otpScreen, setOtpScreen] = useState(false);
	const serverURL = import.meta.env.VITE_SERVER_URL;

	// Spinners
	const [isNext, setIsNext] = useState(false);
	const [isResend, setIsResend] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const [isGoogle, setIsGoogle] = useState(false);

	// CountDown for Resend OTP
	const [time, setTime] = useState(30);

	function countDown() {
		let t = time - 1;
		console.log(t);
		setTime(t);
	}

	async function createProfile(email, photoURL) {
		const res = await fetch(serverURL + "/api/create-profile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, photoURL, googleAuth: "TRUE" }),
		});
		const data = await res.json();
		return data;
	}

	async function handleGoogleSignUp() {
		setIsGoogle(true);
		const res = await signInWithPopup(auth, provider);
		console.log(res);
		const email = res.user.email;
		const photoURL = res.user.photoURL;

		const data = await createProfile(email, photoURL);
		console.log(data);
		setIsGoogle(false);
		if (data.type === "success") {
			window.location.href = "/profile";
		} else {
			toast.error(data.message, { duration: 3000 });
		}
	}

	async function handleInfoSubmit(e) {
		e.preventDefault();

		setIsResend(true);
		setIsNext(true);
		const res = await fetch(serverURL + "/api/generateOTP", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await res.json();
		console.log(data);
		if (data.type == "error") {
			toast.error(data.message, { duration: 3000 });
		} else {
			toast.success(data.message, { duration: 3000 });
		}

		setIsResend(false);
		setIsNext(false);
		setOtpScreen(data.isOTPGenerated);
		// countDown();
	}

	async function handleOTPSubmit(e) {
		e.preventDefault();

		setIsSubmit(true);
		const res = await fetch(serverURL + "/api/verifyOTP", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, otp }),
		});

		const data = await res.json();
		console.log(data);

		if (data.isOTPVerified) {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					console.log(userCredential);
					const user = userCredential.user;
					fetch(serverURL + "/api/create-profile", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email,
							photoURL: "NULL",
							googleAuth: "FALSE",
						}),
					}).then((data) => {
						console.log("harshal");
						console.log(user);

						setIsSubmit(false);
						window.location.href = "/profile";
					});
				})
				.catch((error) => {
					setIsSubmit(false);
					const errorMessage = error.message;
					console.log(errorMessage);
				});
		} else {
			setOtp("");
			setIsSubmit(false);
			toast.error("OTP is not verified", { duration: 3000 });
			// console.log("OTP is not verified");
		}
	}

	return (
		<section className="flex justify-center items-center w-full h-[calc(100vh-6rem)]">
			<div className="flex flex-col w-full max-w-md items-center gap-4 px-8">
				<h1 className="font-heading text-4xl font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
					Register
				</h1>
				{!otpScreen ? (
					<form
						onSubmit={handleInfoSubmit}
						className="flex flex-col w-full gap-4"
					>
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							type="email"
							required
							placeholder="Email"
							className="px-4 py-2 border rounded-md"
						/>

						<input
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							type="password"
							required
							placeholder="Password"
							className="px-4 py-2 border rounded-md"
						/>

						<button
							type="submit"
							className="py-2 bg-primary-dark-1 text-white rounded-md"
						>
							{!isNext ? (
								<label> Next </label>
							) : (
								<PuffLoader
									color={"#fff"}
									loading={true}
									size={24}
									className="m-auto items-center"
								/>
							)}
						</button>

						<a className="self-start text-primary" href="/login">
							Already have an account?
						</a>

						<div className="flex row items-center w-full gap-2 text-gray-400">
							<span className="h-px w-full bg-gray-300"></span>
							OR
							<span className="h-px w-full bg-gray-300"></span>
						</div>
						<a
							onClick={handleGoogleSignUp}
							className="w-full py-2 border rounded-md text-primary-dark-1 border-primary-dark-1 flex flex-row justify-center items-center gap-2"
						>
							{!isGoogle ? (
								<img className="h-5" src={googleLogo} />
							) : (
								<span>
									<HashLoader
										color={"#000"}
										loading={true}
										size={24}
										className="m-auto items-center"
									/>
								</span>
							)}
							Continue with Google
						</a>
					</form>
				) : (
					<form
						onSubmit={handleOTPSubmit}
						className="flex flex-col w-full gap-4"
					>
						<p className="text-primary-dark-2 text-center">
							OTP has been sent to {email}
						</p>

						<input
							onChange={(e) => setOtp(e.target.value)}
							value={otp}
							type="text"
							required
							placeholder="Enter OTP here"
							className="px-4 py-2 border rounded-md"
						/>

						<p className="text-primary-dark-1 text-center text-xs">
							If you did not receive OTP, try
							{time > 0 ? (
								<label>
									&nbsp;again in {time}s
									<label className="invisible">
										{setTimeout(() => {
											countDown();
										}, 998)}
									</label>
								</label>
							) : (
								<a
									type="button"
									className="ml-2 py-1 px-2 bg-primary-light-1 text-white rounded-md cursor-pointer"
									onClick={handleInfoSubmit}
								>
									{!isResend ? (
										<label className="cursor-pointer"> Resend OTP </label>
									) : (
										<PulseLoader
											color={"#fff"}
											loading={true}
											size={8}
											className="mx-7 align-middle"
										/>
									)}
								</a>
							)}
						</p>

						<button
							type="submit"
							className="py-2 bg-primary-dark-1 text-white rounded-md"
						>
							{!isSubmit ? (
								<label> Submit </label>
							) : (
								<PuffLoader
									color={"#fff"}
									loading={true}
									size={24}
									className="m-auto items-center"
								/>
							)}
						</button>

						<div className="flex row items-center w-full gap-2 text-gray-400">
							<span className="h-px w-full bg-gray-300"></span>
							OR
							<span className="h-px w-full bg-gray-300"></span>
						</div>
						<button
							onClick={handleGoogleSignUp}
							className="w-full py-2 border rounded-md text-primary-dark-1 border-primary-dark-1 flex flex-row justify-center items-center gap-2"
						>
							{!isGoogle ? (
								<img className="h-5" src={googleLogo} />
							) : (
								<span>
									<HashLoader
										color={"#000"}
										loading={true}
										size={24}
										className="m-auto items-center"
									/>
								</span>
							)}
							Continue with Google
						</button>
					</form>
				)}
			</div>
		</section>
	);
}

export default Register;
