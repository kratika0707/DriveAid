import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Servicehistory = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [error, setError] = useState(null);
const [done, setDone]= useState(false); 
const [userdetail, setUserdetail] = useState(null);
  const [fetched, setFetched] = useState(false);
 const authState = useContext(AuthContext);
const navigate= useNavigate();

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
  const stages = [
    'Service Booked',
    'Dealer Assigned',
    'Mechanic Allotted',
    'Completed'
  ];
  return (
    <>
    {/* <div>
      <h1>Service Details</h1>
      <ul>
        <li>User Id: {service.userid}</li>
        <li>Service ID: {service._id}</li>
        <li>Car Model: {service.carmodel}</li>
        <li>Issue: {service.issue}</li>
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
    </div> */}

<div className='servicemech' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3%', marginBottom: '5%', fontFamily:'sans-serif', }}>
<p style={{ marginBottom: '4%',  color:'black', fontSize:'2.5rem', fontWeight:'600' }}>Service Details</p>
<div className="card" style={{ width: '85%', textAlign: 'center', boxShadow: '0 4px 8px grey', color:'black', border:'none' }}>
  <div className="card-header d-flex justify-content-between" style={{color:'black', backgroundColor: '#d4e3ff', padding: '10px', borderBottom: '1px solid black', }}>
    <p style={{ color:'black',fontSize: '0.9rem',margin:0, marginLeft: '5%' }}><strong>Service Date:</strong> {new Date(service.dateofservice).toLocaleDateString()}</p>
    <p style={{ color:'black',fontSize: '0.9rem', margin: 0,marginRight: '5%' }}><strong>Service Id:</strong> #{service._id}</p>
  </div>
  <div className="card-body" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
    <div style={{ width: '70%', textAlign: 'left', padding: '20px' }}>
      {fetched ? (
        <>
          <p style={{color:'black',marginBottom:'1%'}}><strong>Phone Number:</strong> {userdetail.phone}</p>
          {/* Add more user details as needed */}
        </>
      ) : (
        <p>Loading user details...</p>
      )}
      <p style={{color:'black',marginBottom:'1%'}}><strong>Car Model:</strong> {service.carmodel}</p>
      <p style={{color:'black',marginBottom:'1%'}}><strong>Engine Model:</strong> {service.enginemodel}</p>
      <p style={{color:'black',marginBottom:'1%'}}><strong>Issue:</strong> {service.issue}</p>
      <p style={{color:'black',marginBottom:'1%'}}><strong>Details:</strong> {service.detail}</p>
      { service.servicestatus===2 &&  
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ position: 'relative', marginRight: '10px' }}>
    <select
      value={selectedMechanic}
      onChange={(e) => setSelectedMechanic(e.target.value)}
      style={{
        appearance: 'none', // Remove default dropdown arrow
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        padding: '7px 10px',
        height: '40px',
        fontSize: '16px',
        borderRadius: '15px',
        border: '1px solid #ccc',
        background: 'white', // Background color for the select
        position: 'relative',
        zIndex: 1,
      }}
    >
      <option value="">Select Mechanic</option>
      {mechanics.map((mechanic) => (
        <option key={mechanic._id} value={mechanic._id}>
          {mechanic.name}
        </option>
      ))}
    </select>
    
  </div>
  <button
    onClick={allocateMechanic}
    style={{
      padding: '7px 15px',
      fontSize: '16px',
      backgroundColor: '#0078d6',
      border: '1px solid #0078d6',
      color: 'white',
      borderRadius: '15px'
    }}
  >
    Allocate 
  </button>
</div>

    }
    </div>
    <div style={{ flex: '1', textAlign: 'left', padding: '20px', maxWidth: '300px' }}>
            <p style={{color:'black',}}><strong>Service Progress:</strong></p>
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
                  <p style={{ margin: 0, color:'black' }}>{stage}</p>
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
</>
  );
};

export default Servicehistory;
