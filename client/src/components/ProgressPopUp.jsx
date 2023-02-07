import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { Link } from 'react-router-dom';


export default function ProgressPopUp({ isOpen, setIsOpen, authStatus, profileStatus, paymentStatus }) {

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
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
                                    className="text-center text-lg font-medium leading-6 text-gray-900 mb-6"
                                >
                                    What's Next ?
                                </Dialog.Title>
                                <div className='flex gap-4'>
                                    <div className={`${authStatus ? 'bg-green-700' : 'bg-primary'} min-h[1.5rem] h-6 min-w-[1.5rem] w-6 rounded-md text-white flex justify-center items-center`}>
                                        1
                                    </div>
                                    <p className={`${authStatus ? 'text-gray-500' : 'text-black'} mb-4`}>
                                        Please <Link to={'/login'} className='underline'>Sign in</Link> to start registration process.
                                    </p>
                                </div>

                                <div className='flex gap-4'>
                                    <div className={`${profileStatus ? 'bg-green-700' : 'bg-primary'} min-h[1.5rem] h-6 min-w-[1.5rem] w-6 rounded-md text-white flex justify-center items-center`}>
                                        2
                                    </div>
                                    <p className={`${profileStatus ? 'text-gray-500' : 'text-black'} mb-4`}>
                                        Complete <Link to={'/profile'} className='underline'>profile</Link> to proceed further.
                                    </p>
                                </div>

                                <div className='flex gap-4'>
                                    <div className={`${paymentStatus ? 'bg-green-700' : 'bg-primary'} min-h[1.5rem] h-6 min-w-[1.5rem] w-6 rounded-md text-white flex justify-center items-center`}>
                                        3
                                    </div>
                                    <p className={`${paymentStatus ? 'text-gray-500' : 'text-black'} mb-4`}>
                                        <Link to={'/buypass'} className='underline'>Buy a pass</Link> to start event registration.
                                    </p>
                                </div>

                                <div className='flex gap-4'>
                                    <div className={`bg-primary min-h[1.5rem] h-6 min-w-[1.5rem] w-6 rounded-md text-white flex justify-center items-center`}>
                                        4
                                    </div>
                                    <p className={`text-black mb-4`}>
                                        Enjoy! Now, go for events registration.
                                    </p>
                                </div>

                                <div className="flex m-auto w-min">
                                    <div className="mx-4">
                                        <button
                                            type="button"
                                            className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
                                            style={{ margin: "auto" }}
                                        >
                                            Register
                                        </button>
                                    </div>
                                    <div className="mx-4">
                                        <button
                                            type="button"
                                            className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#DC3545] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#db6e78] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
                                            style={{ margin: "auto" }}
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
