import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      console.log('Logging out...'); 
      await logout(); 
      navigate('/');
    };

    handleLogout(); 
  }, [logout, navigate]);

  return null;
}

export default Logout;
