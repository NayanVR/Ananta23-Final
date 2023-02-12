import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AnantaLogo from "../assets/logos/ananta_logo.svg";
import profileIcon from "../assets/icons/Profile.svg";
import "../navbar.css";
import { signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

// import DropdownButton from 'react-bootstrap/DropdownButton';

function Navbar() {
	const { currentUser } = useContext(AuthContext);
	const [isOpen, setIsOpen] = useState(false);
	const [currentPath, setCurrentPath] = useState(location.pathname);
	const navigate = useNavigate();

	useEffect(() => {
		const { pathname } = location;
		setIsOpen(false);
	}, [location.pathname]);

	return (
		<>
			<nav data-is-open={isOpen}>
				<div className="nav">
					<div className="nav__logo">
						<img src={AnantaLogo} alt="Ananta logo" />
					</div>
					<div className="nav__links">
						<CustomLink to="/">Home</CustomLink>
						<DropDown title="Events">
							<Link
								className="font-thin text-start px-6 py-2 hover:bg-gray-100"
								to="/inertia"
							>
								Inertia (Technical Events)
							</Link>
							<Link
								className="font-thin text-start  px-6 py-2 hover:bg-gray-100"
								to="/swoosh"
							>
								Swoosh (Non-Technical Events)
							</Link>
							<Link
								className="font-thin text-start  px-6 py-2 hover:bg-gray-100"
								to="/upshot"
							>
								Upshot (Fun Events)
							</Link>
							<Link
								className="font-thin text-start  px-6 py-2 hover:bg-gray-100"
								to="/zingaat"
							>
								Zingaat (Cultural Night)
							</Link>
							<Link
								className="font-thin text-start  px-6 py-2 hover:bg-gray-100"
								to="/kalakriti"
							>
								Kala Kriti (Workshops)
							</Link>
							<Link
								className="font-thin text-start  px-6 py-2 hover:bg-gray-100"
								to="/equilibrium"
							>
								Equilibrium (Guest Lectures)
							</Link>
						</DropDown>
						<CustomLink to="/buypass">Buy a Pass</CustomLink>
						<CustomLink to="/digital-point">
							Digital Points
						</CustomLink>
						<CustomLink to="">Schedule</CustomLink>
						<DropDown title="More">
							<Link
								className="px-6 py-2 hover:bg-gray-100"
								to="/about-us"
							>
								About Us
							</Link>
							<Link
								className="px-6 py-2 hover:bg-gray-100"
								to="/contact-us"
							>
								Our Team
							</Link>
							<Link
								className="px-6 py-2 hover:bg-gray-100"
								to="/our-partners"
							>
								Our Partners
							</Link>
						</DropDown>
					</div>
					{currentUser ? (
						<button className="dropdown rounded-md bg-primary-light-1 text-white">
							<button className="px-3 py-3 rounded-md bg-primary-light-2 text-white">
								<img
									className="object-contain"
									src={profileIcon}
									alt="Profile"
								/>
							</button>
							<div className="dropdown-content right-0 br-3">
								<a href="/profile">Profile</a>
								<a onClick={() => signOut(auth)}>Sign Out</a>
							</div>
						</button>
					) : (
						<button
							className="py-2 px-6 rounded-md bg-primary-dark-1 text-white"
							onClick={() => {
								navigate("/login");
							}}
						>
							LOGIN
						</button>
					)}
					<div
						onClick={(_) => {
							setIsOpen(!isOpen);
						}}
						className="nav__toggle"
					>
						<span className="nav__toggle__bars"></span>
					</div>
				</div>
			</nav>
			<div className="nav__mob__links">
				<CustomLink to="/">Home</CustomLink>
				<DropDown title="Events">
					<Link
						className="text-sm font-thin px-6 py-4 sm:py-2 sm:hover:bg-gray-100 border-t border-primary sm:border-none"
						to="/inertia"
					>
						Inertia (Technical)
					</Link>
					<Link
						className="text-sm font-thin px-6 py-4 sm:py-2 sm:hover:bg-gray-100 border-t border-primary sm:border-none"
						to="/swoosh"
					>
						Swoosh (Non-Technical)
					</Link>
					<Link
						className="text-sm font-thin px-6 py-4 sm:py-2 sm:hover:bg-gray-100 border-t border-primary sm:border-none"
						to="/upshot"
					>
						Upshot (Fun)
					</Link>
					<Link
						className="text-sm font-thin px-6 py-4 sm:py-2 sm:hover:bg-gray-100 border-t border-primary sm:border-none"
						to="/zingaat"
					>
						Zingaat (Cultural Night)
					</Link>
					<Link
						className="text-sm font-thin px-6 py-4 sm:py-2 sm:hover:bg-gray-100 border-t border-primary sm:border-none"
						to="/kalakriti"
					>
						Kala Kriti (Workshop)
					</Link>
					<Link
						className="text-sm font-thin px-6 py-4 sm:py-2 sm:hover:bg-gray-100 border-t border-primary sm:border-none"
						to="/equilibrium"
					>
						Equilibrium (Guest Lectures)
					</Link>
				</DropDown>
				<CustomLink to="/buypass">Buy a Pass</CustomLink>
				<CustomLink to="/digital-point">Digital Points</CustomLink>
				<CustomLink to="">Schedule</CustomLink>
				<CustomLink to="/about-us">About Us</CustomLink>
				<CustomLink to="/contact-us">Our Team</CustomLink>
				<CustomLink to="/our-partners">Our Partners</CustomLink>
			</div>
		</>
	);
}

function DropDown({ title, children }) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const { pathname } = location;
		setIsOpen(false);
	}, [location.pathname]);

	return (
		<div className="relative w-full sm:w-max group">
			<button
				onClick={(_) => setIsOpen(!isOpen)}
				className="text-black p-4 w-full border-t border-primary sm:border-none flex items-center justify-center    "
			>
				{title}&nbsp;
				<span
					className={`${
						isOpen ? "rotate-180" : "rotate-0"
					} sm:group-hover:rotate-180 sm:rotate-0 inline-block transition-all`}
				>
					<svg
						className="w-4 h-4 shrink-0 transition-all"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</span>
			</button>
			<div
				className={`${
					isOpen ? "" : "hidden"
				} sm:group-hover:flex sm:hidden bg-transparent sm:bg-white sm:border sm:border-primary text-center flex flex-col w-full sm:w-max sm:absolute sm:left-0`}
			>
				{children}
			</div>
		</div>
	);
}

function CustomLink({ to, children }) {
	return (
		<Link to={to} className="p-4 border-t border-primary sm:border-none">
			{children}
		</Link>
	);
}

export default Navbar;
