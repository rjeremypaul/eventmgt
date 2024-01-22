import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

function EventDetails() {
  const { eventName } = useParams();
  const { state } = useLocation();
  const eventDetails = state ? state.eventData : null;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(eventDetails);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Add logic to save edited event data (e.g., API call)
    console.log('Saving edited event:', editedEvent);

    // Update local storage with the edited event data
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = events.map((event) =>
      event.eventName === eventName ? editedEvent : event
    );
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    // Update the event details state and exit edit mode
    navigate(`/event-details/${editedEvent.eventName}`, { state: { eventData: editedEvent } });
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Remove the event from local storage
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = events.filter((event) => event.eventName !== eventName);
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    // Redirect to the Explore page after deleting the event
    navigate('/explore');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  if (!eventDetails) {
    return <p>No event details available.</p>;
  }

  return (
    <div>
      <h2>Event Details for <br/>{eventName}</h2>
      {isEditing ? (
        <>
          <label>
            Event Name:
            <input
              type="text"
              name="eventName"
              value={editedEvent.eventName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Event Description:
            <input
              type="text"
              name="eventDescription"
              value={editedEvent.eventDescription}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Event Location:
            <input
              type="text"
              name="eventLocation"
              value={editedEvent.eventLocation}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Event Date:
            <input
              type="text"
              name="eventDate"
              value={editedEvent.eventDate}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>Event Name: {eventDetails.eventName}</p>
          <p>Event Description: {eventDetails.eventDescription}</p>
          <p>Event Location: {eventDetails.eventLocation}</p>
          <p>Event Date: {eventDetails.eventDate}</p>
          {/* Display more event details as needed */}
          <button onClick={handleEdit}>Edit</button>
          
        </>
      )}

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default EventDetails;
