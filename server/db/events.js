// Check Profile Status
async function checkProfileStatus(conn, participantID) {
  const [rows, fields] = await conn.execute(
    `SELECT ProfileStatus FROM Participants WHERE ParticipantID = '${participantID}'`
  );
  if (rows.length > 0) {
    if (rows[0]["ProfileStatus"] == 1) {
      return true;
    }
    return false;
  }
  return false;
}

// Check Profile Status
async function checkPaymentStatus(conn, participantID) {
  const [rows, fields] = await conn.execute(
    `SELECT TxnStatus FROM Participants WHERE ParticipantID = '${participantID}'`
  );
  if (rows.length > 0) {
    if (rows[0]["TxnStatus"] == "TXN_SUCCESS") {
      return true;
    }
    return false;
  }
  return false;
}


// =========================== Validating the Selected Event ===========================

async function checkEvent(conn, eventCode, participantID) {

  // Check Profile
  if ((await checkProfileStatus(conn, participantID)) == false) {
    return { code: 200, message: "Profile", type: "Warning" };
  }
  
  // Check PaymentStatus
  if ((await checkPaymentStatus(conn, participantID)) == false) {
    return { code: 200, message: "BuyPass", type: "Warning" };
  }

  // Schedule code...


  // +++++++++++++++++++  Already Registered Starts +++++++++++++++++++++

  /*
  
  If the Participant is already registered in specific Event, Guest lecture or Workshop, then he/she can't register in that.

  Other Scenario also need to be consider given below...

  */

  // Already Registered - Solo
  const [checkSoloRegRows, checkSoloRegFields] = await conn.execute(
    `SELECT * FROM SoloRegistration WHERE EventCode = '${eventCode}' AND ParticipantID = '${participantID}'`
  );

  // Already Registered - Team
  const [checkTeamRegRows, checkTeamRegFields] = await conn.execute(
    `SELECT COUNT(RegisterID) AS count FROM TeamRegistration WHERE TeamID LIKE '${eventCode}%' AND ParticipantID = '${participantID}'`
  );

  // Checking If Already Registered in either Solo or Team Event...
  if (checkSoloRegRows.length > 0 || checkTeamRegRows[0]['count'] > 0) {
    return { code: 200, message: "You have Already Registered in this Event", type: "Info" };
  }

  // +++++++++++++++++++  Already Registered Ends  +++++++++++++++++++++


  // +++++++++++++++++++ Check Registration Limits Starts +++++++++++++++++++++

  
  const [parRows, parFields] = await conn.execute(
    `SELECT * FROM Participants WHERE ParticipantID = '${participantID}'`
  );

  const [checkEventRows, checkEventFields] = await conn.execute(
    `SELECT * FROM Events WHERE EventCode = '${eventCode}'`
  );

  /* 
    Check Criteria:

    1. Events Category includes INERTIA('IN'), SWOOSH('SW')
    2. Guests Category includes INERTIA('EQ')
    3. Workshops Category includes INERTIA('IN')

    If total registration of above categories of Participant is less than that of Pass which he/she bought, then and then he/she are eligible to register for event.

    And also whether the Event vacancy is Full or not.
    If Full, the one is not allow to register
    else, yes.

    Other Scenario also need to be consider given below...

    */

  if (checkEventRows.length > 0 && parRows.length > 0) {
    const [passRows, passFields] = await conn.execute(
      `SELECT * FROM Passes WHERE PassCode = (SELECT PassCode FROM Participants WHERE ParticipantID = '${participantID}')`
    );

    if (["IN", "SW"].includes(eventCode.substring(0, 2))) {
      if (passRows[0]["EventsLimit"] <= parRows[0]["TotalEvents"]) {
        return { code: 200, message: "EventLimitReached", type: "Warning" };
      }
    } else if (["KK"].includes(eventCode.substring(0, 2))) {
      if (passRows[0]["WorkshopsLimit"] <= parRows[0]["TotalWorkshops"]) {
        return { code: 200, message: "WorkshopsLimitReached", type: "Warning" };
      }
    } else if (["EQ"].includes(eventCode.substring(0, 2))) {
      if (passRows[0]["GuestsLimit"] <= parRows[0]["TotalGuests"]) {
        return { code: 200, message: "GuestsLimitReached", type: "Warning" };
      }
    }

    // Checking Vacancy
    if (
      checkEventRows[0]["TotalRegistration"] <
      checkEventRows[0]["MaxRegistration"]
    ) {

      // Check whether the event is Solo or Team...
      if (checkEventRows[0]["HeadCount"] == 1) {

        // Response - For Solo Category...
        return {
          code: 200,
          message: "RegisterNow",
          type: "success",
          eventType: checkEventRows[0]["EventType"],
          Category: "Solo",
        };
      } else {

        // Response - For Team Category...
        return {
          code: 200,
          message: "RegisterNow",
          type: "success",
          eventType: checkEventRows[0]["EventType"],
          Category: "Team",
        };
      }
    } else {

      // Response - Event Vacancy is Full...
      return { code: 200, message: "VacancyFull", type: "Warning" };
    }
  } else {

    // Response - No Such Event Exists...
    return { code: 200, message: "NoRecordFound", type: "Warning" };
  }

  // +++++++++++++++++++ Check Registration Limits Ends +++++++++++++++++++++

}

