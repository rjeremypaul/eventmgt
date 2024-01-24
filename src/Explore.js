import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css'; // Import the shared styles

function Explore() {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleEventClick = (event) => {
    // Use Link to navigate to the event details page
    navigate(`/event-details/${event.eventName}`, { state: { eventData: event } });
  };

  return (
    <div className="content">
      <Slider {...settings}>
        {events.map((event) => (
          <div key={event.eventName} className="slide">
            <Link to={`/event-details/${event.eventName}`} state={{ eventData: event }}>
              <img
                src={event.eventImage || 'https://via.placeholder.com/800x400'}
                alt={`Thumbnail for ${event.eventName}`}
              />
              <div className="content">
                <h2>{event.eventName}</h2>
                <p>{event.eventDescription}</p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Explore;
