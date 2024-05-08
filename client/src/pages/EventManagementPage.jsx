import { useState, useEffect } from 'react';

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
              <li>
                <a href={`/contacts/1`}>Your Name</a>
              </li>
              <li>
                <a href={`/contacts/2`}>Your Friend</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"></div>
      </>
    );
  }

