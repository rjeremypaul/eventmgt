import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '', // Change username to email
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.email || !formData.password) {
      setFormError('Please enter both email and password.');
      return;
    }

    try {
      // Assuming an asynchronous login function
      await loginUser(formData);
      login(); // Assuming this function sets authentication status
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const loginUser = async ({ email, password }) => {
    // Your login logic here
    console.log('User logged in:', { email, password });
    // Replace with actual login logic

    // Check if stored username and email match logged in user
    if (email === localStorage.getItem('email')) {
      // ... perform additional login logic ...
    } else {
      // Handle invalid login attempt
      console.error('Incorrect email or password.');
    }
  };

  return (
    <div class= "context">
      {/* Render the login form only if the user is not authenticated */}
      {!isAuthenticated && (
        <>
      <h2>Sign in</h2>
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      </>
      )}
    </div>
  );
}

export default Login;
