import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Explore() {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const navigate = useNavigate();

  const handleEventClick = (event) => {
    // Use Link to navigate to the event details page
    navigate(`/event-details/${event.eventName}`, { state: { eventData: event } });
  };

  return (
    <div>
      <h1 className="pb-12 text-4xl font-bold">Explore the best events happening around you</h1>
      <ul>
        {events.map((event) => (
          <li key={event.eventName}>
            {/* Use Link to navigate to the event details page */}
            <Link to={`/event-details/${event.eventName}`} state={{ eventData: event }}>
              <h2>{event.eventName}</h2>
              {/* Display a thumbnail image or placeholder here */}
              <img
                src="https://via.placeholder.com/150" // Replace with the actual image URL
                alt={`Thumbnail for ${event.eventName}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Explore;
