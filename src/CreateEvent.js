import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventLocation: '',
    // Add more fields as needed
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the form fields is empty
    if (Object.values(eventData).some((value) => value === '')) {
      setFormError('Please fill out all fields.');
      return;
    }

    // Add logic to handle the event creation, e.g., API call
    console.log('Event created with data:', eventData);

    // Reset form error state
    setFormError('');

    // Optionally, navigate to another page after successful form submission
    // const navigate = useNavigate();
    // navigate('/success-page');
  };

  return (
    <div>
      <h2>Create Event</h2>
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Event Description:
          <input
            type="text"
            name="eventDescription"
            value={eventData.eventDescription}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Event Date:
          <input
            type="date"
            name="eventDate"
            value={eventData.eventDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Event Location:
          <input
            type="text"
            name="eventLocation"
            value={eventData.eventLocation}
            onChange={handleChange}
          />
        </label>
        {/* Add more input fields as needed */}
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
