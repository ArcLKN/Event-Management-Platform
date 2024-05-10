import React from 'react'

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
];

export const CreateWeek = ({calendarDate, events}) => {
        const listIndex = Array.from({ length: 7 }, (_, i) => i);
        console.log("Create Week", calendarDate)
        let day = calendarDate.getDay();
    return (<>
        {
            listIndex.map((i) => {
                
                let proxyDate = new Date(calendarDate);
                proxyDate.setDate(calendarDate.getDate() - day + i)

                const eventsForDay = events.filter((e) => {
                    let startDate = new Date(e['start']);
                    let endDate = new Date(e['end']);
                    return (
                        (
                            startDate.getFullYear() < proxyDate.getFullYear() ||
				            (startDate.getFullYear() == proxyDate.getFullYear() && startDate.getMonth() < proxyDate.getMonth()) ||
				            (startDate.getFullYear() == proxyDate.getFullYear() && startDate.getMonth() == proxyDate.getMonth() &&  startDate.getDate() <= proxyDate.getDate()))
                        && (
                            proxyDate.getFullYear() < endDate.getFullYear() ||
                            proxyDate.getFullYear() == endDate.getFullYear() && proxyDate.getMonth() < endDate.getMonth() ||
                            proxyDate.getFullYear() == endDate.getFullYear() && proxyDate.getMonth() == endDate.getMonth() && proxyDate.getDate() <= endDate.getDate()
                        )

                    )
                })

                return(
                <div key={i} className="weekDayContainer" id={`id${days[proxyDate.getDay()]}`}>
                    <div className="weekDayTopContainer">
                        <div className="titleTopDiv">
                            {`${days[proxyDate.getDay()]} ${String(proxyDate.getDate())} ${months[proxyDate.getMonth()]}`}
                        </div>
                    </div>
                    <div className="weekDayBotContainer">
                        {
                            eventsForDay.map((event) => {
                                let startDate = new Date(event['start']);
                                let endDate = new Date(event['end']);
                                let flexBfDivFlexGrow = "0";
                                let newEventDivFlexGrow = "0";
                                let flexAfDivFlexGrow = "0";
                                if (
                                    proxyDate.getFullYear() < endDate.getFullYear() ||
                                    proxyDate.getFullYear() == endDate.getFullYear() && proxyDate.getMonth() < endDate.getMonth() ||
                                    proxyDate.getFullYear() == endDate.getFullYear() && proxyDate.getMonth() == endDate.getMonth() && proxyDate.getDate() < endDate.getDate()
                                ) {
                                    flexBfDivFlexGrow = `${0}`;
                                    newEventDivFlexGrow = `${24}`;
                                    flexAfDivFlexGrow = `${0}`;
                                } else if (
                                    startDate.getFullYear() < proxyDate.getFullYear() ||
                                    startDate.getFullYear() == proxyDate.getFullYear() && startDate.getMonth() < proxyDate.getMonth() ||
                                    startDate.getFullYear() == proxyDate.getFullYear() && startDate.getMonth() == proxyDate.getMonth() &&  startDate.getDate() < proxyDate.getDate()
                                ) {
                                    flexBfDivFlexGrow = `${0}`;
                                    newEventDivFlexGrow = `${endDate.getHours()}`;
                                    flexAfDivFlexGrow = `${24 - endDate.getHours()}`;
                                } else {
                                    flexBfDivFlexGrow = `${startDate.getHours()}`;
                                    newEventDivFlexGrow = `${endDate.getHours() - startDate.getHours()}`;
                                    flexAfDivFlexGrow = `${24 - endDate.getHours()}`;
                                }
                                return (
                                <div key={event.id} className="eventContainer">
                                    <div className="flexBfDiv" style={{flexGrow: flexBfDivFlexGrow}}></div>
                                    <div className='EventDiv' style={{ backgroundColor: event['color'] || '#3992ff', flexGrow: newEventDivFlexGrow }} onDoubleClick={() => console.log("Event clicked")}>
                                        <div className='eventTitle'>{event['name']}</div>
                                    </div>
                                    <div className='flexAfDiv' style={{flexGrow: flexAfDivFlexGrow}}></div>
                                </div>
                            )})
                        }
                    </div>
                </div>
                )
            })
        }
        </>
    )
}