// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function SignUp() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.username || !formData.email || !formData.password || !formData.phone) {
      setFormError('Please fill out all fields.');
      return;
    }

    try {
      // Check for duplicates before registering
      const emailExists = await checkEmailExistenceInDatabase(formData.email);
      const usernameExists = await checkUsernameExistenceInDatabase(formData.username);

      if (emailExists || usernameExists) {
        setFormError('Email or username already exists. Please choose a different one.');
        return;
      }

      // Assuming an asynchronous registration function
      const userData = await registerUser(formData);
      console.log('User registered:', userData);
      setIsAccountCreated(true);

      // Save username and email in local storage
      localStorage.setItem('username', userData.username);
      localStorage.setItem('email', userData.email);

      // Redirect to the login page after successful account creation
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const checkEmailExistenceInDatabase = async (email) => {
    // Replace this with your actual logic to check if the email exists in the database
    // Simulating a promise-based asynchronous operation
    return new Promise((resolve) => {
      // Assume checking against a list of existing emails
      const existingEmails = ['existing@example.com', 'another@example.com'];
      resolve(existingEmails.includes(email));
    });
  };

  const checkUsernameExistenceInDatabase = async (username) => {
    // Replace this with your actual logic to check if the username exists in the database
    // Simulating a promise-based asynchronous operation
    return new Promise((resolve) => {
      // Assume checking against a list of existing usernames
      const existingUsernames = ['existing_user', 'another_user'];
      resolve(existingUsernames.includes(username));
    });
  };

  const registerUser = async ({ username, email, password, phone }) => {
    // Your registration logic here
    console.log('User registered:', { username, email, password, phone });
    return { username, email, phone }; // Replace with actual user data
  };

  return (
    <div>
      {!isAuthenticated && !isAccountCreated && (
        <div>
          <h2>Create an account</h2>
          {formError && <p style={{ color: 'red' }}>{formError}</p>}
          <form onSubmit={handleSignUp}>
            {/* ... (other form elements) */}
            <button type="submit">Sign Up</button>
          </form>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      )}

      {isAccountCreated && <p>Account successfully created! Redirecting to login page...</p>}
    </div>
  );
}

export default SignUp;
