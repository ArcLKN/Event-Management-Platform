import { useEffect } from 'react';

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
]

const date = new Date();

// Colors used for the creation of events.
// One is randomly chosen when creating an event.
// Dev: give the possibility to the user to choose the colors through buttons.
const colorPalette = [
	"#264653",
	"#2a9d8f",
	"#e9c46a",
	"#f4a261",
	"#e76f51",
	"#3992ff",
]

// Main function
// Render the table for the weeks, with the days and events.
function Createweek(calendarDate) {
	// Remove previous days when changing weeks.
	document.querySelectorAll('[class="weekDayContainer"]').forEach((e) => e.remove());
	// The date is relative to the position of the user.
	let day = calendarDate.getDay();
	for (let i = 0; i < 7; i++) {
		let proxyDate = new Date(calendarDate);
		// - day + i : so it always start with sunday, etc. Same order of days.
		proxyDate.setDate(calendarDate.getDate() - day + i)
		// Creating a bunch of div for day container.
		let mainview = document.getElementById("mainview");
		let newDayDiv = document.createElement("div");
		newDayDiv.classList.add("weekDayContainer");
		newDayDiv.setAttribute("id", days[proxyDate.getDay()]);
		let topDiv = document.createElement("div");
		topDiv.classList.add("weekDayTopContainer");
		let titleTopDiv = document.createElement("p");
		titleTopDiv.textContent = `${days[proxyDate.getDay()]} ${String(proxyDate.getDate())} ${months[proxyDate.getMonth()]}`;
		let bottomDiv = document.createElement("div");
		bottomDiv.classList.add("weekDayBotContainer");
		mainview.appendChild(newDayDiv);
		newDayDiv.appendChild(topDiv);
		topDiv.appendChild(titleTopDiv);
		newDayDiv.appendChild(bottomDiv);

		if (!sessionUser) {continue;}
		// Create the events by going through all of them.
		for (let eachEvent in sessionUser) {
			let thisEvent = sessionUser[eachEvent];
			let startDate = new Date(thisEvent['start']);
			let endDate = new Date(thisEvent['end']);
			// Verify if the dates correspond to the proxyDate.
			let isStartGood = (
				startDate.getFullYear() < proxyDate.getFullYear() ||
				startDate.getFullYear() == proxyDate.getFullYear() && startDate.getMonth() < proxyDate.getMonth() ||
				startDate.getFullYear() == proxyDate.getFullYear() && startDate.getMonth() == proxyDate.getMonth() &&  startDate.getDate() <= proxyDate.getDate()
			)
			let isEndGood = (
				proxyDate.getFullYear() < endDate.getFullYear() ||
				proxyDate.getFullYear() == endDate.getFullYear() && proxyDate.getMonth() < endDate.getMonth() ||
				proxyDate.getFullYear() == endDate.getFullYear() && proxyDate.getMonth() == endDate.getMonth() && proxyDate.getDate() <= endDate.getDate()
			)
			// If it is, shows the event.
			if ( isStartGood && isEndGood) {
				//console.log("Show event", thisEvent['name'])
				//console.log("At day", titleTopDiv.textContent)
				let eventContainer = document.createElement("div");
				eventContainer.classList.add("eventContainer");
				let flexBfDiv = document.createElement("div");
				flexBfDiv.classList.add("flexBfDiv");
				let flexAfDiv = document.createElement("div");
				flexAfDiv.classList.add("flexAfDiv");
				let newEventDiv = document.createElement("div");
				newEventDiv.setAttribute("id", "EventId"+thisEvent['id']);
				newEventDiv.classList.add("EventDiv");
				if (thisEvent['color']) {
					newEventDiv.style.backgroundColor = thisEvent['color'];}
				else {
					newEventDiv.style.backgroundColor = "#3992ff";
				}
				bottomDiv.append(eventContainer);
				eventContainer.append(flexBfDiv);
				eventContainer.append(newEventDiv);
				eventContainer.append(flexAfDiv);
				//console.log(startDate, endDate)
				//console.log(titleTopDiv.textContent, isStartGood, isEndGood, proxyDate.getDate() < endDate.getDate())
				// Depending on the position of the day relative to the event end date and start date, the event container will have different flexGrow values to correctly be rendered.
				if (
					proxyDate.getFullYear() < endDate.getFullYear() ||
					proxyDate.getFullYear() == endDate.getFullYear() && proxyDate.getMonth() < endDate.getMonth() ||
					proxyDate.getFullYear() == endDate.getFullYear() && proxyDate.getMonth() == endDate.getMonth() && proxyDate.getDate() < endDate.getDate()
				) {
					flexBfDiv.style.flexGrow = `${0}`;
					newEventDiv.style.flexGrow = `${24}`;
					flexAfDiv.style.flexGrow = `${0}`;
				} else if (
					startDate.getFullYear() < proxyDate.getFullYear() ||
					startDate.getFullYear() == proxyDate.getFullYear() && startDate.getMonth() < proxyDate.getMonth() ||
					startDate.getFullYear() == proxyDate.getFullYear() && startDate.getMonth() == proxyDate.getMonth() &&  startDate.getDate() < proxyDate.getDate()
				) {
					flexBfDiv.style.flexGrow = `${0}`;
					newEventDiv.style.flexGrow = `${endDate.getHours()}`;
					flexAfDiv.style.flexGrow = `${24 - endDate.getHours()}`;
				} else {
					flexBfDiv.style.flexGrow = `${startDate.getHours()}`;
					newEventDiv.style.flexGrow = `${endDate.getHours() - startDate.getHours()}`;
					flexAfDiv.style.flexGrow = `${24 - endDate.getHours()}`;
				}
				let newEventTitle = document.createElement("p");
				newEventTitle.classList.add("eventTitle");
				newEventTitle.textContent = thisEvent['name'];
				newEventDiv.appendChild(newEventTitle);

				let newEventDescription = document.createElement("p");
				newEventDescription.classList.add("eventDesc");
				newEventDescription.textContent = thisEvent['description'];
				newEventDiv.appendChild(newEventDescription);
			}
		}
	}
	return null;
}

