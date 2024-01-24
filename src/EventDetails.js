import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import BackBtn from './BackBtn';



function EventDetails() {
  const { eventName } = useParams();
  const { state } = useLocation();
  const eventDetails = state ? state.eventData : null;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(eventDetails);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleEdit = () => {
    if (isAuthenticated) {
      setIsEditing(true);
    } else {
      console.log("Please log in to edit this event.");
    }
  };

  const handleSave = () => {
    if (!editedEvent.eventName || !editedEvent.eventDescription || !editedEvent.eventLocation || !editedEvent.eventDate) {
      console.log("Please provide valid data for all fields.");
      return;
    }
    
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
    if (isAuthenticated) {
      setIsDeleteModalOpen(true);
    } else {
      // Show a message or redirect to the login page
      console.log("Please log in to delete this event.");
    }
  };

  const confirmDelete = async () => {
    // Remove the event from local storage
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = events.filter((event) => event.eventName !== eventName);
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    // Redirect to the Explore page after deleting the event
    navigate('/explore');
    setIsDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedEvent((prevEvent) => ({
        ...prevEvent,
        eventImage: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <BackBtn to="/explore" />
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
          <label>
                Event Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
              {editedEvent.eventImage && (
                <img
                  src={editedEvent.eventImage}
                  alt="Event"
                  style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                />
              )}
              <button
                onClick={handleEdit}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="ml-4 mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
    {isDeleteModalOpen && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    Are you sure you want to delete this event?
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Once you delete this event, it cannot be recovered.
                  </p>
                </div>
                <div className="mt-4">
                  <button onClick={confirmDelete} className="ml-3 inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete
                  </button>
                  <button onClick={cancelDelete} className="ml-3 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </>
      )}
      </div>
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
          
       
        </>
        
      )}

      
    </div>
  );
}

export default EventDetails;
