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
    <section className="flex flex-col-reverse  lg:flex-row w-full py-8 md:py-16 justify-between gap-8 md:gap-0 container">
<div>
      <h1 className="pb-12 text-4xl font-bold">Explore the best events happening around you</h1>
      <ul>
        {events.map((event) => (
          <li key={event.eventName}>
            {/* Use Link to navigate to the event details page */}
            <Link to={`/event-details/${event.eventName}`} state={{ eventData: event }}>
            <h1 className="text-3xl md:text-5xl text-primary font-semibold md:leading-normal">
            {event.eventName}
                </h1>
             
              {/* Display the user-uploaded image or a placeholder */}
              <div className="md:pt-16 " style={{ flexBasis: "50%" }}>
                {event.eventImage ? (
                                <img
                                  src={event.eventImage}
                                  alt={`Thumbnail for ${event.eventName}`}
                                  className="w-full"
                                />
                              ) : (
                                <img
                                  src="https://via.placeholder.com/150" // Replace with the actual image URL
                                  alt={`Thumbnail for ${event.eventName}`}
                                />
                              )}

              </div>
              
            </Link>
          </li>
        ))}
      </ul>
    </div>

    </section>
    
  );
}

export default Explore;
