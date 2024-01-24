
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Loginmodule.css';
function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
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
      // Handle incorrect login attempt
      console.error('Incorrect email or password.');
    }
  };

  return (

      <div class = "context">
      {!isAuthenticated && (
        <>
          <h2 className={styles['login-title']}>Sign in</h2>
          {formError && <p  style={{ color: 'red' }}>{formError}</p>}
          <form className={styles['login-form']} onSubmit={handleSubmit}>
            <label className={styles['login-label']}>
              <h1>Email:</h1>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles['login-input']}
              />
            </label>
            <label className={styles['login-label']}>
              <h1>Password:</h1>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles['login-input']}
              />
            </label>
            <button type="submit" className={styles['login-button']}>
              Login
            </button>
          </form>
          <p class = "d">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </>
      )}

    </div>


  );
}

export default Login;
