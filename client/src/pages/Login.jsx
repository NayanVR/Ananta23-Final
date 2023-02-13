import React from "react";
import { useState } from "react";
import googleLogo from "../assets/icons/google_icon.svg";
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { toast } from "react-hot-toast";
import { PuffLoader } from "react-spinners/PuffLoader";
import { FadeLoader } from "react-spinners/FadeLoader";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Loaders
	const [isLogin, setIsLogin] = useState(false);
	const [isSend, setIsSend] = useState(false);

	// Forgot Password State
	const [forgotPass, setForgotPass] = useState(false);

	const serverURL = import.meta.env.VITE_SERVER_URL;
	
	function handleSubmit(e) {
		e.preventDefault();


		
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				// console.log(user);
				window.location.href = "/";
			})
			.catch((error) => {
				const firebaseMessage = error.message
					.split("/")[1]
					.replace(").", "");
				let errorMessage = () => {
					// console.log(firebaseMessage);
					if (firebaseMessage == "user-not-found") {
						return "User not found!";
					} else if (firebaseMessage == "wrong-password") {
						return "Incorrect Password!";
					} else {
						return "Invalid Credentials!";
					}
				};
				toast.error(errorMessage, { duration: 3000 });
			});
	}

	async function handleForgotPassword(e) {
		e.preventDefault();
		setIsSend(true);
		const res = await fetch(serverURL + "/api/forgotpassword/checkuser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});
		const data = await res.json();
		// console.log(data);

		if (data.type == "error" || data.type == "info") {
			toast.error(data.message, { duration: 3000 });
		} else if (data.type == "success") {
			sendPasswordResetEmail(auth, email)
				.then((result) => {
					if (result) {
						toast.success(result, {duration: 10000});
					}

				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// console.log(error);
					toast.error(error, {duration: 10000})
					// ..
				});
			toast.success(data.message, { duration: 3000 });
			setForgotPass(false);
		}
		setIsSend(false);
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

	async function handleGoogleLogin(e) {
		e.preventDefault();

		const res = await signInWithPopup(auth, provider);
		// console.log(res);
		const email = res.user.email;
		const photoURL = res.user.photoURL;
		const data = await createProfile(email, photoURL);
		// console.log(data);
		if (data.type === "success") {
			// console.log('success')
			window.location.href = "/";
		} else {
			toast.error(data.message, { duration: 3000 });
		}
	}

	return !forgotPass ? (
		<section className="flex justify-center items-center w-full h-[calc(100vh-6rem)]">
			<div className="flex flex-col w-full max-w-md items-center gap-4 px-8">
				<h1 className="font-heading text-4xl font-extrabold bg-gradient-to-b from-primary-dark-1 to-primary bg-clip-text text-transparent">
					Login
				</h1>
				<a className="self-center text-primary text-sm mb-6" href="/register">
					Don't have an account?
				</a>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-full gap-4"
				>
					<input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type="email"
						placeholder="Email"
						className="px-4 py-2 border rounded-md"
						required
						autoFocus
					/>

					<input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type="password"
						placeholder="Password"
						className="px-4 py-2 border rounded-md"
						required
					/>
					<a
						className="self-end text-primary cursor-pointer text-sm"
						onClick={() => setForgotPass(true)}
					>
						Forgot Password?
					</a>

					<button
						type="submit"
						className="py-2 bg-primary-dark-1 text-white rounded-md"
					>
						{!isLogin ? (
							<label> Login </label>
						) : (
							<PuffLoader
								color={"#fff"}
								loading={true}
								size={24}
								className="m-auto items-center"
							/>
						)}
					</button>
				</form>
				
				<div className="flex row items-center w-full gap-2 text-gray-400">
					<span className="h-px w-full bg-gray-300"></span>
					OR
					<span className="h-px w-full bg-gray-300"></span>
				</div>
				<button
					onClick={handleGoogleLogin}
					className="w-full mx-8 py-2 border rounded-md text-primary-dark-1 border-primary-dark-1 flex flex-row justify-center items-center gap-2"
				>
					{!isLogin ? (
						<img className="h-5" src={googleLogo} />
					) : (
						<FadeLoader
							color={"#fff"}
							loading={true}
							size={24}
							className="m-auto items-center"
						/>
					)}
					Continue with Google
				</button>
			</div>
		</section>
	) : (
		<section className="flex justify-center items-center w-full h-[calc(100vh-6rem)]">
			<div className="flex flex-col w-full max-w-md items-center gap-4 px-8">
				<h1 className="font-heading text-4xl text-center font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
					Reset Password
				</h1>
				{/* {!otpScreen ? ( */}
				<form
					onSubmit={handleForgotPassword}
					className="flex flex-col w-full gap-4"
				>
					<p className="text-primary-dark-2 text-center">
						Enter your Email to reset your password...
					</p>
					<input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type="email"
						placeholder="Email"
						className="px-4 py-2 border rounded-md"
						required
					/>

					<button
						type="submit"
						className="py-2 bg-primary-dark-1 text-white rounded-md"
					>
						{!isSend ? (
							<label>Send</label>
						) : (
							//
							<label>Sending...</label>
						)}
					</button>
					<a
						className="self-start text-primary cursor-pointer"
						href="/login"
					>
						I know email and password!
					</a>
					<div className="flex row items-center w-full gap-2 text-gray-400">
						<span className="h-px w-full bg-gray-300"></span>
						OR
						<span className="h-px w-full bg-gray-300"></span>
					</div>
					<button
						onClick={handleGoogleLogin}
						className="w-full py-2 border rounded-md text-primary-dark-1 border-primary-dark-1 flex flex-row justify-center items-center gap-2"
					>
						<img className="h-5" src={googleLogo} /> Continue with
						Google
					</button>
				</form>
			</div>
		</section>
	);
}

export default Login;
