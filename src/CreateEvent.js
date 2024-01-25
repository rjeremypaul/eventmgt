import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import BackBtn from './BackBtn';
import { MdUpload } from "react-icons/md";
import styles from './CreateEvent.css';
function CreateEvent() {
  const { isAuthenticated } = useAuth();
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventLocation: '',
    eventImage: '',
  });

  const pageTitle = "Create Event";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEventData((prevData) => ({
        ...prevData,
        eventImage: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user is authenticated
    if (!isAuthenticated) {
      // If not authenticated, display an error message
      setFormError('Please log in to create an event.');
      return;
    }

    // Check if any of the form fields is empty
    if (Object.values(eventData).some((value) => value === '')) {
      setFormError('Please fill out all fields.');
      return;
    }

    // Add logic to handle the event creation, e.g., API call
    console.log('Event created with data:', eventData);

    // Reset form error state
    setFormError('');

    try {
      const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
      savedEvents.push(eventData);
      localStorage.setItem('events', JSON.stringify(savedEvents));
  
      // Navigate to the EventDetails page
      navigate('/explore', { state: { eventData } });
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  return (
    <div>
      <BackBtn to={"/"} />
      <div className="project">
        <h1 className="page-title">{pageTitle}</h1>
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-8">
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
          Event Location:
          <input
            type="text"
            name="eventLocation"
            value={eventData.eventLocation}
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
        <label>
        Upload Feauture Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        <br />
        <br />
          <button type="submit">Create Event</button>
          
        </form>
      ) : (
        <p>Please log in to create an event.</p>
      )}

    </div>
    </div>
  );
}

export default CreateEvent;
