import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user data from local storage
    localStorage.removeItem('userId');
    // Optionally, you can also remove any other user-related data
    // localStorage.removeItem('otherUserData');

    // Redirect to home or login page after logging out
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
