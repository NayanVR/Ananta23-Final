import React from 'react'
import { useState, useEffect, useContext, Fragment } from "react";
import { AuthContext } from "../contexts/AuthContext";
import YourEvent from "../components/YourEvent";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";


export default function MyEvents() {

    const { currentUser, profile, setProfile, pass } = useContext(AuthContext);
    let email_ = currentUser.email;

    const serverURL = import.meta.env.VITE_SERVER_URL;

    const [totalEvents, setTotalEvents] = useState(0);
    const [totalWorkshops, setTotalWorkshops] = useState(0);
    const [totalGuests, setTotalGuests] = useState(0);

    const [reloadEvents, setReloadEvents] = useState(false);

    const [registeredEvents, setRegisteredEvents] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [isView, setIsView] = useState(false);
    const [modalColor, setModalColor] = useState("#c22727");

    const [eventCode, setEventCode] = useState("");
    const [selectedEventType, setSelectedEventType] = useState("");
    const [selectedEventName, setSelectedEventName] = useState("");
    const [color, setColor] = useState("");
    const [teamID, setTeamID] = useState("");
    const [teamName, setTeamName] = useState("");
    const [timestamp, setTimestamp] = useState("");

    const [members, setMembers] = useState([])
    const [teamLeader, setTeamLeader] = useState('')

    const [isSolo, setIsSolo] = useState(false);
    const [role, setRole] = useState("");

    let allEvents = [];

    useEffect(() => {
        const fetchEvents = async () => {
            currentUser.getIdToken().then(async (token) => {
                const data = await fetch(serverURL + "/api/secure/getEvents", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email_ }),
                });
                const fetchdata = await data.json();

                if (fetchdata.type == "success") {
                    allEvents = [];
                    console.log(fetchdata.data);
                    fetchdata.data.solo.forEach((data) => {
                        allEvents.push(data);
                        setRegisteredEvents(allEvents);
                    });
                    fetchdata.data.team.forEach((data) => {
                        allEvents.push(data);
                        setRegisteredEvents(allEvents);
                    });
                }
            })
        };

        fetchEvents();
        // console.log(registeredEvents);
    }, [reloadEvents]);


    async function handleDeleteEvent() {
        const pid = profile.ParticipantID;
        currentUser.getIdToken().then(async (token) => {

            fetch(serverURL + "/api/secure/deleteEvent", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + currentUser.accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pid,
                    eventCode,
                    isSolo,
                    role,
                    teamID,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.type == "success") {
                        if (eventCode.includes("IN") || eventCode.includes("SW")) {
                            setTotalEvents(() => totalEvents - 1);
                        } else if (eventCode.includes("EQ")) {
                            setTotalGuests(() => totalGuests - 1);
                        } else if (eventCode.includes("KK")) {
                            setTotalGuests(() => totalWorkshops - 1);
                        }
                        toast.success(data.message, { duration: 3000 });
                    } else {
                        toast.error(data.message, { duration: 3000 });
                    }
                    closeModal();
                    setReloadEvents(!reloadEvents);
                    // console.log(registeredEvents.length);
                    if (registeredEvents.length == 1) {
                        window.location.href = "profile";
                    }
                });
        });

        // const info = await unregister.json();
        // // console.log(info)

    }

    function deleteEvent(info, color) {
        setIsOpen(true);
        setIsView(false);
        setColor(color);
        setModalColor("border-red-600");
        setSelectedEventName(info.EventName);
        setSelectedEventType(info.EventType);
        setEventCode(info.EventCode);

        if (info.HeadCount > 1) {
            setIsSolo(false);
            setRole(info.Role);
            setTeamID(info.TeamID);
        } else {
            setIsSolo(true);
            setRole("");
            setTeamID("");
        }
    }

    function infoEvent(info, color) {
        console.log(info);

        // Fetching team data
        if (info.Role) {
            currentUser.getIdToken().then(async (token) => {
                fetch(serverURL + "/api/secure/getTeamMembers", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        teamID: info.TeamID,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        const members = data.data;
                        setTeamLeader(members.filter((member) => member.Role == "Leader")[0]);
                        setMembers(members.filter((member) => member.Role != "Leader"));
                    });
            });
        }

        setIsOpen(true);
        setIsView(true);
        setColor(color);
        setModalColor("border-black");
        setSelectedEventName(info.EventName);
        setSelectedEventType(info.EventType);
        setEventCode(info.EventCode);
        setTeamName(info.TeamName);
        setTimestamp(info.Timestamp);

        console.log(info)

        if (info.HeadCount > 1) {
            setIsSolo(false);
            setRole(info.Role);
            setTeamID(info.TeamID);
        } else {
            setIsSolo(true);
            setRole("");
            setTeamID("");
        }
    }

    function handleRemoveMember(pid, teamID_) {
        setIsOpen(false);
        currentUser.getIdToken().then(async (token) => {
            fetch(serverURL + "/api/secure/removeTeamMember", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    participantID: pid,
                    teamID: teamID_
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.type == "success") {
                        toast.success(data.message, { duration: 3000 });
                    } else {
                        toast.error(data.message, { duration: 3000 });
                    }
                    setReloadEvents(!reloadEvents);
                }
                );
        });
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="flex-col my-5 justify-center items-center w-full h-max px-4 lg:py-10 bg-white lg:px-40">
            <div
                className="md:grid md:grid-cols-4 md:gap-6"
                id="viewevents"
            >
                <div className="mt-5 md:col-span-4 md:mt-0">
                    <div className="overflow-hidden shadow py-4 rounded-md">
                        <div className="bg-primary-dark-1 mb-5 px-4 py-3 flex justify-between items-center sm:px-6">
                            <h1 className="font-bold text-xl text-white justify-center m-auto">
                                Your Events
                            </h1>
                        </div>
                        {registeredEvents.length > 0 ? (
                            registeredEvents.map((data, index) => {
                                if (data.EventType !== "KalaKriti") {
                                    return (
                                        <YourEvent
                                            data={data}
                                            deleteEvent={deleteEvent}
                                            infoEvent={infoEvent}
                                            key={index}
                                        />
                                    )
                                }
                            })
                        ) : (
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="bg-white shadow px-4 py-3 flex justify-between items-center sm:px-6">
                                    <div className="justify-center">
                                        <label className="block text-lg font-medium text-gray-700">
                                            No Event Found
                                        </label>
                                        <label
                                            htmlFor="first-name"
                                            className="block text-xs font-extralight text-gray-700"
                                        ></label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="overflow-hidden mt-16 py-4 shadow rounded-md">
                        <div className="bg-primary-dark-1 mb-5 px-4 py-3 flex justify-between items-center sm:px-6">
                            <h1 className="font-bold text-xl text-white justify-center m-auto">
                                Your Workshops
                            </h1>
                        </div>
                        {registeredEvents.length > 0 ? (
                            registeredEvents.map((data, index) => {
                                if (data.EventType === "KalaKriti") {
                                    return (
                                        <YourEvent
                                            data={data}
                                            deleteEvent={deleteEvent}
                                            infoEvent={infoEvent}
                                            key={index}
                                        />
                                    )
                                }
                            })
                        ) : (
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="bg-white shadow px-4 py-3 flex justify-between items-center sm:px-6">
                                    <div className="justify-center">
                                        <label className="block text-lg font-medium text-gray-700">
                                            No Event Found
                                        </label>
                                        <label
                                            htmlFor="first-name"
                                            className="block text-xs font-extralight text-gray-700"
                                        ></label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
                                    className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-10 py-6 text-left align-middle shadow-xl transition-all border-y-4 ${modalColor} bg-white`}
                                >
                                    <Dialog.Title
                                        as="h3"
                                        className="text-center text-lg font-medium leading-6 text-gray-900 mb-6"
                                    >
                                        <div className="text-center">
                                            <label
                                                className={`text-xs font-medium mr-2 px-1.5 py-0.5 rounded bg-${color}-100 text-${color}-800`}
                                            >
                                                {selectedEventType}
                                            </label>
                                            <label className="block text-3xl font-medium text-gray-700">
                                                {selectedEventName}
                                            </label>
                                        </div>
                                    </Dialog.Title>
                                    {!isView ? (
                                        // Deletion of Event --------------------------------

                                        <>
                                            <div className="mt-2">
                                                <p className="text-center text-sm text-gray-500 mb-6">
                                                    {isSolo ? (
                                                        <>
                                                            <label className="bb-6">
                                                                By doing this,
                                                                you might not
                                                                register in this
                                                                event if event
                                                                got full...
                                                            </label>
                                                            <br />
                                                            <br />
                                                            <label>
                                                                Do you want to
                                                                continue?
                                                            </label>
                                                        </>
                                                    ) : role == "Leader" ? (
                                                        <>
                                                            <label className="mb-6">
                                                                Unregistering
                                                                yourself means
                                                                you will remove
                                                                your team from
                                                                the event which
                                                                includes all
                                                                team members and
                                                                you might not
                                                                register in this
                                                                event if event
                                                                got full...
                                                            </label>
                                                            <br />
                                                            <br />
                                                            <label>
                                                                Do you want to
                                                                continue?
                                                            </label>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <label className="mb-6">
                                                                By doing this,
                                                                you might not
                                                                register in this
                                                                event if event
                                                                got full...
                                                            </label>
                                                            <br />
                                                            <br />
                                                            <label>
                                                                Do you want to
                                                                continue?
                                                            </label>
                                                        </>
                                                    )}
                                                </p>
                                            </div>

                                            <div className="flex m-auto w-min">
                                                <div className="mx-4">
                                                    <button
                                                        type="button"
                                                        className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#DC3545] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#db6e78] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
                                                        style={{
                                                            margin: "auto",
                                                        }}
                                                        onClick={
                                                            handleDeleteEvent
                                                        }
                                                    >
                                                        Yes
                                                    </button>
                                                </div>
                                                <div className="mx-4">
                                                    <button
                                                        type="button"
                                                        className="mx-6 inline-flex justify-center rounded-md border border-transparent bg-[#012C3D] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
                                                        style={{
                                                            margin: "auto",
                                                        }}
                                                        onClick={closeModal}
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        // Information -------------------------------------
                                        <>
                                            <div className="mt-2">
                                                <p className="text-center justify-center text-sm text-gray-500 mb-6">
                                                    {isSolo ? (
                                                        <>
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label
                                                                    htmlFor="first-name"
                                                                    className="text-xs font-medium text-gray-700"
                                                                >
                                                                    Registration
                                                                    Time
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    autoComplete="given-name"
                                                                    placeholder="First Name"
                                                                    disabled
                                                                    required
                                                                    value={
                                                                        [timestamp]
                                                                    }
                                                                    className="disabled:text-gray-500 disabled:bg-primary-light-3 m-auto text-center mt-1 block w-min rounded-md border-gray-300 shadow-sm focus:border-primary-dark-1 focus:ring-primary-dark-1 sm:text-sm"
                                                                />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div
                                                            className={`drop-shadow-md rounded-2xl py-5`}
                                                        >
                                                            <div className="col-span-6 sm:col-span-3 mb-2 mx-2">
                                                                <label
                                                                    htmlFor="first-name"
                                                                    className="text-[0.8rem] block font-medium text-gray-700"
                                                                >
                                                                    Team Name
                                                                </label>
                                                                <label
                                                                    htmlFor="first-name"
                                                                    className=" text-xl p-2 text-center m-auto bg-white block w-max px-5 mt-0.5 font-medium text-gray-700 rounded-sm "
                                                                >
                                                                    {teamName}
                                                                </label>
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-3 m-3">
                                                                <label
                                                                    htmlFor="first-name"
                                                                    className="text-xs block font-medium text-gray-700"
                                                                >
                                                                    Registration
                                                                    Time
                                                                </label>
                                                                <label
                                                                    htmlFor="first-name"
                                                                    className=" text-sm p-2 text-center m-auto bg-white block w-max px-5 mt-0.5 font-medium text-gray-700 rounded "
                                                                >
                                                                    {timestamp}
                                                                </label>
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-3 m-3">
                                                                <label
                                                                    htmlFor="first-name"
                                                                    className="text-xs block font-medium text-gray-700"
                                                                >
                                                                    Team Leader
                                                                </label>
                                                                <label
                                                                    htmlFor="first-name"
                                                                    className=" text-md p-2 text-center m-auto bg-white block w-max px-5 mt-0.5 font-bold text-gray-700 rounded-sm "
                                                                >
                                                                    {teamLeader['Firstname']} {teamLeader['Lastname']}
                                                                </label>
                                                            </div>

                                                            {(role == "Leader" && members.length != 0) && (
                                                                <div
                                                                    className={` bg-white mx-5 rounded-sm py-2`}
                                                                >
                                                                    {
                                                                        members.map((member) => {
                                                                            return (
                                                                                <>
                                                                                    <div className='flex justify-between px-4'>
                                                                                        <label className="text-[0.8rem] text-semibold block font-medium text-gray-700">
                                                                                            {member['Firstname']} {member['Lastname']}
                                                                                        </label>
                                                                                        <button onClick={() => { handleRemoveMember(member.ParticipantID, teamID) }} className='text-red-600 px-2 my-1 rounded-sm '>Remove</button>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </p>
                                            </div>

                                            <div className="flex m-auto w-min">
                                                <div className="mx-4">
                                                    <button
                                                        type="button"
                                                        className="shadow mx-6 text-[#1C7690] inline-flex justify-center rounded-md border border-[#1C7690] px-4 py-2 text-sm font-medium text-[#F2FFFE] hover:text-[#ffffff] hover:bg-[#1C7690] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012C3D]-500 focus-visible:ring-offset-2"
                                                        style={{
                                                            margin: "auto",
                                                        }}
                                                        onClick={closeModal}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
