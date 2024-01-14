// src/components/PhoneNumberVerification.js
import React, { useState } from 'react';

function PhoneNumberVerification({ phoneNumber, onVerify }) {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    // Add logic to verify the provided phone number with the verification code
    console.log('Verifying phone number:', phoneNumber, 'with code:', verificationCode);
    // Call onVerify function with true or false based on verification success
    onVerify(true); // Replace this with actual verification logic
  };

  return (
    <div>
      <h2>Provide a Phone Number for Verification</h2>
      <p>
        We've sent a verification code to {phoneNumber}. Please enter the code below:
      </p>
      <form onSubmit={handleVerify}>
        <label>
          Verification Code:
          <input
            type="text"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default PhoneNumberVerification;
