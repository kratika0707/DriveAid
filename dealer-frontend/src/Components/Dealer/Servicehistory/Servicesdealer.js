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
      <div className="container" style={{ minHeight: '100vh', marginTop: '3%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ marginBottom: '4%', fontSize: '2.4rem', color: 'black', fontWeight: '800' }}>Service History</h1>
      {services.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            width: '100%',
            padding: '0 5%',
          }}
        >
          {services.map(service => (
            <div
              key={service._id}
              className="card"
              style={{
                textAlign: 'center',
                color: 'black',
                boxShadow: hoveredCard === service._id ? '0 4px 16px rgba(0,0,0,0.6)' : '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'box-shadow 0.3s ease-in-out',
                border: 'none',
                width: '100%',
              }}
              onMouseEnter={() => setHoveredCard(service._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header d-flex" style={{ backgroundColor: '#d4e3ff', padding: '10px', borderBottom: '1px solid #ccc', color: 'black', justifyContent:'space-between' }}>
                <p style={{ fontSize: '1rem', margin: 0, color: 'black' }}>Date: {new Date(service.dateofservice).toLocaleDateString()}</p>
                <p style={{ fontSize: '1rem', margin: 0, color: 'black' }}>Id: #{service._id.slice(-6)}</p>
              </div>
              <div className="card-body" style={{ textAlign: 'left', padding: '10px 20px' }}>
                <p style={{ color: 'black' }}><strong>Car Model:</strong> {service.carmodel}</p>
                <p style={{ color: 'black' }}><strong>Engine Model:</strong> {service.enginemodel}</p>
                <p style={{ color: 'black' }}><strong>Issue:</strong> {service.issue}</p>
                <Link to={`/dealer/notifications/${authState.dealerId}/dealer/service/${service._id}`} className="btn text-uppercase" style={{ padding: '8px 20px', backgroundColor: '#0078d6', color: 'white', fontWeight: '600' }}>View details</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No services found for this dealer.</p>
      )}
    </div>


    
      {/* <div className="container" style={{ minHeight: '100vh', marginTop: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
      </div> */}
    </>
  );
};

export default Servicesdealer;
