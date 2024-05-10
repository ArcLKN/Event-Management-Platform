import { useState, useEffect } from 'react';
//import weekDay from './component/weekDay';

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

let propEvents = [
	{
		"id": 1,
		"name": "Slavery",
		"description": "Coding until we die.",
		"start": "2024-05-09T19:34",
		"end": "2024-05-09T23:40",
	},
    {
		"id": 2,
        "name": "Slavery 2",
        "description": ".",
        "start": "2024-01-07T12:34",
        "end": "2024-05-01T14:40",
    }
]

function Createweek(calendarDate) {
	document.querySelectorAll('[class="weekDayContainer"]').forEach((e) => e.remove());
	let day = calendarDate.getDay();
	for (let i = 0; i < 7; i++) {
		let proxyDate = new Date(calendarDate);
		proxyDate.setDate(calendarDate.getDate() - day + i)
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

		if (!sessionUser) {return;}
		for (let eachEvent in sessionUser) {
			let thisEvent = sessionUser[eachEvent];
			let startDate = new Date(thisEvent['start']);
			let endDate = new Date(thisEvent['end']);

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
				bottomDiv.append(eventContainer);
				eventContainer.append(flexBfDiv);
				eventContainer.append(newEventDiv);
				eventContainer.append(flexAfDiv);
				//console.log(startDate, endDate)
				console.log(titleTopDiv.textContent, isStartGood, isEndGood, proxyDate.getDate() < endDate.getDate())
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
	return null; // Ce composant ne rend rien visuellement
}

const handlePreviousClick = () => {
    date.setDate(date.getDate() - 7);
	document.getElementById("ActualMonth").textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;
    Createweek(date);
}

const handleNextClick = () => {
    date.setDate(date.getDate() + 7);
	document.getElementById("ActualMonth").textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;
    Createweek(date);
}

const handleSubmitNewEvent = async () => {
	event.preventDefault()
	console.log("FORM")
	let EventForm = document.forms["newEvent"];
	let formValues = {
		"name": EventForm.nameEvent.value,
		"description": EventForm.descEvent.value,
		"start": EventForm.startEvent.value,
		"end": EventForm.endEvent.value,
		"id": Math.floor(Math.random()*1000),
	}
	sessionUser.push(formValues)
	console.log(sessionUser);
	Createweek(date);
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

		const handleClick = async () => {
				console.log("Click");
				let nameList = document.getElementById("list");
				let newElement = document.createElement("li")
				let newA = document.createElement("a");
				const data = await window.fetch('/api/edt')
				const json = await data.json()
				console.log(json);
		}

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

