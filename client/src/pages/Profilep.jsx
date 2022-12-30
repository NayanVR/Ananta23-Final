import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import logo from '../assets/ananta_logo.svg'
function Profiles() {

    return (

        <div className='flex-col justify-center items-center w-full h-max lg:py-10 bg-emerald-50 lg:px-60' >
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="flex items-center justify-between px-4 py-2 sm:px-6">
                    <div className='px-4 py-5 sm:px-6'>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Details</h3>

                    </div>

                    <button className='py-2 px-6 h-1/4 items-end rounded-md bg-primary-dark-1 text-white'>EDIT</button>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">

                                    <li className="flex flex-col items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="">
                                            <img src={logo} className="border-solid border border-gray-700 p-2 rounded-md bg-slate-100" />

                                        </div>
                                        <div className="mt-3 flex-shrink-0">
                                            <a href="#" className=" font-medium text-indigo-600 hover:text-indigo-500">
                                                Change
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dt>

                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                    <li className="text-sm">
                                        <div className="px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Nishant Viroja</dd>
                                        </div>

                                    </li>
                                    <li className="text-sm">
                                        <div className="px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Email </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">nishant@gsfcuniversity.ac.in</dd>
                                        </div>

                                    </li>
                                    <li className="text-sm">
                                        <div className="px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Contact No </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">7574914108</dd>
                                        </div>

                                    </li>
                                    <li className="text-sm">
                                        <div className="px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Contact No </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                                        </div>

                                    </li>
                                    <li className="text-sm">
                                        <div className="px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Contact No </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                                        </div>

                                    </li>
                                    <li className="text-sm">
                                        <div className="px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Contact No </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                                        </div>

                                    </li>



                                </ul>
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Contact No </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">University Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$ 120,000</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Branch</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$ 120,000</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Study Year</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$ 120,000</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">D.O.B</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$ 120,000</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Gender</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$ 120,000</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">City</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$ 120,000</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">State</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$ 120,000</dd>
                        </div>

                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">pass id</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="flex w-0 flex-1 items-center">

                                            <span className="ml-2 w-0 flex-1 truncate">A2023NV312230122002</span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Coppy
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="flex w-0 flex-1 items-center">
                                            <img src={logo} className="border-solid border border-gray-700 p-2 rounded-md bg-slate-100" />

                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="overflow-hidden mt-10 bg-white shadow sm:rounded-lg">
                <div className="flex items-center justify-between px-4 py-2 sm:px-6">
                    <div className='px-4 py-5 sm:px-6'>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Details</h3>
                        {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                    </div>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Application for</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                        </div>

                    </dl>
                </div>
            </div>

        </div>

    )
}

export default Profiles