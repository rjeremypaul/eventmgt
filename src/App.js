import './App.css'
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
import { useAuth } from './AuthContext';


function App() {
  const { isAuthenticated, logout } = useAuth(); // Add the 'logout' function from the AuthContext

  const handleLogout = () => {
    // Call the 'logout' function to log the user out
    logout();
  };

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
            {isAuthenticated ? (
              <>
                {/* Display these links only if the user is authenticated */}
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <>
                {/* Display these links only if the user is not authenticated */}
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

        <Routes>
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-event" element={<CreateEvent />} />
          {/* Example route for event details */}
          <Route path="/event-details/:eventName" element={<EventDetails />} />
          {/* Example route for event proponents */}
          <Route path="/event-proponents" element={<EventProponents proponents={['Organizer 1', 'Organizer 2']} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
