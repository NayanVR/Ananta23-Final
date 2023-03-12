import React from "react";
import { useContext, Fragment, useState } from "react";
import EventCard from "../components/EventCardNew";
import { AuthContext } from "../contexts/AuthContext";
// import profilePic from "../assets/photos/profile.jpg";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";
import PuffLoader from "react-spinners/PuffLoader";
import EventsData from "../assets/Events.json"
import { useNavigate } from "react-router-dom";


function K12() {

    const [isOpen, setIsOpen] = useState(false)

    function handleResposnse() {
        setIsOpen(true)
    }

    function closeModal(params) {
        setIsOpen(false)
    }

    function viewDetails() {
        
    }
	
	return (
		<>

			<h1 className="font-heading  text-center my-12 text-[2rem] sm:text-[4rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
				K12 : School Events
			</h1>
			<div className="max-w-[1200px] m-auto my-16 px-4 flex gap-16 flex-wrap justify-center items-center">
				{EventsData.inertiaa.map((event, index) => (
					<EventCard
						key={index}
						event={event}
						registerNow={handleResposnse}
						viewDetails={viewDetails}
					/>
				))}
			</div>
			{/* contact info */}
			<Transition appear show={isOpen} as={Fragment}>
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
										className="text-center text-lg  leading-6 font-semibold text-gray-900 mb-6"
									>
										
                                        School pass is not available on Website.
                                        
									</Dialog.Title>
                               
									<div className="mt-1">
										
										<p className="text-center text-md font-medium leading-4 text-gray-900 mb-4">
                                        Please contact the Marketing team for School Pass.
										</p> 
										<p className="text-center text-sm font-medium leading-3 text-gray-900 mb-3">
                                        Devansh Shah: <a href="https://wa.me/+919016535646" className="text-blue-500 underline">+919016535646</a>
										</p> 
										<p className="text-center text-sm font-medium leading-3 text-gray-900 mb-6">
                                        Khushi Panchal: <a href="https://wa.me/+919016535646" className="text-blue-500 underline">+919016535646</a>
										</p> 
                                        
									</div>
									<div className="flex m-auto w-min">
										
										<div className="mx-1">
											<button
												type="button"
												className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#DC3545] px-3 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#db6e78] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
												style={{ margin: "auto" }}
												onClick={closeModal}
											>
												Close
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

export default K12;
