// src/App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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

        <Switch>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/create-event">
            <CreateEvent />
          </Route>
          {/* Example route for event details */}
          <Route path="/event-details">
            <EventDetails eventDetails={{ eventName: 'Sample Event', eventDate: '2024-01-21', eventLocation: 'Sample Location' }} />
          </Route>
          {/* Example route for event proponents */}
          <Route path="/event-proponents">
            <EventProponents proponents={['Organizer 1', 'Organizer 2']} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
