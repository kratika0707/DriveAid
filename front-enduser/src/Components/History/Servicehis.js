import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Servicehis = () => {
  const { ServiceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/services/${ServiceId}`);
        setService(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching service details');
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [ServiceId]);

  // Ensure service is not null before accessing its properties
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!service) return <p>Service not found</p>;

  const stages = [
    'Service Booked',
    'Dealer Assigned',
    'Mechanic Allotted',
    'Completed'
  ];

  return (
    <div className='servicemech' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%', marginBottom: '5%', fontFamily:'sans-serif' }}>
      <p style={{ marginBottom: '2%',marginTop:'2%', color:'black', fontSize:'2rem', fontWeight:'600' }}>Service Details</p>
      <div className="card" style={{ width: '85%', textAlign: 'center', boxShadow: '0 4px 8px grey', color:'black', border:'none' }}>
        <div className="card-header d-flex justify-content-between" style={{ backgroundColor: '#d4e3ff', padding: '10px', borderBottom: '1px solid black', }}>
          <p style={{ fontSize: '0.9rem',margin:0, marginLeft: '5%' }}><strong>Service Date:</strong> {new Date(service.dateofservice).toLocaleDateString()}</p>
          <p style={{ fontSize: '0.9rem', margin: 0,marginRight: '5%' }}><strong>Service Id:</strong> #{service._id}</p>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ width: '70%', textAlign: 'left', padding: '20px' }}>
            <p><strong>Car Model:</strong> {service.carmodel}</p>
            <p><strong>Engine Model:</strong> {service.enginemodel}</p>
            <p><strong>Issue:</strong> {service.issue}</p>
            <p><strong>Details:</strong> {service.detail}</p>
          </div>
          <div style={{ width: '50%', textAlign: 'left', padding: '20px', marginLeft:'20%' }}>
            <p><strong>Service Progress:</strong></p>
            <div style={{ position: 'relative' }}>
              {stages.map((stage, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: index < service.servicestatus ? '#0078d6' : 'grey',
                    marginRight: '10px'
                  }}></div>
                  <p style={{ margin: 0 }}>{stage}</p>
                </div>
              ))}
              <div style={{ position: 'absolute', top: '10px', left: '10px', width: '2px', height: 'calc(100% - 20px)', background: 'grey' }}>
                <div style={{ height: `${(service.servicestatus / stages.length) * 100}%`, background: '#0078d6', width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicehis;
