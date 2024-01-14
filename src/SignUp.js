// src/components/SignUp.js
import React, { useState } from 'react';
import PhoneNumberVerification from './PhoneNumberVerification';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '', // Adding phone to form data
  });

  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add logic to handle the form submission, e.g., API call or authentication
    console.log('Form submitted with data:', formData);

    // Set isAccountCreated to true after successful account creation
    setIsAccountCreated(true);
  };

  const handlePhoneNumberVerification = (isVerified) => {
    // Handle the result of phone number verification
    if (isVerified) {
      console.log('Phone number successfully verified!');
      setIsPhoneNumberVerified(true);
    } else {
      console.log('Phone number verification failed.');
    }
  };

  return (
    <div>
      {!isAccountCreated && !isPhoneNumberVerified ? (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </label>
            <br />
            <button type="submit">Sign Up</button>
          </form>
          <p>
            Already have an account? Login
          </p>
        </div>
      ) : (
        <PhoneNumberVerification
          phoneNumber={formData.phone}
          onVerify={handlePhoneNumberVerification}
        />
      )}
    </div>
  );
}

export default SignUp;
