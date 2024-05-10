import React from 'react'

export const EventForm = ({EventCreatorName, handleSubmitEvent}) => {
  return (
    <div id="eventCreator">
        <form name={EventCreatorName} onSubmit={handleSubmitEvent}>
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
    )
}