// =========================== Validating the Selected Event ===========================


// =========================== Registration Count Update +1 Starts ===========================

async function updateRegCount(conn, eventCode, participantID) {

  /* 

  As soon as event participant is registered, we need to increment the values in TotalEvents, TotalGuest, and TotalWorkshops in Participants to know the total count of the participants.

  Logic:
  1. Fetching Old values of 'TotalEvents', 'TotalGuests' and 'TotalWorkshops' from the `Participants` table.
  2. Increment the value of either of the category according to the 'EventCode' and update the value of variable.
  3. Update the respective fields of `Participants` table in database. 

  */

  // Fetch Query.
  const [parRows, parFields] = await conn.execute(
    `SELECT TotalEvents, TotalWorkshops, TotalGuests FROM Participants WHERE ParticipantID = '${participantID}'`
  );

  if (parRows.length > 0) {

    // Variable of the event, guest and workshops which hold the old value of the participants.
    let eventsCount = parRows[0]["TotalEvents"];
    let workshopsCount = parRows[0]["TotalWorkshops"];
    let guestsCount = parRows[0]["TotalGuests"];

    // Increment the value of variable according to the category.
    if (["IN", "SW"].includes(eventCode.substring(0, 2))) {
      eventsCount += 1;
    } else if (["KK"].includes(eventCode.substring(0, 2))) {
      workshopsCount += 1;
    } else if (["EQ"].includes(eventCode.substring(0, 2))) {
      guestsCount += 1;
    }


    // Update Query
    const [updateParRows, updateParFields] = await conn.execute(
      `UPDATE Participants SET TotalEvents = ${eventsCount}, TotalWorkshops = ${workshopsCount}, TotalGuests = ${guestsCount} WHERE ParticipantID = '${participantID}'`
    );
    
    // Return if Updated Successfully...
    if (updateParRows) {
      return true;
    }
    return false;
  }

  return false;
}

// =========================== Registration Count Update +1 Ends ===========================

// =========================== Solo Registration Starts ===========================

async function registerSoloEvent(conn, eventCode, participantID) {

  /*

  Registration of Solo Event
  
  Logic:
  1. Check whether the participant already registered in that event of not
  2. If Registered, will return the already registered message.
  3. Else, will Insert the Record in `SoloRegistration` table.
  4. Update the 'TotalEventCount' and other in Participant Table by calling ->updateRegCount()<- function.

  */

  // Checking 
  const [checkRegRows, checkRegFields] = await conn.execute(
    `SELECT * FROM SoloRegistration WHERE EventCode = '${eventCode}' AND ParticipantID = '${participantID}'`
  );

  if (checkRegRows.length > 0) {
    console;
    return { code: 200, message: "Already Registered", type: "success" };
  } else {
    //insert into
    const [soloRegisterRows, soloRegisterFields] = await conn.execute(
      `INSERT INTO SoloRegistration (ParticipantID, EventCode) VALUES ('${participantID}', '${eventCode}')`
    );

    if (soloRegisterRows) {
      if ((await updateRegCount(conn, eventCode, participantID)) == true) {
        return { code: 200, message: "Registration Complete...", type: "success" };
      }

      return {
        code: 500,
        message: "RegistrationCountNotUpdated",
        type: "error",
      };
    }
    return { code: 500, message: "SQL insert error", type: "error" };
  }
}

// =========================== Solo Registration Ends  ===========================

// =========================== Generate TeamID Starts ===========================

async function genTeamID(conn, eventCode) {
  let teamID = "";

  const [fetchTeamsRows, fetchTeamsFields] = await conn.execute(
    `SELECT * FROM Teams WHERE EventCode = '${eventCode}' order by TeamID desc`
  );

  if (fetchTeamsRows.length > 0) {
    const no = parseInt(fetchTeamsRows[0]["TeamID"].split("_")[2]) + 1;
    let teamNo = "";
    if (0 < teamNo < 10) {
      teamNo = "00" + no;
    } else if (9 < teamNo < 100) {
      teamNo = "0" + no;
    }
    teamID = eventCode + "_" + teamNo;
  } else {
    teamID = eventCode + "_" + "001";
  }

  return teamID;
}

