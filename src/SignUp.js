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
      // You can set a state to display an error message to the user
      return;
    }
  
    try {
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
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      )}

      {isAccountCreated && <p>Account successfully created! Redirecting to login page...</p>}
    </div>
  );
}

export default SignUp;
