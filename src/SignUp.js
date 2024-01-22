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
      // Check if the username already exists
      const isUsernameDuplicate = await checkDuplicateUsername(formData.username);
      if (isUsernameDuplicate) {
        setFormError('Username already exists. Please choose another username.');
        return;
      }

      // Assuming an asynchronous registration function
      const userData = await registerUser(formData);
      console.log('User registered:', userData);
      setIsAccountCreated(true);

      // Redirect to the login page after successful account creation
      navigate('/login');

    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const registerUser = async ({ username, email, password, phone }) => {
    // Your registration logic here
    console.log('User registered:', { username, email, password, phone });
    return { username, email, phone }; // Replace with actual user data
  };

  const checkDuplicateUsername = async (username) => {
    // Your API call or logic to check if the username already exists
    // Example: You might make a fetch call to the server to check for username uniqueness
    // Replace the following line with your actual API endpoint or logic
    const response = await fetch(`/api/checkUsername/${username}`);
    const data = await response.json();
    return data.isDuplicate;
  };

  return (
    <div>
      {!isAuthenticated && !isAccountCreated && (
        <div>
          <h2>Create an account</h2>
          {formError && <p style={{ color: 'red' }}>{formError}</p>}
          <form onSubmit={handleSignUp}>
            {/* ... rest of the form */}
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
