import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Servicedetails = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [userdetail, setUserdetail] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  
  const authState = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (service) {
      fetchUserDetails();
    }
  }, [service]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/userdetails/${service.userid}`);
      setUserdetail(response.data);
      setFetched(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  // Function to convert Decimal128 to string
  const convertDecimal128ToString = (decimal128) => {
    return decimal128 ? decimal128.$numberDecimal.toString() : null;
  };

  useEffect(() => {
    fetchServiceDetails();

  }, [serviceId]);
  // Fetch service details based on serviceId
  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
      if (response.status !== 200) {
        throw new Error('Service not found');
      }
      const service = response.data;
      // Convert location fields to string
      service.location.latitude = convertDecimal128ToString(service.location.latitude);
      service.location.longitude = convertDecimal128ToString(service.location.longitude);
      setService(service);
    } catch (error) {
      console.error('Error fetching service details:', error);
      setError('Service not found');
    }
  };

  // Fetch the list of available mechanics for the dealer


  // Allocate mechanic to the service

  const handleDirectionsClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const mechanicLat = position.coords.latitude;
        const mechanicLng = position.coords.longitude;
        const userLat = service.location.latitude;
        const userLng = service.location.longitude;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${mechanicLat},${mechanicLng}&destination=${userLat},${userLng}&travelmode=driving`;
        window.open(googleMapsUrl, '_blank');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleBuyClick = () => {
    navigate('/buyparts/${mechauthState.mechanicId}')
  };



  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className='servicemech' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%', marginBottom: '5%', fontFamily:'sans-serif', }}>
      <p style={{ marginBottom: '4%',  color:'black', fontSize:'2.5rem', fontWeight:'800' }}>Service Details</p>
      <div className="card" style={{ width: '85%', textAlign: 'center', boxShadow: '0 4px 8px grey', color:'black', border:'none' }}>
        <div className="card-header d-flex justify-content-between" style={{ backgroundColor: '#f7ddda', padding: '10px', borderBottom: '1px solid black', }}>
          <p style={{ fontSize: '0.9rem',margin:0, marginLeft: '5%' }}><strong>Service Date:</strong> {new Date(service.dateofservice).toLocaleDateString()}</p>
          <p style={{ fontSize: '0.9rem', margin: 0,marginRight: '5%' }}><strong>Service Id:</strong> #{service._id}</p>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{ width: '70%', textAlign: 'left', padding: '20px' }}>
            {fetched ? (
              <>
                <p><strong>Phone Number:</strong> {userdetail.phone}</p>
                {/* Add more user details as needed */}
              </>
            ) : (
              <p>Loading user details...</p>
            )}
            <p><strong>Car Model:</strong> {service.carmodel}</p>
            <p><strong>Engine Model:</strong> {service.enginemodel}</p>
            <p><strong>Issue:</strong> {service.issue}</p>
            <p><strong>Details:</strong> {service.detail}</p>
            <button className='btn btn-primary' style={{ padding: '10px 10px', marginTop: '10px', width: '30%', border:'1px solid ', borderRadius:'15px',backgroundColor:'#ea422b',color:'white', fontWeight:'500' }} onClick={handleBuyClick}>Complete Service</button>
          </div>
          <div style={{ width: '30%', textAlign: 'center', padding: '20px' }}>
            <button className='btn btn-primary' style={{ padding: '10px 12px', marginBottom: '10px', width: '80%',border:'1px solid ', borderRadius:'15px',backgroundColor:'#ea422b',color:'white', fontWeight:'500' }} onClick={handleDirectionsClick}>Get Directions</button>
            <button className='btn btn-primary' style={{ padding: '10px 15px', width: '80%',border:'1px solid ', borderRadius:'15px',backgroundColor:'#ea422b',color:'white', fontWeight:'500' }} onClick={handleBuyClick}>Buy Products</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Servicedetails;
