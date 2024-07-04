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
    <>
    <div style={{ height: 'auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop:'4%', width:'100vw' }}>
  <h1 style={{ textAlign: 'center', marginBottom: '2%' }}>Your Mechanics</h1>
  <div style={{ width: '100%', maxWidth: '900px', marginBottom: '20px' }}>
    {mechanics.length > 0 ? (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {mechanics.map((mechanic) => (
          <li
            key={mechanic._id}
            style={{
              marginBottom: '15px',
              padding: '10px',
              borderBottom: '1px solid grey',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              backgroundColor: 'white',
              borderRadius: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px', width: '100%' }}>
  <div style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
    <p style={{ fontSize: '1rem', margin: 0, color: 'black', fontWeight: '700' }}>
      Name: {mechanic.name}
    </p>
  </div>
  <div style={{ width: '50%', display: 'flex', alignItems: 'center',  marginLeft: '20px' }}>
    <p style={{ fontWeight: '600', color: 'black', margin: 0, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      Phone: {mechanic.phone}
    </p>
  </div>
</div>

          </li>
        ))}
      </ul>
    ) : (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>No mechanics available.</p>
    )}
  </div>
</div>

    
    </>
  );
};

export default Mechanics;
