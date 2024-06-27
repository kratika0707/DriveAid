import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Servicehistory = () => {
  const { serviceId } = useParams(); // Assuming serviceId is passed as a parameter
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);

  // Function to convert Decimal128 to string
  const convertDecimal128ToString = (decimal128) => {
    return decimal128 ? decimal128.$numberDecimal : null;
  };

  // Fetch service details based on serviceId and display
  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/services/${serviceId}`);
      if (!response.ok) {
        throw new Error('Service not found');
      }
      const service = await response.json();
      // Convert location fields to string
      service.location.latitude = convertDecimal128ToString(service.location.latitude);
      service.location.longitude = convertDecimal128ToString(service.location.longitude);
      setService(service);
    } catch (error) {
      console.error('Error fetching service details:', error);
      setError('Service not found');
    }
  };

  // Fetch service details when component mounts
  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

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
        <li>Location: {service.location.latitude}, {service.location.longitude}</li>
        <li>Date of Service: {service.dateofservice}</li>
        <li>Time of Service: {service.timeofservice}</li>
        <li>Service Status: {service.servicestatus}</li>
        <li>Dealer ID: {service.dealerId}</li>
        {/* Add more details as needed */}
      </ul>
    </div>
  );
};

export default Servicehistory;
