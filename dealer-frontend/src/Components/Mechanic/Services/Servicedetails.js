import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import { FaLocationDot, FaCartShopping } from "react-icons/fa6";

const Servicedetails = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [userdetail, setUserdetail] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const { mechauthState } = useContext(AuthContext);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const [totalprice, setTotalprice] = useState(1000);

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

  const convertDecimal128ToString = (decimal128) => {
    return decimal128 ? decimal128.$numberDecimal.toString() : null;
  };

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
      if (response.status !== 200) {
        throw new Error('Service not found');
      }
      const service = response.data;
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

  const handleDirectionsClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const mechanicLat = position.coords.latitude;
        const mechanicLng = position.coords.longitude;
        const userLat = service.location.latitude;
        const userLng = service.location.longitude;
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${mechanicLat},${mechanicLng}&destination=${userLat},${userLng}&travelmode=driving`;
        window.open(googleMapsUrl, '_blank');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleBuyClick = () => {
    localStorage.setItem('serviceId', serviceId);
    navigate(`/buyparts/${mechauthState.mechanicId}`);
  };

  const handleCompleteService = () => {
    navigate(`/completeservice/${serviceId}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="servicemech" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '5%', fontFamily: 'sans-serif', color: 'black', marginTop:'2%' }}>
  <p style={{ marginBottom: '4%', color: 'black', fontSize: '2.5rem', fontWeight: '800' }}>Service Details</p>
  {service.servicestatus !== 3 && (
    <div>
      <p style={{ marginBottom: '10px', color: '#0078d6', fontWeight: '600', fontSize: '1.5rem' }}>Service Completed</p>
    </div>
  )}
  <div className="card" style={{ width: '85%', textAlign: 'center', color: 'black', border: 'none' }}>
    <div className="card-header d-flex justify-content-between" style={{ backgroundColor: '#d4e3ff', padding: '10px', borderBottom: '1px solid black' }}>
      <p style={{ fontSize: '0.9rem', margin: 0, marginLeft: '5%', color: 'black' }}><strong>Service Date:</strong> {new Date(service.dateofservice).toLocaleDateString()}</p>
      <p style={{ fontSize: '0.9rem', margin: 0, marginRight: '5%', color: 'black' }}><strong>Service Id:</strong> #{service._id}</p>
    </div>
    {service.servicestatus === 3 && (
      <div style={{ width: '100%', textAlign: 'center',paddingTop:'1%',height:'30px' }}>
        <Link style={{ color: '#0078d6',  fontWeight: '500', fontSize: '1.5rem', marginLeft:'75%' }} onClick={handleDirectionsClick}><FaLocationDot /></Link>
        <Link style={{ color: '#0078d6', fontWeight: '500', fontSize: '1.5rem' ,marginLeft:'3%'}} onClick={handleBuyClick}><FaCartShopping /></Link>
      </div>
    )}
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
      </div>
      <div style={{ width: '50%', padding: '20px', color: 'black', textAlign: 'left' , marginLeft:'15%'}}>
        <p style={{ marginBottom: '2%', fontSize: '1.45rem', fontWeight: '600' }}>Pricing Details</p>
        <p style={{ marginLeft: '20px' }}><strong>Total Service Value:</strong> Rs. {totalprice}</p>
        <p style={{ marginLeft: '20px' }}><strong>Service Charge:</strong> Rs. 1000</p>
        {orders.map((order, index) => (
          <p key={index} style={{ marginLeft: '20px' }}><strong>Order {1 + index}:</strong> Rs. {order.value}</p>
        ))}
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
  {service.servicestatus === 3 && (
    <div style={{ width: '30%', textAlign: 'center', padding: '20px' }}>
      <button className="btn btn-primary" style={{ padding: '10px 12px', marginTop: '4%', marginBottom: '10px', width: '80%', border: '1px solid', borderRadius: '15px', backgroundColor: '#0078d6', color: 'white', fontWeight: '500' }} onClick={handleCompleteService}>
        Complete Service
      </button>
    </div>
  )}
</div>



    </>
  );
};

export default Servicedetails;
