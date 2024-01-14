// src/App.js
import React, { useState } from 'react';
import './App.css';
import Home from './Home'; // Update the import paths
import Explore from './Explore'; // Update the import paths
import Login from './Login'; // Update the import paths
import SignUp from './SignUp'; // Update the import paths

function App() {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'explore':
        return <Explore />;
      case 'login':
        return <Login />;
      case 'signup':
        return <SignUp />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li onClick={() => setView('home')}>Home</li>
          <li onClick={() => setView('explore')}>Explore</li>
          <li onClick={() => setView('login')}>Login</li>
          <li onClick={() => setView('signup')}>Sign Up</li>
        </ul>
      </nav>

      {renderView()}
    </div>
  );
}

export default App;

