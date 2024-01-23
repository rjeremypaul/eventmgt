import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      console.log('Logging out...'); // Display in console
      await logout(); // Assuming this function handles logout logic
      navigate('/'); // Redirect to home page
    };

    handleLogout(); // Call the logout function when the component is mounted
  }, [logout, navigate]);

  return null; // Render nothing in the component
}

export default Logout;
