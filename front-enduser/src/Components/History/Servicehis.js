import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Servicehis = () => {
  const { userId, ServiceId } = useParams(); // Correctly destructure useParams output
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        console.log(userId);
        console.log(ServiceId);
        const response = await axios.get(`http://localhost:5000/api/services/${ServiceId}`);
        setService(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching service details');
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [userId, ServiceId]); // Ensure userId is also included in the dependency array

  return (
    <div className="container" style={{ height: 'auto', minHeight: '100vh', marginTop: '10%' }}>
      <h1>Service Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : service ? (
        <div>
          <p><strong>Date of Service:</strong> {service.dateofservice}</p>
          <p><strong>Time of Service:</strong> {service.timeofservice}</p>
          <p><strong>Car Model:</strong> {service.carmodel}</p>
          <p><strong>Issue:</strong> {service.issue}</p>
          <p><strong>Status:</strong> {service.servicestatus}</p>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <p>Service not found</p>
      )}
    </div>
  );
};

export default Servicehis;
