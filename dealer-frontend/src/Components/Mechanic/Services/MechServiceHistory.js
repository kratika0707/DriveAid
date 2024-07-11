import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Mechservicehistory.css'
const MechServiceHistory = () => {
    const { mechanicId } = useParams(); // Assuming you are using React Router to get the mechanicId from the URL
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/mechanic/${mechanicId}/services`);
                const reversed=response.data.reverse();
                setServices(reversed);
                setLoading(false);
            } catch (err) {
                setError('Error fetching services');
                setLoading(false);
            }
        };

        fetchServices();
    }, [mechanicId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container" style={{ minHeight: '100vh', marginTop: '3%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '4%', fontSize: '2.4rem' ,color:'black', fontWeight:'800'}}>Service History</h1>
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
              <div className="card-header d-flex " style={{ backgroundColor: '#d4e3ff', padding: '10px', borderBottom: '1px solid #ccc', color: 'black', flexDirection:'column'}}>
                <p style={{ fontSize: '1rem', margin: 0 ,color:'black' }}>Service Date: {new Date(service.dateofservice).toLocaleDateString()}</p>
                <p style={{ fontSize: '1rem', margin: 0 ,color:'black'}}>Service Id: #{service._id}</p>
              </div>
              <div className="card-body" style={{ textAlign: 'left', marginLeft: '20px' }}>
                <p style={{color:'black'}}><strong>Car Model:</strong> {service.carmodel}</p>
                <p style={{color:'black'}}><strong>Engine Model:</strong> {service.enginemodel}</p>
                <p style={{color:'black'}}><strong>Issue:</strong> {service.issue}</p>
                <Link to={`/mechanic/service/${service._id}`} className="btn text-uppercase" style={{ padding: '8px 20px',  backgroundColor:'#0078d6',color:'white', fontWeight:'600'}}>View details</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No services found for this mechanic.</p>
        )}
      </div>
  
    );
};

export default MechServiceHistory;