// =========================== Generate TeamID Ends ===========================

// =========================== Create Team Starts ===========================

async function createTeam(conn, eventCode, participantID, teamName) {
  const [checkTeamRows, checkTeamFields] = await conn.execute(
    `SELECT Count(TeamName) as count from Teams where TeamName = '${teamName}'`
  );

  if (checkTeamRows[0]["count"] > 0) {
    return { code: 200, message: "Team Already Exists...", type: "Warning" };
  } else {
    const teamID = await genTeamID(conn, eventCode);
    console.log(teamID);

    const [insertTeamRows, insertTeamFields] = await conn.execute(
      `INSERT INTO Teams (TeamID, TeamName, EventCode) VALUES ('${teamID}', '${teamName}', '${eventCode}')`
    );

    if (insertTeamRows) {
      const [insertParRows, insertParFields] = await conn.execute(
        `INSERT INTO TeamRegistration (TeamID, ParticipantID, Role) VALUES ('${teamID}', '${participantID}', 'Leader')`
      );

      if (insertParRows) {
        // Update Registration Count
        if ((await updateRegCount(conn, eventCode, participantID)) == true) {
          return { code: 200, message: "Team Created Successfully...", type: "success", teamID: teamID, teamName: teamName, mailStatus: ""};
        }

        return {
          code: 500,
          message: "RegistrationCountNotUpdated",
          type: "error",
        };
      }
      return { code: 500, message: "Team ParNotRegistered", type: "error" };
    }
    return { code: 500, message: "Tream Creation Failed", type: "error" };
  }
}

// =========================== Create Team Ends ===========================

// =========================== Join Team Starts ===========================

async function joinTeam(conn, eventCode, participantID, teamID) {
  const [checkTeamExistRows, checkTeamExistFields] = await conn.execute(
    `SELECT Count(TeamID) as count FROM Teams WHERE TeamID = '${teamID}' and EventCode = '${eventCode}'`
  );

  if (checkTeamExistRows[0]["count"] > 0) {

    console.log(`SELECT Count(RegisterID) AS Count FROM TeamRegistration WHERE TeamID LIKE '${eventCode}%' AND ParticipantID = '${participantID}'`)
    const [checkExistRows, checkExistFields] = await conn.execute(
      `SELECT Count(RegisterID) AS Count FROM TeamRegistration WHERE TeamID LIKE '${eventCode}%' AND ParticipantID = '${participantID}'`
    );

    if (checkExistRows[0]["Count"] > 0) {
      return { code: 200, message: "AlreadyRegistered", type: "error" };
    } else {
      const [insertTRRows, insertTRFields] = await conn.execute(
        `INSERT INTO TeamRegistration (TeamID, ParticipantID, Role) VALUES ('${teamID}', '${participantID}', 'Member')`
      );

      if (insertTRRows) {
        // Update Registration Count
        if ((await updateRegCount(conn, eventCode, participantID)) == true) {
          return { code: 200, message: "Team Registration Complete", type: "success" };
        }

        return { code: 500, message: "RegistrationCountNotUpdated", type: "error",
        };
      }
      return { code: 500, message: "Team not joined", type: "error" };
    }
  }
  return { code: 500, message: "Team not found...", type: "error" };
}

// =========================== Join Team Ends ===========================


async function getTeamInfo(conn, teamID) {
  const [checkTeamExistRows, checkTeamExistFields] = await conn.execute(
    `select Teams.TeamName, TeamRegistration.ParticipantID from Teams inner join TeamRegistration on Teams.TeamID = TeamRegistration.TeamID where Teams.TeamID="${teamID}" and TeamRegistration.Role = 'Leader';`
  );

  if (checkTeamExistRows.length > 0) {
    const [parNameRows, parNameFields] = await conn.execute(`select Firstname, Lastname from Participants where ParticipantID = '${checkTeamExistRows[0].ParticipantID}'`);

    if (parNameRows.length > 0) {
      return {
        code : 200,
        resMessage : {
          type: "success",
          message: "Information fetched successfully",
          teamName: checkTeamExistRows[0].TeamName,
          teamLeader: parNameRows[0].Firstname+" "+parNameRows[0].Lastname
        }
      }
    } else {
      return {
        code : 500,
        resMessage : {
          type: "error",
          message: "Information fetched successfully",
          teamName: checkTeamExistRows[0].TeamName,
          teamLeader: "Not Found"
        }
      }
    }
  } else {
    return {
      code : 500,
      resMessage : {
        type: "error",
        message: "Team Not Found...",
      }
    }
  }
}





// Exporting All Modules...
module.exports = {
  checkEvent,
  registerSoloEvent,
  createTeam,
  joinTeam,
  getTeamInfo
};
