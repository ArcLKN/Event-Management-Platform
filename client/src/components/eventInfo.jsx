import React from 'react'

export const EventInfo = ({ event, onClose, onDelete }) => {
    let startDate = new Date(event['start']);
    let endDate = new Date(event['end']);
  return (
    <div className='EventInfoContainer'>
        <div className='eventCard'>
            <div className='ContentWrapper'>
            <div className='CardTitle'>
                <h1 style={{color: event['color']}}>{event['name']}</h1>
                <p>{`Start: ${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()} - End: ${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`}</p>
            </div>
            <div className='CardContent'>
                <p>{event['description'] ? event['description'] : 'No description...'}</p>
            </div>
            </div>
            <div className='CardFooter'>
                <button onClick={onClose}>Close</button>
                <button className='deleteEventButton' onClick={onDelete}>Delete</button>
            </div>
        </div>
    </div>
  )
}
