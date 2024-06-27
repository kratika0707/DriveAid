import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Mechanics = () => {
  const { authState } = useContext(AuthContext);
  const [mechanics, setMechanics] = useState([]);
    
  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        if (authState.isAuthenticated && authState.dealerId) {
          const response = await axios.get(`http://localhost:5000/api/dealers/${authState.dealerId}/mechanics`);
          setMechanics(response.data);
        }
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      }
    };

    fetchMechanics();
  }, [authState.isAuthenticated, authState.dealerId]);

  return (
    <div className="container" style={{ height: 'auto', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginTop: '10%' }}>Your Mechanics</h1>
      {mechanics.length > 0 ? (
        <ul>
          {mechanics.map((mechanic) => (
            <li key={mechanic._id}>
              <p>Name: {mechanic.name}</p>
              <p>Email: {mechanic.email}</p>
              <p>Phone: {mechanic.phone}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No mechanics available.</p>
      )}
    </div>
  );
};

export default Mechanics;
