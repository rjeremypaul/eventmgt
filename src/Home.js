// src/Home.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Usage
const navigate = useNavigate();



function Home() {
  const handleGetStartedClick = () => {
    // Add any functionality or navigation logic when the button is clicked
    alert('Get Started clicked!');
  };

  return (
    <div>
      <h2>event management app</h2>
      <p>Welcome to our application!</p>
      <div>
        <button onClick={handleGetStartedClick}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
