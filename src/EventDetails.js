// src/components/EventDetails.js
import React from 'react';

function EventDetails({ eventDetails }) {
  // You can receive event details as props and display them here

  return (
    <div>
      <h2>Event Details</h2>
      <p>Event Name: {eventDetails.eventName}</p>
      <p>Event Date: {eventDetails.eventDate}</p>
      <p>Event Location: {eventDetails.eventLocation}</p>
      
      {/* Display more event details as needed */}
    </div>
  );
}

export default EventDetails;
