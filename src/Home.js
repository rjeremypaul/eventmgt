// landinglayout
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/create-event');
  };

 
  return (
    <div class= "content">
      <h3>HIGHLY INTERACTIVE <span>WEBINARS</span> AND<span> EVENT </span>IN MINUTES</h3>

      <div>
        <button onClick={handleGetStartedClick}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
