const closedEvents = [
	// "IN_AA",
	// "IN_ST",
	// "SW_TH",
	// "SW_RD",
	// "SW_IPL",
	// "SW_SG",
	// "SW_BGMI",
	// "SW_FF",
	// "SW_V",
	// "SW_SOM",
	// "SW_MM",
	// "SW_BBS",
	// "SW_ER"
]

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

async function getEvents(conn, participantID) {
	const [soloRows, soloFields] = await conn.execute(
		`select * from Events inner join SoloRegistration on Events.EventCode = SoloRegistration.EventCode where SoloRegistration.ParticipantID = '${participantID}'`
	);
	const [teamRows, teamFields] = await conn.execute(
		`select * from Events inner join Teams inner join TeamRegistration on Teams.TeamID = TeamRegistration.TeamID and Events.EventCode = Teams.EventCode where TeamRegistration.ParticipantID = '${participantID}'`
	);

	if (soloRows.length > 0 || teamRows.length > 0) {
		return {
			code: 200,
			resMessage: {
				message: "Information Fetch complete...",
				data: {
					solo: soloRows,
					team: teamRows,
				},
				type: "success",
			},
		};
	} else {
		return {
			code: 500,
			resMessage: {
				message: "Failed",
				type: "error",
			},
		};
	}
}

async function getTeamMembers(conn, teamID) {
	const [rows, fields] = await conn.execute(
		`select par.ParticipantID, par.Firstname, par.Lastname, tr.Role from Participants as par inner Join TeamRegistration as tr on tr.ParticipantID = par.ParticipantID  where tr.TeamID = '${teamID}'`
	);

	if (rows.length > 0) {
		return {
			code: 200,
			resMessage: {
				message: "Members Found",
				data: rows,
				type: "success",
			},
		};
	} else {
		return {
			code: 500,
			resMessage: {
				message: "Failed",
				type: "error",
			},
		};
	}
}

// Remove Team Member
async function removeTeamMember(conn, participantID, teamID) {
	const [rows, fields] = await conn.execute(
		`DELETE FROM TeamRegistration WHERE ParticipantID = '${participantID}' and TeamID = '${teamID}'`
	);
	const eventID = teamID.split("_")[0] + "_" + teamID.split("_")[1];
	const isUpdateRegCount = await updateRegCount(
		conn,
		eventID,
		participantID,
		"dec"
	);
	const isupdateEventRegCount = await updateEventRegistrationCount(
		conn,
		eventID,
		"dec"
	);

	if (rows && isUpdateRegCount && isupdateEventRegCount) {
		return {
			code: 200,
			resMessage: {
				message: "Member Removed",
				type: "success",
			},
		};
	} else {
		return {
			code: 500,
			resMessage: {
				message: "Failed",
				type: "error",
			},
		};
	}
}

