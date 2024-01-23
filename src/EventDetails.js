import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function EventDetails() {
  const { eventName } = useParams();
  const { state } = useLocation();
  const eventDetails = state ? state.eventData : null;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(eventDetails);
  const { isAuthenticated } = useAuth();

  const handleEdit = () => {
    if (isAuthenticated) {
      setIsEditing(true);
    } else {
      // Show a message or redirect to the login page
      console.log("Please log in to edit this event.");
    }
  };


  const handleSave = () => {
    if (!editedEvent.eventName || !editedEvent.eventDescription || !editedEvent.eventLocation || !editedEvent.eventDate) {
      console.log("Please provide valid data for all fields.");
      return;
    }
    
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
    if (isAuthenticated){
      // Remove the event from local storage
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = events.filter((event) => event.eventName !== eventName);
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    // Redirect to the Explore page after deleting the event
    navigate('/explore');
    }else {
      // Show a message or redirect to the login page
      console.log("Please log in to delete this event.");
    }
    
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
      {isAuthenticated ? ( // Only show the Edit and Delete buttons if the user is authenticated
        <div>
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
          <h2 className="font-semibold py-2 border-b border-neutral-300 text-lg">
            About
          </h2>
          <div className="display-linebreak text-neutral-800 text-sm font-grostek">
          <p>Event Description: {eventDetails.eventDescription}</p>
          <p>Event Location: {eventDetails.eventLocation}</p>
          <p>Event Date: {eventDetails.eventDate}</p>
          </div>
          <button onClick={handleEdit}>Edit</button>
    <button onClick={handleDelete}>Delete</button>
        </>
      )}
      </div>
      ) : (
        // Display a message or redirect to the login page if the user is not authenticated
        <p>Please log in to edit or delete this event.</p>
      )}

      
    </div>
  );
}

export default EventDetails;
