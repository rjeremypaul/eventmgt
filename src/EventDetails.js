import React from 'react';
import { useLocation } from 'react-router-dom';


function EventDetails() {
  // Retrieve event data from location state
  const { state } = useLocation();
  const eventDetails = state ? state.eventData : null;

  if (!eventDetails) {
    // Handle case where state is not available
    return <p>No event details available.</p>;
  }

  return (
    <div>
      <h2>Event Details</h2>
      <p>Event Name: {eventDetails.eventName}</p>
      <p>Event Description: {eventDetails.eventDescription}</p>
      <p>Event Date: {eventDetails.eventDate}</p>
      <p>Event Location: {eventDetails.eventLocation}</p>
      {/* Display more event details as needed */}
    </div>
  );
}

export default EventDetails;
