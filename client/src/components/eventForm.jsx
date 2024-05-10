import React from 'react'

export const EventForm = ({EventCreatorName, handleSubmitEvent}) => {
    const colorPalette = [
        "#264653",
        "#2a9d8f",
        "#e9c46a",
        "#f4a261",
        "#e76f51",
        "#3992ff",
    ]
  return (
    <div id="eventCreator">
        <form className="EventForm" name={EventCreatorName} onSubmit={handleSubmitEvent}>
            <label>
                Event name:
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
                Start date:<br />
                <input
                name="startEvent"
                type="datetime-local"
                required
                />
            </label>
            <br />
            <label>
                End date:<br />
                <input
                name="endEvent"
                type="datetime-local"
                required
                />
            </label>
            <br />  
            <label>
                Event color:
                <div className="colorPicker">
                    {
                        colorPalette.map((color, i) => {
                            return (
                                <input key={color+"id"+String(i)} type="radio" id={`color${i}`} name="eventColor" className="eventColor" value={color} style={{backgroundColor: color}} />
                            )
                        }
                    )}
                </div>
            </label>
            <br />
            <br />
            <button type="submit">Create event</button>
        </form>
    </div>
    )
}