// Handles the "Previous Week" button by calling create week to delete the old week and starting another one with the updated date.
const handlePreviousClick = () => {
    date.setDate(date.getDate() - 7);
	document.getElementById("ActualMonth").textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;
    Createweek(date);
}

// Handles the "Next Week" button
const handleNextClick = () => {
    date.setDate(date.getDate() + 7);
	document.getElementById("ActualMonth").textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;
    Createweek(date);
}

// Handles what happens when creating an event.
const handleSubmitNewEvent = async () => {
	event.preventDefault()
	let EventForm = document.forms["newEvent"];
	// Values of the new event.
	let formValues = {
		"name": EventForm.nameEvent.value,
		"description": EventForm.descEvent.value,
		"start": EventForm.startEvent.value,
		"end": EventForm.endEvent.value,
		"id": Math.floor(Math.random()*1000),
		"color": colorPalette[Math.floor(Math.random() * colorPalette.length)],
	}
	// Pushes the new event directly to the list of event so I don't have to re-call the user's events from the DB.
	sessionUser.push(formValues)
	// Updates the week with the new event.
	Createweek(date);
	// Send the new event to the database through node.
	await window.fetch('/api/newEvent', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formValues),
	});
}

let sessionUser = null;

export default function Root() {

	// Handles the Test Button action.
	// Do nothing.
	const handleClick = async () => {
			const data = await window.fetch('/api/edt')
			const json = await data.json()
			console.log(json);
	}

	// Calls this function when starting the page.
	// Defines the user events by fetching them through node and the mongoDB database.
	useEffect(() => {
		const initData = async () => {
			try {
				const response = await window.fetch('/api/edt');
				const json = await response.json();
				console.log("INIT JSON", json);
				if (!json) {return;}
				sessionUser = json['msg'];
				console.log("Session User", sessionUser);
				Createweek(date);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		initData();
		
		}, []); // Le tableau vide signifie que useEffect s'exécute une seule fois après le montage du composant
		
		// Base HTML
		return (
			<>
				<div id="sidebar">
					<h1>Event Management Platform</h1>
					<div>
						<form  id="search-form" role="search">
							<input
								id="q"
								aria-label="Search contacts"
								placeholder="Search"
								type="search"
								name="q"
							/>
							<div
								id="search-spinner"
								aria-hidden
								hidden={true}
							/>
							<div
								className="sr-only"
								aria-live="polite"
							></div>
						</form>
							<button onClick={handleClick}>Test</button>
					</div>
						
					<div id="eventCreator">
						<form name="newEvent" onSubmit={handleSubmitNewEvent}>
							<label>
								Nom de l'événement:
								<input
								name="nameEvent"
								type="text"
								required
								/>
							</label>
							<br />
							<label>
								Description:
								<textarea style={{resize:"none", height:"8em"}}
								name="descEvent"
								/>
							</label>
							<br />
							<label>
								Date de début:<br />
								<input
								name="startEvent"
								type="datetime-local"
								required
								/>
							</label>
							<br />
							<label>
								Date de fin:<br />
								<input
								name="endEvent"
								type="datetime-local"
								required
								/>
							</label>
							<br />
							<br />
							<button type="submit">Créer l'événement</button>
						</form>
					</div>
					<nav>
						<ul id="list">
						</ul>
					</nav>
				</div>
				<div id="detail">
					<div id="navbar">
						<button onClick={handlePreviousClick}>Previous</button>
						<p id="ActualMonth">{`${months[date.getMonth()]} ${date.getFullYear()}`}</p>
						<button onClick={handleNextClick}>Next</button>
					</div>
					<div id="mainview">
					</div>
				</div>
			</>
		);
	}

