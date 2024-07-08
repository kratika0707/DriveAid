import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';

const Servicesdealer = () => {
  const { authState } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
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
      {/* <div style={{height:'auto'}}>
        <h1>Your Services</h1>
        <ul>
          {services.map((service) => (
            <Link to={`/dealer/notifications/${authState.dealerId}/dealer/service/${service._id}`}>
                <li key={service._id}>
              <p>Service ID: {service._id}</p>
              <p>Car Model: {service.carmodel}</p>
              <p>Issue: {service.issue}</p>
              
            </li>
            </Link>
          ))}
        </ul>
      </div> */}
      <div className="container" style={{ minHeight: '100vh', marginTop: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{ marginBottom: '4%', fontSize: '2.4rem', color:'black' }}>Service History</h1>
        {services.length > 0 ? (
          services.map(service => (
            <div
              key={service._id}
              className="card"
              style={{
                width: '85%',
                marginBottom: '20px',
                textAlign: 'center',
                color: 'black',
                boxShadow: hoveredCard === service._id ? '0 4px 16px rgba(0,0,0,0.6)' : '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'box-shadow 0.3s ease-in-out',
                border:'none'
              }}
              onMouseEnter={() => setHoveredCard(service._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header d-flex justify-content-between" style={{ backgroundColor: '#d4e3ff', padding: '10px', borderBottom: '1px solid #ccc', color: 'black' }}>
                <p style={{ fontSize: '1rem', margin: 0,color:'black' }}>Service Date: {new Date(service.dateofservice).toLocaleDateString()}</p>
                <p style={{ fontSize: '1rem', margin: 0,color:'black' }}>Service Id: #{service._id}</p>
              </div>
              <div className="card-body" style={{ textAlign: 'left', marginLeft: '20px' }}>
                <p style={{color:'black', marginTop:'1%'}}><strong>Car Model:</strong> {service.carmodel}</p>
                <p style={{color:'black', marginTop:'1%'}}><strong>Engine Model:</strong> {service.enginemodel}</p>
                <p style={{color:'black', marginTop:'1%'}}><strong>Issue:</strong> {service.issue}</p>
                <Link to={`/dealer/notifications/${authState.dealerId}/dealer/service/${service._id}`} className="btn text-uppercase" style={{ padding: '8px 20px',  backgroundColor:'#0078d6',color:'white', fontWeight:'600', marginTop:'1%'}}>View details</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No services found for this mechanic.</p>
        )}
      </div>
    </>
  );
};

export default Servicesdealer;
