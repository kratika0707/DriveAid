import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Profile = () => {
  const [mechanic, setMechanic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false); // State to control showing change password form
  const mechauthState = useContext(AuthContext);
  const { mechanicId } = useParams();

  useEffect(() => {
    const fetchMechanicDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mechanic/findbyId/${mechanicId}`);
        setMechanic(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMechanicDetails();
  }, [mechauthState.mechanicId, mechanicId]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/mechanic/changePassword`, {
        mechanicId,
        currentPassword,
        newPassword,
      });
      setSuccessMessage("Password changed successfully");
      setShowChangePassword(!showChangePassword);
    } catch (err) {
      setPasswordError(err.response ? err.response.data.message : err.message);
    }
  };

  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mechanic) {
    return <div>No mechanic details found</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '4%', height: 'auto', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'black' }}>Your Profile</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontSize: '1.25rem', color: 'black', marginBottom: '2%' }}>
          <strong>Name:</strong> {mechanic.name}
        </div>
        <div style={{ fontSize: '1.25rem', color: 'black', marginBottom: '2%' }}>
          <strong>Contact Number:</strong> {mechanic.phone}
        </div>
      </div>

      {!showChangePassword && (
        <button onClick={toggleChangePassword} style={{  borderRadius: '5px', background: 'white', color: '#0078d6', border: 'none', fontSize:'1.15rem', height:'35px', marginTop:'10px' }}>
          Change Password
        </button>
      )}

      {showChangePassword && (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', }}>
          <h3 style={{ fontSize: '1.25rem', color: 'black', marginBottom: '2%' , marginTop: '2%'}}>Change Password:</h3>
          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width:'300px' }}>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid black', height:'35px', marginTop:'10px' }}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid black', height:'35px', marginTop:'10px' }}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid black', height:'35px', marginTop:'10px' }}
            />
            <button type="submit" style={{ padding: '10px', borderRadius: '5px', background: '#007bff', color: 'white', border: 'none', fontSize:'1.15rem', height:'35px', marginTop:'10px' }}>
              Change Password
            </button>
            <button onClick={toggleChangePassword} style={{ padding: '10px', borderRadius: '5px', background: 'gray', color: 'white', border: 'none', fontSize:'1.15rem', height:'35px', marginTop:'10px' }}>
              Cancel
            </button>
          </form>
        </div>
      )}
      
      {passwordError && <div style={{ color: 'red', marginTop: '10px' }}>{passwordError}</div>}
      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
    </div>
  );
};

export default Profile;
