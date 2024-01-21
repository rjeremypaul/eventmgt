// landinglayout
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/create-event');
  };

  return (
    <div>
      <h2>Event Management</h2>
      <p>Welcome to our application!</p>
      <div>
        <button onClick={handleGetStartedClick}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
