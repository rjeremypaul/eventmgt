import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Explore() {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const navigate = useNavigate();

  const handleEventClick = (event) => {
  
    navigate(`/event-details/${event.eventName}`, { state: { eventData: event } });
  };

  return (
    <section className="flex flex-col-reverse  lg:flex-row w-full py-8 md:py-16 justify-between gap-8 md:gap-0 container">
<div>
      <h1 className="pb-12 text-4xl font-bold">Explore the best events happening around you</h1>
      <ul>
        {events.map((event) => (
          <li key={event.eventName}>
            <Link to={`/event-details/${event.eventName}`} state={{ eventData: event }}>
              <br />
            <p className="text-accent tracking-[1px] font-semibold items-center gap-2 flex">
            <hr className="w-20 h-1 bg-accent"></hr>
          </p>
            <h1 className="text-3xl md:text-5xl text-primary font-semibold md:leading-normal">
            {event.eventName}
                </h1>
                <hr className="w-full border border-neutral-200"></hr>
      
              <div className="md:pt-16 " style={{ flexBasis: "50%" }}>
                {event.eventImage ? (
                                <img
                                  src={event.eventImage}
                                  alt={`Thumbnail for ${event.eventName}`}
                                  style={{ maxWidth: '550px', maxHeight: '550px' }}
                                />
                              ) : (
                                <img
                                  src="https://via.placeholder.com/150"
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
