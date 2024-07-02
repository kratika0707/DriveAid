import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Servicedetails = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);

  const [error, setError] = useState(null);

 const authState = useContext(AuthContext);

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
  
 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Service Details</h1>
      <ul>
        <li>User Id: {service.userid}</li>
        <li>Service ID: {service._id}</li>
        <li>Car Model: {service.carmodel}</li>
        <li>Issue: {service.issue}</li>
        {/* <li>Location: {service.location.latitude}, {service.location.longitude}</li> */}
        <li>Date of Service: {service.dateofservice}</li>
        <li>Time of Service: {service.timeofservice}</li>
        <li>Service Status: {service.servicestatus}</li>
        <li>Dealer ID: {service.dealerId}</li>
      </ul>

    
    </div>
  );
};

export default Servicedetails;
