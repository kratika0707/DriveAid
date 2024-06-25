import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext'; // Adjust the import path
import { useParams } from 'react-router-dom';
const MHome = () => {
  const { mechanicId } = useParams();

  const { mechauthState } = useContext(AuthContext);

  return (
    <div>
      {mechauthState.isAuthenticated ? (
        <h1>Welcome Mechanic {mechanicId}</h1>
      ) : (
        <h1>Not authenticated</h1>
      )}
    </div>
  );
};

export default MHome;