async function updateEventRegistrationCount(conn, eventCode, option) {
	const [rows, fields] = await conn.execute(
		`SELECT TotalRegistration FROM Events where EventCode = '${eventCode}'`
	);

	if (rows.length > 0) {
		let total = rows[0].TotalRegistration;

		console.log("Total Registration before: " + total);

		if (option == "inc") {
			total++;
		} else if (option == "dec") {
			total--;
		}

		console.log("Total Registration after: " + total);
		const [updateRows, updateFields] = await conn.execute(
			`update Events set TotalRegistration = ${total} where EventCode = "${eventCode}"`
		);

		if (updateRows) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

async function deleteEvent(
	conn,
	participantID,
	eventCode,
	isSolo,
	role,
	teamID
) {
	if (isSolo) {
		const [deleteRows, deleteFields] = await conn.execute(
			`DELETE FROM SoloRegistration WHERE EventCode = '${eventCode}' and ParticipantID = '${participantID}'`
		);
		const isEventRegCount = await updateEventRegistrationCount(
			conn,
			eventCode,
			"dec"
		);
		const isUpdateRegCount = await updateRegCount(
			conn,
			eventCode,
			participantID,
			"dec"
		);

		if (deleteRows && isEventRegCount && isUpdateRegCount) {
			return {
				code: 200,
				resMessage: {
					type: "success",
					message: "Event Unregistration Complete...",
					category: "Solo",
				},
			};
		} else {
			return {
				code: 500,
				resMessage: {
					type: "error",
					message: "Event Unregisteration Failed...",
					category: "Solo",
				},
			};
		}
	} else {
		const [deleteRows, deleteFields] = await conn.execute(
			`DELETE FROM TeamRegistration WHERE TeamID = '${teamID}' and ParticipantID = '${participantID}'`
		);

		if (deleteRows) {
			if (role == "Leader") {
				console.log("Team Leader Things under process...");
				const [membersRows, membersFields] = await conn.execute(
					`select * FROM TeamRegistration WHERE TeamID = '${teamID}' and Role = 'Member'`
				);

				let count = 0;
				console.log("Team Member removal starts...");
				console.log(membersRows.length);
				console.log(membersRows);

				membersRows.forEach(async (element) => {
					console.log(element.ParticipantID);
					console.log("Team Member Delete processing...");
					console.log("EventCode: " + eventCode);
					let [deleteMemberRow, deleteMemberFields] =
						await conn.execute(
							`DELETE FROM TeamRegistration where ParticipantID = '${element.ParticipantID}'`
						);
					console.log(deleteMemberRow);
					if (
						deleteMemberRow &&
						(await updateRegCount(
							conn,
							eventCode,
							element.ParticipantID,
							"dec"
						)) &&
						(await updateEventRegistrationCount(
							conn,
							eventCode,
							"dec"
						))
					) {
						console.log("Team Member Delete Complete.");
						count++;
					}
					console.log("Ashish Done here.");
				});
				console.log(count);

				const [deleteTeamRows, deleteTeamFields] = await conn.execute(
					`DELETE FROM Teams WHERE TeamID = '${teamID}'`
				);
				if (deleteTeamRows) {
					if (
						(await updateRegCount(
							conn,
							eventCode,
							participantID,
							"dec"
						)) &&
						(await updateEventRegistrationCount(
							conn,
							eventCode,
							"dec"
						))
					) {
						console.log("Participant events count updated...");
						return {
							code: 200,
							resMessage: {
								type: "success",
								message: "Team Unregistered Successfully...",
								category: "Team",
							},
						};
					}
				}
			}
			if (await updateRegCount(conn, eventCode, participantID, "dec")) {
				return {
					code: 200,
					resMessage: {
						type: "success",
						message: "Unregisteration Complete...",
						category: "Team",
					},
				};
			}
		} else {
			return {
				code: 500,
				resMessage: {
					type: "error",
					message: "Unregisteration Failed...",
					category: "Team",
				},
			};
		}
	}
}

// =========================== Validating the Selected Event ===========================

async function checkEvent(conn, eventCode, participantID) {

	if (closedEvents.includes(eventCode)) {
		return {
			code: 500,
			message: "Registration Will Open Soon",
			type: "Info",
		};
	}

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
	if (checkSoloRegRows.length > 0 || checkTeamRegRows[0]["count"] > 0) {
		return {
			code: 200,
			message: "You have Already Registered in this Event",
			type: "Info",
		};
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
				return {
					code: 200,
					message: "EventLimitReached",
					type: "Warning",
				};
			}
		} else if (["KK"].includes(eventCode.substring(0, 2))) {
			if (passRows[0]["WorkshopsLimit"] <= parRows[0]["TotalWorkshops"]) {
				return {
					code: 200,
					message: "WorkshopsLimitReached",
					type: "Warning",
				};
			}
		} else if (["EQ"].includes(eventCode.substring(0, 2))) {
			if (passRows[0]["GuestsLimit"] <= parRows[0]["TotalGuests"]) {
				return {
					code: 200,
					message: "GuestsLimitReached",
					type: "Warning",
				};
			}
		}

		// Checking Vacancy

		// Check whether the event is Solo or Team...
		if (checkEventRows[0]["HeadCount"] == 1) {
			// Response - For Solo Category...
			if (
				checkEventRows[0]["TotalRegistration"] <
				checkEventRows[0]["MaxRegistration"]
			) {
				return {
					code: 200,
					message: "RegisterNow",
					type: "success",
					eventType: checkEventRows[0]["EventType"],
					Category: "Solo",
				};
			} else {
				// Response - Event Vacancy is Full...
				return { code: 200, message: "VacancyFull", type: "Warning" };
			}
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
		// Response - No Such Event Exists...
		return { code: 200, message: "NoRecordFound", type: "Warning" };
	}
}

// +++++++++++++++++++ Check Registration Limits Ends +++++++++++++++++++++

// =========================== Registration Count Update +1 Starts ===========================

async function updateRegCount(conn, eventCode, participantID, option) {
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

		console.log("EventCount before: " + eventsCount);

		// Increment the value of variable according to the category.
		if (["IN", "SW"].includes(eventCode.substring(0, 2))) {
			option == "inc" ? eventsCount++ : eventsCount--;
		} else if (["KK"].includes(eventCode.substring(0, 2))) {
			option == "inc" ? workshopsCount++ : workshopsCount--;
		} else if (["EQ"].includes(eventCode.substring(0, 2))) {
			option == "inc" ? guestsCount++ : guestsCount--;
		}

		console.log("EventCount After: " + eventsCount);

		// Update Query
		const [updateParRows, updateParFields] = await conn.execute(
			`UPDATE Participants SET TotalEvents = ${eventsCount}, TotalWorkshops = ${workshopsCount}, TotalGuests = ${guestsCount} WHERE ParticipantID = '${participantID}'`
		);

		// Return if Updated Successfully...
		if (updateParRows) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
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

	if (closedEvents.includes(eventCode)) {
		return {
			code: 500,
			message: "Registration Will Open Soon",
			type: "info",
		};
	}

	const date = new Date(
		new Date().toLocaleString("en-us", {
			timeZone: "Asia/Calcutta",
		})
	);
	const timestamp = `${date.getFullYear()}-${(
		"0" +
		(date.getMonth() + 1)
	).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
		"0" + date.getHours()
	).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
		"0" + date.getSeconds()
	).slice(-2)}`;

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
			`INSERT INTO SoloRegistration (ParticipantID, EventCode, Timestamp) VALUES ('${participantID}', '${eventCode}', '${timestamp}')`
		);

		if (soloRegisterRows) {
			if (
				(await updateRegCount(conn, eventCode, participantID, "inc")) &&
				(await updateEventRegistrationCount(conn, eventCode, "inc"))
			) {
				return {
					code: 200,
					message: "Registration Successful...",
					type: "success",
				};
			}

			return {
				code: 500,
				message: "RegistrationCountNotUpdated",
				type: "error",
			};
		}
		return { code: 500, message: "SQL Insert Error", type: "error" };
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
		console.log(no);
		let teamNo = "";
		if (0 < no && no <= 9) {
			teamNo = "00" + no;
		} else if (9 < no && no <= 99) {
			teamNo = "0" + no;
		} else if (99 < no && no <= 999) {
			teamNo = "" + no + "";
		}
		teamID = eventCode + "_" + teamNo;

	} else {
		teamID = eventCode + "_" + "001";
	}

	console.log(teamID)

	return teamID;
}

