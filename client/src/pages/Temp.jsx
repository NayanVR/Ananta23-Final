import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Home() {

    const { currentUser } = useContext(AuthContext);

    const serverURL = import.meta.env.VITE_SERVER_URL;
    const email = currentUser.email;

    async function buyAPass(passCode) {

        if (currentUser == null) window.location.href = "/login";


        const res = await fetch(serverURL + "/api/secure/pass/buy/check", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + currentUser["accessToken"],
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ passCode, email }),
        });
        const check = await res.json();
        const amt = check.PayAmount
        const participantID = check.ParticipantID
        console.log(check);
        if (check.Message == "Profile") {
            window.location.href = "/profile";
        } else if (check.Message == "FirstPass") {
            const res = await fetch(serverURL + "/api/secure/pass/buy", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + currentUser["accessToken"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ participantID, passCode, amt }),
            });
            const data = await res.json();
            console.log(data);
        } else if (check.Message == "Warning/SamePass") {
        } else if (check.Message == "Warning/E&G") {
        } else if (check.Message == "Warning/LowerPass") {
        } else if (check.Message == "Warning/W") {
        } else if (check.Message == "Event&Guest/Upgrade") {
            const res = await fetch(serverURL + "/api/secure/pass/buy", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + currentUser["accessToken"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ participantID, passCode, amt }),
            });
            const data = await res.json();
            console.log(data);
        } else if (check.Message == "Event&Guest/C2") {
            const res = await fetch(serverURL + "/api/secure/pass/buy", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + currentUser["accessToken"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ participantID, passCode, amt }),
            });
            const data = await res.json();
            console.log(data);
        } else if (check.Message == "Event&Guest/DJ") {
            const res = await fetch(serverURL + "/api/secure/pass/buy", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + currentUser["accessToken"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ participantID, passCode, amt }),
            });
            const data = await res.json();
            console.log(data);
        } else if (check.Message == "Combos") {
            const res = await fetch(serverURL + "/api/secure/pass/buy", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + currentUser["accessToken"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ participantID, passCode, amt }),
            });
            const data = await res.json();
            console.log(data);
        }
    }

    return (
        <div>
            <div className="isolate bg-white">
                <main>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        <div
                            style={{
                                width: "20vw",
                                height: "30vh",
                                backgroundColor: "#de8c8c",
                                borderRadius: "2vh",
                                margin: "5vh",
                                display: "flex",
                                flexDirection: "column",
                                padding: "2vh",
                            }}
                        >
                            Bronze
                            <button
                                onClick={() => buyAPass("PS-B")}
                                className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                            >
                                Buy
                                <span className="text-indigo-200" aria-hidden="true">
                                    &rarr;
                                </span>
                            </button>
                        </div>
                        <div
                            style={{
                                width: "20vw",
                                height: "30vh",
                                backgroundColor: "lightgray",
                                borderRadius: "2vh",
                                margin: "5vh",
                                display: "flex",
                                flexDirection: "column",
                                padding: "2vh",
                            }}
                        >
                            Silver
                            <button
                                onClick={() => buyAPass("PS-S")}
                                className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                            >
                                Buy
                                <span className="text-indigo-200" aria-hidden="true">
                                    &rarr;
                                </span>
                            </button>
                        </div>
                        <div
                            style={{
                                width: "20vw",
                                height: "30vh",
                                backgroundColor: "#FFD700",
                                borderRadius: "2vh",
                                margin: "5vh",
                                display: "flex",
                                flexDirection: "column",
                                padding: "2vh",
                            }}
                        >
                            Gold
                            <button
                                onClick={() => buyAPass("PS-G")}
                                className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                            >
                                Buy
                                <span className="text-indigo-200" aria-hidden="true">
                                    &rarr;
                                </span>
                            </button>
                        </div>
                        <div
                            style={{
                                width: "20vw",
                                height: "30vh",
                                backgroundColor: "lightblue",
                                borderRadius: "2vh",
                                margin: "5vh",
                                display: "flex",
                                flexDirection: "column",
                                padding: "2vh",
                            }}
                        >
                            Combo 1
                            <button
                                onClick={() => buyAPass("PS-C1")}
                                className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                            >
                                Buy
                                <span className="text-indigo-200" aria-hidden="true">
                                    &rarr;
                                </span>
                            </button>
                        </div>
                        <div
                            style={{
                                width: "20vw",
                                height: "30vh",
                                backgroundColor: "lightgreen",
                                borderRadius: "2vh",
                                margin: "5vh",
                                display: "flex",
                                flexDirection: "column",
                                padding: "2vh",
                            }}
                        >
                            Combo 2
                            <button
                                onClick={() => buyAPass("PS-C2")}
                                className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                            >
                                Buy
                                <span className="text-indigo-200" aria-hidden="true">
                                    &rarr;
                                </span>
                            </button>
                        </div>
                        <div
                            style={{
                                width: "20vw",
                                height: "30vh",
                                backgroundColor: "violet",
                                borderRadius: "2vh",
                                margin: "5vh",
                                display: "flex",
                                flexDirection: "column",
                                padding: "2vh",
                            }}
                        >
                            ATMOS
                            <button
                                onClick={() => buyAPass("PS-DJ")}
                                className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                            >
                                Buy
                                <span className="text-indigo-200" aria-hidden="true">
                                    &rarr;
                                </span>
                            </button>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Home;