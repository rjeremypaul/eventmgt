import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Explore from './Explore';
import Login from './Login';
import SignUp from './SignUp';
import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';
import EventProponents from './EventProponents';


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/create-event">Create Event</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-event" element={<CreateEvent />} />
          {/* Example route for event details */}
          <Route path="/event-details" element={<EventDetails eventDetails={{ eventName: 'Sample Event', eventDate: '2024-01-21', eventLocation: 'Sample Location' }} />} />
          {/* Example route for event proponents */}
          <Route path="/event-proponents" element={<EventProponents proponents={['Organizer 1', 'Organizer 2']} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
