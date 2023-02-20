import React from 'react'
import EventCard from '../components/EventCardNew'
import Swift from '../assets/photos/upshots/swift.png'
import profilePic from '../assets/photos/profile.jpg'
import EventsData from "../assets/Events.json"
import ComingSoon from '../components/ComingSoon'

function KalaKrirti() {

  function registerNow(eventCode) {
    console.log('Register Now', eventCode)
  }

  function viewDetails(eventCode) {
    console.log('View Details', eventCode)
  }

  async function handleResposnse(eventCode, eventName) {
    // console.log(eventName, eventCode);

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const check = await fetch(serverURL + "/api/secure/event/check", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + currentUser["accessToken"],
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventCode, email }),
    });
    const response = await check.json();
    // console.log(response);

    setSelectedEventName(eventName);
    setSelectedEventCode(eventCode);

    if (response.type == "Warning") {
      if (response.message == "Profile") {
        navigate("/profile");
      } else if (response.message == "BuyPass") {
        navigate("/buypass");
      } else {
        toast(response.message, {
          icon: "⚠️",
        });
      }
    } else if (response.type == "Info") {
      toast(response.message, {
        icon: "👍🏻",
      });
    } else {
    }
    if (response.Category == "Solo") {
      setIsSoloOpen(true);
    } else if (response.Category == "Team") {
      setIsTeamOpen(true);
    }
    // closeModal()
  }

  return (
    // <>
    // </>
    <>
      <h1 className="font-heading text-center my-12 text-[2rem] font-extrabold bg-gradient-to-b from-primary-light-1 to-primary bg-clip-text text-transparent">
        KalaKrirti: Workshops
      </h1>
      {/* <ComingSoon /> */}
      <div className="max-w-[1200px] m-auto my-16 px-4 flex gap-16 flex-wrap justify-center items-center">
        {EventsData.kalakriti.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            // registerNow={handleResposnse}
            viewDetails={viewDetails}
          />
        ))}
      </div>
    </>
  )
}

export default KalaKrirti