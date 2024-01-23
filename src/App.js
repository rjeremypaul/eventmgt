import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Explore from './Explore';
import Login from './Login';
import SignUp from './SignUp';
import Logout from './Logout';
import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';
import EventProponents from './EventProponents';
import UserProfile from './UserProfile';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';



function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />

          <Routes>
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/event-details/:eventName" element={<EventDetails />} />
            <Route path="/event-proponents" element={<EventProponents proponents={['Organizer 1', 'Organizer 2']} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;