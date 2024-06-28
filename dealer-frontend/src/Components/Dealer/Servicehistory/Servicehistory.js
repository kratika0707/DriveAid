import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Servicehistory = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [error, setError] = useState(null);
const [done, setDone]= useState(false); 
 const authState = useContext(AuthContext);

  // Function to convert Decimal128 to string
  const convertDecimal128ToString = (decimal128) => {
    return decimal128 ? decimal128.$numberDecimal.toString() : null;
  };

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
  const fetchMechanics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/dealers/${authState.dealerId}/mechanics`);
      if (response.status !== 200) {
        throw new Error('No available mechanics found');
      }
      const mechanics = response.data;
      setMechanics(mechanics);
    } catch (error) {
      console.error('Error fetching mechanics:', error);
      setError('Error fetching available mechanics');
    }
  };

  // Allocate mechanic to the service
  const allocateMechanic = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/services/${serviceId}/allocate-mechanic`, {
        mechanicId: selectedMechanic,
      });
      if (response.status !== 200) {
        throw new Error('Failed to allocate mechanic');
      }
      setDone(true);
      const updatedService = response.data;
      setService(updatedService);
      
    } catch (error) {
      console.error('Error allocating mechanic:', error);
      setError('Failed to allocate mechanic');
    }
  };

  useEffect(() => {
    fetchServiceDetails();
    fetchMechanics();
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
        {/* <li>Location: {service.location.latitude}, {service.location.longitude}</li> */}
        <li>Date of Service: {service.dateofservice}</li>
        <li>Time of Service: {service.timeofservice}</li>
        <li>Service Status: {service.servicestatus}</li>
        <li>Dealer ID: {service.dealerId}</li>
      </ul>

    { !done &&  <div>
      <h2>Allocate Mechanic</h2>
      <select value={selectedMechanic} onChange={(e) => setSelectedMechanic(e.target.value)}>
        <option value="">Select Mechanic</option>
        {mechanics.map((mechanic) => (
          <option key={mechanic._id} value={mechanic._id}>
            {mechanic.name}
          </option>
        ))}
      </select>
      <button onClick={allocateMechanic}>Allocate Mechanic</button>
      </div>}
    </div>
  );
};

export default Servicehistory;