// =========================== Generate TeamID Ends ===========================

// =========================== Create Team Starts ===========================

async function createTeam(conn, eventCode, participantID, teamName) {

	if (closedEvents.includes(eventCode)) {
		return {
			code: 500,
			message: "Registration Will Open Soon",
			type: "Info",
		};
	}

	const date = new Date(
		new Date().toLocaleString("en-us", {
			timeZone: "Asia/Calcutta",
		})
	);
	const timestamp = `${date.getFullYear()}-${(
		"0" +
		(date.getMonth() + 1)
	).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
		"0" + date.getHours()
	).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
		"0" + date.getSeconds()
	).slice(-2)}`;

	const [checkTeamRows, checkTeamFields] = await conn.execute(
		`SELECT Count(TeamName) as count from Teams where TeamName = '${teamName}'`
	);

	const [eventRow, eventFields] = await conn.execute(
		`SELECT * FROM Events WHERE EventCode = '${eventCode}'`
	);

	console.log(eventRow.length);
	console.log(eventRow[0]);

	if (checkTeamRows[0]["count"] > 0) {
		return {
			code: 500,
			message: "Team Already Exists...",
			type: "error",
		};
	} else if (
		eventRow.length > 0 &&
		eventRow[0].TotalRegistration >= eventRow[0].MaxRegistration
	) {
		return {
			code: 500,
			message:
				"This Event Registrations is at its peak.\nPlease continue registering in another event of your interest",
			type: "error",
		};
	} else {
		const teamID = await genTeamID(conn, eventCode);
		console.log(teamID);

		const [insertTeamRows, insertTeamFields] = await conn.execute(
			`INSERT INTO Teams (TeamID, TeamName, EventCode, Timestamp) VALUES ('${teamID}', '${teamName}', '${eventCode}', '${timestamp}')`
		);

		if (insertTeamRows) {
			const [insertParRows, insertParFields] = await conn.execute(
				`INSERT INTO TeamRegistration (TeamID, ParticipantID, Role, Timestamp) VALUES ('${teamID}', '${participantID}', 'Leader', '${timestamp}')`
			);

			if (insertParRows) {
				// Update Registration Count
				if (
					(await updateRegCount(
						conn,
						eventCode,
						participantID,
						"inc"
					)) &&
					(await updateEventRegistrationCount(conn, eventCode, "inc"))
				) {
					return {
						code: 200,
						message: "Team Created Successfully...",
						type: "success",
						teamID: teamID,
						teamName: teamName,
						mailStatus: "",
					};
				}

				return {
					code: 500,
					message: "Registration Count Not Updated",
					type: "error",
				};
			}
			return {
				code: 500,
				message: "Team ParNotRegistered",
				type: "error",
			};
		}
		return { code: 500, message: "Tream Creation Failed", type: "error" };
	}
}

