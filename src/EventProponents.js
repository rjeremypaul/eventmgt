
import React from 'react';

function EventProponents({ proponents }) {


  return (
    <div>
      <h2>Event Proponents</h2>
      <ul>
        {proponents.map((proponent, index) => (
          <li key={index}>{proponent}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventProponents;
