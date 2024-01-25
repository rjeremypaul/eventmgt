import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import BackBtn from './BackBtn';
import { MdComputer, MdCurrencyRupee } from "react-icons/md";
import {
  IoBookmarkOutline,
  IoCalendarClearOutline,
  IoLanguageOutline,
  IoLocationOutline,
  IoTimerOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { shareLinks } from './shareLinks';



function EventDetails() {
  const { eventName } = useParams();
  const { state, pathname } = useLocation();
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

  
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = events.map((event) =>
      event.eventName === eventName ? editedEvent : event
    );
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    navigate(`/event-details/${editedEvent.eventName}`, { state: { eventData: editedEvent } });
    setIsEditing(false);
  };


  const handleDelete = () => {
    if (isAuthenticated) {
      setIsDeleteModalOpen(true);
    } else {
     
      console.log("Please log in to delete this event.");
    }
  };

  const confirmDelete = async () => {

    const events = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = events.filter((event) => event.eventName !== eventName);
    localStorage.setItem('events', JSON.stringify(updatedEvents));


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
        <section className="container py-8 pb-16 w-full font-poppins">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:items-start">
            <div className="col-span-4 space-y-4">
              {editedEvent.eventImage && (
                  <img
                    src={editedEvent.eventImage}
                    alt="Event"
                    className="rounded-lg w-full aspect-video object-cover"
                  />
                )}
                <div className="flex flex-col md:hidden w-full space-y-4">
                  <div className="rounded-lg flex flex-col gap-4 outline w-full outline-1 outline-neutral-300 p-6">
                  <h2 className="font-bold text-xl">{eventDetails.eventName}</h2>
                
                  </div>
                </div>
                <h2 className="font-semibold py-2 border-b border-neutral-300 text-lg">
                  About
                </h2>
                <div className="display-linebreak text-neutral-800 text-sm font-grostek">
                  {eventDetails.eventDescription}
                </div>
                <h2 className="font-semibold py-2 border-b border-neutral-300 text-lg">
                  Terms and Conditions
                </h2>
                <div className="display-linebreak text-neutral-800 text-sm font-grostek">
                Please carry a valid ID proof along with you.
                <br/>
                No refunds on purchased ticket are possible, even in case of any rescheduling.<br/>
                Security procedures, including frisking remain the right of the management.<br/>
                No dangerous or potentially hazardous objects including but not limited to weapons, knives, guns, fireworks, helmets, lazer devices, bottles, musical instruments will be allowed in the venue and may be ejected with or without the owner from the venue.<br/>
                The sponsors/performers/organizers are not responsible for any injury or damage occurring due to the event.<br/>
                People in an inebriated state may not be allowed entry.<br/>
                Organizers hold the right to deny late entry to the event.<br/>
                Venue rules apply.
                </div>
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
            </div>
            <div className="col-span-2 hidden md:block w-full space-y-4">
              <div className="rounded-lg flex flex-col gap-4 outline w-full  outline-1 outline-neutral-300 p-6">
                <h2 className="font-bold text-xl">{eventDetails.eventName}</h2>
                <h2 className="inline-flex items-center gap-2 text-sm">
                  <IoCalendarClearOutline /> {eventDetails.eventDate}
                </h2>
                
                <h2 className="inline-flex items-center gap-2 text-sm">
                  <IoLocationOutline /> {eventDetails.eventLocation}
                </h2>
                <h2 className="inline-flex flex-wrap items-center gap-2 text-sm">
                  <>
                    <iframe
                      title="map"
                      className="w-full h-max outline outline-1 outline-neutral-300 shadow-md rounded-lg flex-1 mt-2"
                      src={`https://maps.google.com/maps?q=${eventDetails.eventLocation[1]},${eventDetails.eventLocation[2]}&hl=en&output=embed`}
                    ></iframe>
                  </>
                </h2>
              </div>
              <div className="inline-flex w-full items-center gap-2">
                <div className="mr-auto">
                  <h2 className="font-semibold text-lg">Invite your friends</h2>
                    <p className="text-xs text-neutral-500 font-grostek">
                      and enjoy a shared experience!
                    </p>
                </div>
                {shareLinks?.map((link, index) => (
                  <a
                    href={link?.share(
                    `${window.location.origin}${pathname}`,
                    eventDetails.eventName
                    )}
                    target="_blank"
                    title={`Share on ${link?.title}`}
                    className={`border flex items-center justify-center rounded-full p-2 text-xl hover:scale-125 transition-all text-white bg-gradient-to-br ${link?.color}`}
                  >
                  {link?.icon}
                </a>
                ))}
              </div>
            </div>
          
          
        </div>
        </section>
    </div>
   
  );
}

export default EventDetails;
