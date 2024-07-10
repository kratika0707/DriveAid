import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import Navbar from '../BuyHome/Navbar';
import { useParams } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { mechauthState } = useContext(AuthContext);
  const { mechanicId } = useParams();
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchOrderHistory();
  }, [mechanicId]);

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/mechanic/${mechanicId}/orderhistory`);
      const fetchedOrders = response.data.reverse();

      // Fetch products for each order
      const ordersWithProducts = await Promise.all(
        fetchedOrders.map(async (order) => {

          const productDetails = Array.isArray(order.productIds) ? await fetchProductDetails(order.productIds) : [];
          return { ...order, productIds: productDetails };
        })
      );

      setOrders(ordersWithProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductDetails = async (productIds) => {
    try {
      const productDetailsPromises = productIds.map(async (productId) => {
        const response = await axios.get(`http://localhost:5000/api/products/getproduct/${productId}`);
        console.log(response.data);
        return response.data;
      });

      const productDetails = await Promise.all(productDetailsPromises);
      //console.log(productDetails)
      return productDetails;
    } catch (err) {
      console.error('Error fetching product details:', err);
      return [];
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orders.length) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '20px', maxWidth: '800px', margin: '5% auto', borderRadius: '10px', background: '#f8f9fa', minHeight: '40vh' }}>
          No order history found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* <div className="container" style={{ minHeight: '100vh', marginTop: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '4%', fontSize: '2.4rem', color: 'black' }}>Order History</h1>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="card"
              style={{
                width: '85%',
                marginBottom: '20px',
                textAlign: 'left',
                color: 'black',
                boxShadow: hoveredCard === order._id ? '0 4px 16px rgba(0,0,0,0.6)' : '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'box-shadow 0.3s ease-in-out',
                border: 'none',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#fff',
              }}
              onMouseEnter={() => setHoveredCard(order._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>Order Date: {new Date(order.dateofservice).toLocaleDateString()}</p>
                <p style={{ fontSize: '1rem', margin: 0 }}>Order Id: #{order._id}</p>
              </div>
              <div style={{ borderTop: '1px solid #ccc', paddingTop: '12px', marginTop: '12px' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '1.2rem', fontWeight: 'bold' }}>Products Ordered:</h3>
                {order.productIds.map((product) => (
                  <div key={product._id} style={{ marginBottom: '8px' }}>
                    
                    <p style={{ fontSize: '1rem', margin: 0, color: '#555' }}>
                      <strong>{product.title}</strong> - ${product.price}
                    </p>
                  </div>
                ))}
                <p style={{ fontSize: '1rem', margin: '12px 0', color: '#555' }}>
                  <strong>Total Order Value:</strong> ${order.value}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No order found for this mechanic.</p>
        )}
      </div> */}



      <div className="container" style={{ minHeight: '80vh', marginTop: '4%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ marginBottom: '4%', fontSize: '2.4rem', color: 'black', fontWeight:'600' }}>Order History</h1>
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
                boxShadow: hoveredCard === order._id ? '0 4px 16px rgba(0,0,0,0.6)' : '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'box-shadow 0.3s ease-in-out',
                border: 'none',
              }}
              onMouseEnter={() => setHoveredCard(order._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header d-flex justify-content-between" style={{ backgroundColor: '#d4e3ff', padding: '10px', borderBottom: '1px solid #ccc', color: 'black' }}>
                <p style={{ fontSize: '1rem', margin: 0, color: 'black' }}>Order Date: {new Date(order.placedAt).toLocaleDateString()}</p>
                <p style={{ fontSize: '1rem', margin: 0, color: 'black' }}>Order Id: #{order._id}</p>
              </div>
              <div className="card-body" style={{ textAlign: 'left', marginLeft: '20px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: 'black' }}>Products Ordered:</h3>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {order.productIds.map((product) => (

                      <li key={product._id} style={{ marginBottom: '8px', display:'flex', flexDirection:'row', marginTop:'2%' }}>
                        <img src={product.image} style={{height:'40px',width:'40px'}} alt="" />
                        <p style={{ fontSize: '1rem', margin: 0, color: 'black',marginLeft:'2%'  }}>
                          
                        {product.title} - Rs.{product.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <p style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px', color: 'black'  }}>
                  Total Order Value: Rs.{order.value}
                </p>
              </div>

            </div>
          ))
        ) : (
          <p>No order found for this mechanic.</p>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
