// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.username || !formData.password) {
      setFormError('Please enter both username and password.');
      return;
    }

    try {
      // Check if the username exists
      const isUsernameValid = await checkUsernameValidity(formData.username);
      if (!isUsernameValid) {
        setFormError('Username not found. Please check your username.');
        return;
      }

      // Assuming an asynchronous login function
      await loginUser(formData);
      login(); // Assuming this function sets authentication status
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const loginUser = async ({ username, password }) => {
    // Your login logic here
    console.log('User logged in:', { username, password });
    // Replace with actual login logic
  };

  const checkUsernameValidity = async (username) => {
    // Your API call or logic to check if the username exists
    // Example: You might make a fetch call to the server to check for username validity
    // Replace the following line with your actual API endpoint or logic
    const response = await fetch(`/api/checkUsername/${username}`);
    const data = await response.json();
    return data.isValid;
  };

  return (
    <div>
      {/* Render the login form only if the user is not authenticated */}
      {!isAuthenticated && (
        <>
          {/* ... rest of the login form */}
        </>
      )}
    </div>
  );
}

export default Login;
