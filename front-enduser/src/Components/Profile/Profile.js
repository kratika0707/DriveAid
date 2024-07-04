// Import your action creator if needed
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Profile = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const userId = useSelector(state => state.user.userId);
  const [fetched, setFetched] =useState(false);
  const [userdetail, setUserdetail] = useState(null);

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchUserDetails();
    }
  }, [isAuthenticated, userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/userdetails/${userId}`);
      setUserdetail(response.data);
      setFetched(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      {fetched ? (
        <div>
          <p><strong>Phone Number:</strong> {userdetail.phone}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