// =========================== Create Team Ends ===========================

// =========================== Join Team Starts ===========================

async function joinTeam(conn, eventCode, participantID, teamID) {

	if (closedEvents.includes(eventCode)) {
		return {
			code: 500,
			message: "Registration Will Open Soon",
			type: "Info",
		};
	}

	const date = new Date(
		new Date().toLocaleString("en-us", {
			timeZone: "Asia/Calcutta",
		})
	);
	const timestamp = `${date.getFullYear()}-${(
		"0" +
		(date.getMonth() + 1)
	).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
		"0" + date.getHours()
	).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
		"0" + date.getSeconds()
	).slice(-2)}`;

	const [checkTeamExistRows, checkTeamExistFields] = await conn.execute(
		`SELECT Count(TeamID) as count FROM Teams WHERE TeamID = '${teamID}' and EventCode = '${eventCode}'`
	);

	if (checkTeamExistRows[0]["count"] > 0) {
		const [countRows, countFields] = await conn.execute(
			`select count(TeamID) as count from TeamRegistration where TeamID = '${teamID}'`
		);

		const [headCountRows, headCountFields] = await conn.execute(
			`SELECT HeadCount FROM Events WHERE EventCode = '${eventCode}'`
		);

		if (countRows.length > 0 && headCountRows.length > 0) {
			if (countRows[0].count >= headCountRows[0].HeadCount) {
				return {
					code: 200,
					message:
						"You Can't Join!!\nMaximum Capacity of Team reached...",
					type: "error",
				};
			}
		}

		console.log(
			`SELECT Count(RegisterID) AS Count FROM TeamRegistration WHERE TeamID LIKE '${eventCode}%' AND ParticipantID = '${participantID}'`
		);
		const [checkExistRows, checkExistFields] = await conn.execute(
			`SELECT Count(RegisterID) AS Count FROM TeamRegistration WHERE TeamID LIKE '${eventCode}%' AND ParticipantID = '${participantID}'`
		);

		if (checkExistRows[0]["Count"] > 0) {
			return { code: 200, message: "AlreadyRegistered", type: "error" };
		} else {
			const [insertTRRows, insertTRFields] = await conn.execute(
				`INSERT INTO TeamRegistration (TeamID, ParticipantID, Role, Timestamp) VALUES ('${teamID}', '${participantID}', 'Member', '${timestamp}')`
			);

			if (insertTRRows) {
				// Update Registration Count
				if (
					(await updateRegCount(
						conn,
						eventCode,
						participantID,
						"inc"
					)) == true
				) {
					return {
						code: 200,
						message: "Team Registration Complete",
						type: "success",
					};
				}

				return {
					code: 500,
					message: "RegistrationCountNotUpdated",
					type: "error",
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
		const [parNameRows, parNameFields] = await conn.execute(
			`select Firstname, Lastname from Participants where ParticipantID = '${checkTeamExistRows[0].ParticipantID}'`
		);

		if (parNameRows.length > 0) {
			return {
				code: 200,
				resMessage: {
					type: "success",
					message: "Information fetched successfully",
					teamName: checkTeamExistRows[0].TeamName,
					teamLeader:
						parNameRows[0].Firstname +
						" " +
						parNameRows[0].Lastname,
				},
			};
		} else {
			return {
				code: 500,
				resMessage: {
					type: "error",
					message: "Information fetched successfully",
					teamName: checkTeamExistRows[0].TeamName,
					teamLeader: "Not Found",
				},
			};
		}
	} else {
		return {
			code: 500,
			resMessage: {
				type: "error",
				message: "Team Not Found...",
			},
		};
	}
}

// Exporting All Modules...
module.exports = {
	checkEvent,
	registerSoloEvent,
	createTeam,
	joinTeam,
	getTeamInfo,
	getEvents,
	deleteEvent,
	getTeamMembers,
	removeTeamMember,
};
