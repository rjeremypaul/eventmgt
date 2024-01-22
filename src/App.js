// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './Home';
import About from './About';
import Explore from './Explore';
import Login from './Login';
import SignUp from './SignUp';
import CreateEvent from './CreateEvent';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
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
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

