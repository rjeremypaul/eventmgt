import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Explore from './Explore';
import Login from './Login';
import SignUp from './SignUp';
import Logout from './Logout';
import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';
import EventProponents from './EventProponents';
import UserProfile from './UserProfile';
import { AuthProvider, useAuth } from './AuthContext';

function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav class ="navbar">
     <h1>Event<span>Management</span></h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navigation />

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