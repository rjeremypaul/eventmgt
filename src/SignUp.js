// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Assuming an asynchronous registration function
      const userData = await registerUser(formData);
      console.log('User registered:', userData);
      setIsAccountCreated(true);
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
      {!isAccountCreated ? (
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
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      ) : (
        <p>Account successfully created!</p>
      )}
    </div>
  );
}

export default SignUp;
