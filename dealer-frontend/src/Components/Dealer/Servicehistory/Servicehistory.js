import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const Servicehistory = () => {
  const { serviceId } = useParams();
  const { dealerId } = useParams();
  const [service, setService] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [error, setError] = useState(null);
const [done, setDone]= useState(false); 
const [hoveredCard, setHoveredCard] = useState(null);
const [orders, setOrders] = useState([]);
const [totalprice, setTotalprice] = useState(1000);

const [mech, setMech]= useState(null);
const [userdetail, setUserdetail] = useState(null);
  const [fetched, setFetched] = useState(false);
 const authState = useContext(AuthContext);
const navigate= useNavigate();

useEffect(() => {
  if (service) {
    fetchUserDetails();
    fetchOrders();
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


  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/getorder/${serviceId}`);
      const fetchedOrders = response.data.reverse();
      calculateTotalPrice(response.data);

      const ordersWithProducts = await Promise.all(
        fetchedOrders.map(async (order) => {
          const productDetails = Array.isArray(order.productIds) ? await fetchProductDetails(order.productIds) : [];
          return { ...order, productIds: productDetails };
        })
      );

      setOrders(ordersWithProducts);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      const price = parseFloat(item.value) || 0;
      return acc + price;
    }, 0);
    setTotalprice(1000 + total);
  };

  const fetchProductDetails = async (productIds) => {
    try {
      const productDetailsPromises = productIds.map(async (productId) => {
        const response = await axios.get(`http://localhost:5000/api/products/getproduct/${productId}`);
        return response.data;
      });

      const productDetails = await Promise.all(productDetailsPromises);
      return productDetails;
    } catch (err) {
      console.error('Error fetching product details:', err);
      return [];
    }
  };


  useEffect(() => {
    const fetchMechanicDetails = async () => {
      if (service && service.mechanicId) { // Check if service and service.mechanicId are defined
        try {
          const response = await axios.get(`http://localhost:5000/api/mechanic/findbyId/${service.mechanicId}`);
          setMech(response.data);
        } catch (err) {
          setError(err.message);
        }
      }
    };
  
    fetchMechanicDetails();
  }, [done, service]);

  // Fetch the list of available mechanics for the dealer
  const fetchMechanics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/dealers/${dealerId}/mechanics`);
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
  
{/* <div className='servicemech' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3%', marginBottom: '5%', fontFamily:'sans-serif', }}>
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
          
        </>
      ) : (
        <p>Loading user details...</p>
      )}
      <p style={{color:'black',marginBottom:'1%'}}><strong>Car Model:</strong> {service.carmodel}</p>
      <p style={{color:'black',marginBottom:'1%'}}><strong>Engine Model:</strong> {service.enginemodel}</p>
      <p style={{color:'black',marginBottom:'1%'}}><strong>Issue:</strong> {service.issue}</p>
      <p style={{color:'black',marginBottom:'1%'}}><strong>Details:</strong> {service.detail}</p>
      { service.servicestatus===2 ?(
        <>
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
      
      </>
    ):(
    <>
    <div>
    <p style={{ color:'black',fontSize: '0.9rem',margin:0, marginLeft: '5%' }}><strong>Allocated Mechanic:</strong> {service.mechanicId}</p>
    </div>
    </>
  ) } 
      

    
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
</div> */}



<div className="servicemech" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '5%', fontFamily: 'sans-serif', color: 'black', marginTop:'2%' }}>
  <p style={{ marginBottom: '4%', color: 'black', fontSize: '2.5rem', fontWeight: '800' }}>Service Details</p>
  {service.servicestatus === 4 && (
    <div>
      <p style={{ marginBottom: '10px', color: '#0078d6', fontWeight: '600', fontSize: '1.5rem' }}>Service Completed</p>
    </div>
  )}
  <div className="card" style={{ width: '85%', textAlign: 'center', color: 'black', border: 'none' }}>
    <div className="card-header d-flex justify-content-between" style={{ backgroundColor: '#d4e3ff', padding: '10px', borderBottom: '1px solid black' }}>
      <p style={{ fontSize: '0.9rem', margin: 0, marginLeft: '5%', color: 'black' }}><strong>Service Date:</strong> {new Date(service.dateofservice).toLocaleDateString()}</p>
      <p style={{ fontSize: '0.9rem', margin: 0, marginRight: '5%', color: 'black' }}><strong>Service Id:</strong> #{service._id.slice(-6)}</p>
    </div>
    {/* {service.servicestatus === 3 && (
      <div style={{ width: '100%', textAlign: 'center',paddingTop:'1%',height:'30px' }}>
        <Link style={{ color: '#0078d6',  fontWeight: '500', fontSize: '1.5rem', marginLeft:'75%' }} onClick={handleDirectionsClick}><FaLocationDot /></Link>
        <button style={{ color: '#0078d6', fontWeight: '500', fontSize: '1.5rem' ,marginLeft:'3%', border:'none', backgroundColor:'white'}} onClick={handleBuyClick}><FaCartShopping /></button>
      </div>
    )} */}
    <div className="card-body" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ width: '50%', textAlign: 'left', padding: '20px', color: 'black' }}>
        {fetched ? (
          <>
            <p style={{ color: 'black' }}><strong>Phone Number:</strong> {userdetail.phone}</p>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
        <p style={{ color: 'black' }}><strong>Car Model:</strong> {service.carmodel}</p>
        <p style={{ color: 'black' }}><strong>Engine Model:</strong> {service.enginemodel}</p>
        <p style={{ color: 'black' }}><strong>Issue:</strong> {service.issue}</p>
        <p style={{ color: 'black' }}><strong>Details:</strong> {service.detail}</p>
        { service.servicestatus===2 ?(
        <>
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
      
      </>
    ):(
    <>
    <div>
    <p style={{ color:'black' }}><strong>Allocated Mechanic:</strong> {mech ? mech.name : service.mechanicId}</p>
    </div>
    <p style={{ marginBottom: '2%', fontSize: '1.45rem', fontWeight: '600', color:'black',marginTop:'2%' }}>Pricing Details</p>
        <p style={{ marginLeft: '20px', color:'black' }}><strong>Total Service Value:</strong> Rs. {totalprice}</p>
        <p style={{ marginLeft: '20px' , color:'black'}}><strong>Service Charge:</strong> Rs. 1000</p>
        {orders.map((order, index) => (
          <p key={index} style={{ marginLeft: '20px', color:'black' }}><strong>Order {1 + index}:</strong> Rs. {order.value}</p>
        ))}
    </>
  ) } 
  
      </div>
      <div style={{ width: '50%', padding: '20px', color: 'black', textAlign: 'left' , marginLeft:'15%'}}>
        
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
  {orders.length > 0 ? (
    orders.map((order) => (
      <div
        key={order._id}
        className="card"
        style={{
          width: '85%',
          marginBottom: '20px',
          textAlign: 'center',
          color: 'black',
          border: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onMouseEnter={() => setHoveredCard(order._id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="card-header d-flex justify-content-between" style={{ border: 'none', backgroundColor: 'white', padding: '10px', color: 'black', width: '100%' }}>
          <p style={{ fontSize: '1rem', margin: 0, color: 'black' }}>Order Date: {new Date(order.placedAt).toLocaleDateString()}</p>
          <p style={{ fontSize: '1rem', margin: 0, color: 'black' }}>Order Id: #{order._id}</p>
        </div>
        <div className="card-body" style={{ textAlign: 'left', marginLeft: '20px', width: '100%' }}>
          <div style={{ marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: 'black' }}>Products Ordered:</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {order.productIds.map((product) => (
                <li key={product._id} style={{ marginBottom: '8px', display: 'flex', flexDirection: 'row', marginTop: '2%' }}>
                  <img src={product.image} style={{ height: '40px', width: '40px' }} alt="" />
                  <p style={{ fontSize: '1rem', margin: 0, color: 'black', marginLeft: '2%' }}>
                    {product.title} - Rs.{product.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: 'black' }}>
            Total Order Value: Rs.{order.value}
          </p>
        </div>
      </div>
    ))
  ) : (
    <></>
  )}
  
</div>
</>
  );
};

export default Servicehistory;
