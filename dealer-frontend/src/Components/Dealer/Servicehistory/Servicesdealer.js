import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';

const Servicesdealer = () => {
  const { authState } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/dealers/${authState.dealerId}/services`);
        const reversed=response.data.reverse();
        setServices(reversed);
        console.log(services)
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [services,authState.dealerId]);

  return (
    <>
      <div style={{height:'auto'}}>
        <h1>Your Services</h1>
        <ul>
          {services.map((service) => (
            <Link to={`/dealer/notifications/${authState.dealerId}/dealer/service/${service._id}`}>
                <li key={service._id}>
              <p>Service ID: {service._id}</p>
              <p>Car Model: {service.carmodel}</p>
              <p>Issue: {service.issue}</p>
              {/* Add more details as needed */}
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Servicesdealer;
