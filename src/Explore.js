import React from 'react';

function Explore() {
    const events = JSON.parse(localStorage.getItem('events')) || [];

    return (
        <div>
            <h2>Explore the best events happening around you</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.eventName}>
                        <h2>{event.eventName}</h2>
                        <p>{event.eventDescription}</p>
                        <p>{event.eventDate}</p>
                        <p>{event.eventLocation}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default Explore;
