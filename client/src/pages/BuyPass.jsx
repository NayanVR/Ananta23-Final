import React from 'react'
import { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import PassCard from '../components/PassCard'

function BuyPass() {

    const { currentUser } = useContext(AuthContext);

    const serverURL = import.meta.env.VITE_SERVER_URL;

    const passes = [
        {
            name: "Bronze",
            price: 10,
            id: "PS-B"
        },
        {
            name: "Silver",
            price: 20,
            id: "PS-S"
        },
        {
            name: "Gold",
            price: 30,
            id: "PS-G"
        },
        {
            name: "Combo 1",
            price: 40,
            id: "PS-C1"
        },
        {
            name: "Combo 2",
            price: 50,
            id: "PS-C2"
        },
        {
            name: "Atmos",
            price: 40,
            id: "PS-DJ"
        }
    ]

    async function handleBuyClick(passCode) {

        if (currentUser == null) window.location.href = "/login";

        let profile = localStorage.getItem("profile")
        if (profile == '{}') window.location.href = "/profile";
        profile = JSON.parse(profile)
        const PID = profile.ParticipantID

        const res = await fetch(serverURL + "/api/secure/pass/buy/check", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + currentUser.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ passCode, PID }),
        });
        const check = await res.json();
        const amt = await check.payAmount
        console.log(check);

        if (check.type === "error") {
            
        }

        // if (check.message == "Profile Not Completed") {
        //     window.location.href = "/profile";
        // } else if (check.message == "Buying First Pass") {
        //     const res = await fetch(serverURL + "/api/secure/pass/buy", {
        //         method: "POST",
        //         headers: {
        //             Authorization: "Bearer " + currentUser["accessToken"],
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ PID, passCode, amt }),
        //     });
        //     const data = await res.json();
        //     console.log(data);
        // } else if (check.message == "Same Pass") {
        // } else if (check.message == "Remove Registered Events & Guest Lectures") {
        // } else if (check.message == "Can't Downgrade Pass") {
        // } else if (check.message == "Remove Registered Workshops") {
        // } else if (check.message == "Event&Guest/Upgrade") {
        //     const res = await fetch(serverURL + "/api/secure/pass/buy", {
        //         method: "POST",
        //         headers: {
        //             Authorization: "Bearer " + currentUser["accessToken"],
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ PID, passCode, amt }),
        //     });
        //     const data = await res.json();
        //     console.log(data);
        // } else if (check.message == "Event&Guest/C2") {
        //     const res = await fetch(serverURL + "/api/secure/pass/buy", {
        //         method: "POST",
        //         headers: {
        //             Authorization: "Bearer " + currentUser["accessToken"],
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ PID, passCode, amt }),
        //     });
        //     const data = await res.json();
        //     console.log(data);
        // } else if (check.message == "Event&Guest/DJ") {
        //     const res = await fetch(serverURL + "/api/secure/pass/buy", {
        //         method: "POST",
        //         headers: {
        //             Authorization: "Bearer " + currentUser["accessToken"],
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ PID, passCode, amt }),
        //     });
        //     const data = await res.json();
        //     console.log(data);
        // } else if (check.message == "Combos") {
        //     const res = await fetch(serverURL + "/api/secure/pass/buy", {
        //         method: "POST",
        //         headers: {
        //             Authorization: "Bearer " + currentUser["accessToken"],
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ PID, passCode, amt }),
        //     });
        //     const data = await res.json();
        //     console.log(data);
        // }
    }

    return (
        <div className='flex flex-wrap'>
            {
                passes.map((pass, index) => <PassCard buyClick={handleBuyClick} passInfo={pass} key={index} />)
            }
        </div>
    )
}

export default BuyPass