import { useState, useEffect } from 'react';
import { CreateWeek } from '../components/createWeek';
import { EventForm } from '../components/eventForm';

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

const propEvents =  [{
	"name": "Slavery 2",
	"description": ".",
	"start": "2024-01-07T12:34",
	"end": "2024-05-01T14:40",
	"id": "1237652"
}]

function modifyEvent(eventId) {
	console.log("TEST MODIFY")
	let modifyModal = document.createElement("div");
	modifyModal.classList.add("modify-modal");
	let modifyModalContent = document.createElement("div");
	modifyModal.classList.add("modify-modal-content");
	let rootDiv = document.getElementById("root");
	rootDiv.appendChild(modifyModal);
	modifyModal.appendChild(modifyModalContent);

	const reactElement = <EventCreator EventCreatorName={'modifyEvent'} />;
  	ReactDOM.render(reactElement, modifyModalContent);

	let EventForm = document.forms["modifyEvent"];
	console.log(EventForm)
}

export default function Root() {

	const [date, setCalendarDate] = useState(new Date());
	const [sessionUser, setSessionUser] = useState([]);

	// Handles the "Previous Week" button by calling create week to delete the old week and starting another one with the updated date.
	const handlePreviousClick = () => {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() - 7);
		date.setDate(newDate);
		console.log(`${months[newDate.getMonth()]} ${newDate.getFullYear()}`)
		document.getElementById("ActualMonth").textContent = `${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
		setCalendarDate(newDate)
	}

	const handleDeleteEvent = async (event) => {
		// Send the new event to the database through node.
		setSessionUser(sessionUser.filter(e => e['id'] !== event['id']));
		const data = await window.fetch('/api/deleteEvent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(event),
		});
		
	}

	// Handles the "Next Week" button
	const handleNextClick = () => {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() + 7);
		date.setDate(newDate);
		document.getElementById("ActualMonth").textContent = `${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
		setCalendarDate(newDate)
	}
	
	// Handles what happens when creating an event.
	const handleSubmitNewEvent = async (event) => {
		event.preventDefault()
		let EventForm = document.forms["newEvent"];
		// Values of the new event.
		console.log("Forms", document.forms)
		console.log(EventForm)
		let formValues = {
			"name": EventForm.nameEvent.value,
			"description": EventForm.descEvent.value,
			"start": EventForm.startEvent.value,
			"end": EventForm.endEvent.value,
			"id": Math.random().toString(16).slice(2),
			"color": EventForm.eventColor.value,
		}
		// Pushes the new event directly to the list of event so I don't have to re-call the user's events from the DB.
		// Updates the week with the new event.
		setSessionUser(prevEvents => {
			// Crée une nouvelle copie de la liste des événements en ajoutant le nouvel événement
			const updatedEvents = [...prevEvents , formValues];
			// Met à jour la liste des événements
			return updatedEvents;
		});
		// Send the new event to the database through node.
		await window.fetch('/api/newEvent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formValues),
		});
	}


	// Handles the Test Button action.
	// Do nothing.
	/*
	const handleClick = async () => {
			const data = await window.fetch('/api/edt')
			const json = await data.json()
			console.log(json);
	}
	*/

	// Calls this function when starting the page.
	// Defines the user events by fetching them through node and the mongoDB database.
	useEffect(() => {
		const initData = async () => {
			try {
				const response = await window.fetch('/api/edt');
				const json = await response.json();
				console.log("INIT JSON", json);
				if (!json) {
					setSessionUser(propEvents);
					return;}
				setSessionUser(json['msg']);
				console.log("Session User", sessionUser);
			} catch (error) {
				console.error("Error fetching data:");
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
					
				</div>
					<EventForm EventCreatorName='newEvent' handleSubmitEvent={handleSubmitNewEvent}/>
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
					<CreateWeek calendarDate={date} events={sessionUser ? sessionUser : propEvents } DeleteEvent={handleDeleteEvent}/>
				</div>
			</div>
		</>
	);
}