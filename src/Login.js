import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (existing form fields) */}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
