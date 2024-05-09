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

function Createweek(calendarDate) {
	console.log("RUN")
	let day = calendarDate.getDay();
	console.log(calendarDate)
	for (let i = 0; i < 7; i++) {
		let proxyDate = new Date(calendarDate);
		proxyDate.setDate(calendarDate.getDate() - day + i)
		console.log("Calendar", calendarDate)
		console.log(i, proxyDate)
		let mainview = document.getElementById("mainview");
		let newDayDiv = document.createElement("div");
		newDayDiv.classList.add("weekDayContainer");
		newDayDiv.setAttribute("id", days[proxyDate.getDay()]);
		let topDiv = document.createElement("div");
		topDiv.classList.add("weekDayTopContainer");
		let titleTopDiv = document.createElement("p");
		titleTopDiv.textContent = `${days[proxyDate.getDay()]} ${String(proxyDate.getDate())} ${months[proxyDate.getMonth()]}`;
		console.log(titleTopDiv.textContent)
		let bottomDiv = document.createElement("div");
		bottomDiv.classList.add("weekDayBotContainer");
		mainview.appendChild(newDayDiv);
		newDayDiv.appendChild(topDiv);
		topDiv.appendChild(titleTopDiv);
		newDayDiv.appendChild(bottomDiv);
	}
	return null; // Ce composant ne rend rien visuellement
}


export default function Root() {

		const handleClick = async () => {
				console.log("Click");
				let nameList = document.getElementById("list");
				let newElement = document.createElement("li")
				let newA = document.createElement("a");
				const data = await window.fetch('/api/edt')
				const json = await data.json()
				console.log(json);
				newA.textContent = json['msg'] || "Error";
				nameList.appendChild(newElement);
				newElement.appendChild(newA);
		}

		useEffect(() => {
			Createweek(date);
				const initData = async () => {
					try {
						const response = await window.fetch('/api/init');
						const json = await response.json();
						console.log(json);
						let nameList = document.getElementById("list");
						json.forEach(user => {
								let newElement = document.createElement("li")
								let newA = document.createElement("a");
								newA.textContent = user;
								nameList.appendChild(newElement);
								newElement.appendChild(newA);
						})
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
						<form id="search-form" role="search">
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
					<nav>
						<ul id="list">
						</ul>
					</nav>
				</div>
				<div id="detail">
					<div id="navbar">
						<button>Previous</button>
						<p>{months[date.getMonth()]}</p>
						<button>Next</button>
					</div>
					<div id="mainview">
					</div>
				</div>
			</>
		);
	}

