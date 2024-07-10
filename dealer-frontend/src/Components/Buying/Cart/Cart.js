import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem'; // Assuming CartItem is in the same directory
import Navbar from '../BuyHome/Navbar';

const Cart = () => {
    const { mechanicId } = useParams();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removalMessage, setRemovalMessage] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cart/getcartitem/${mechanicId}`);
                setCartItems(response.data.cartItems);

                calculateTotalPrice(response.data.cartItems);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, [mechanicId]);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => {
            const price = parseFloat(item.price) || 0;
            return acc + price;
        }, 0);
        setTotalPrice(total);
    };

    const handleRemoveFromCart = async (productId, price) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/removeitem/${mechanicId}/${productId}`);
            setTotalPrice(prevTotal => prevTotal - parseFloat(price));
            setCartItems(prevCartItems => prevCartItems.filter(item => item.productId !== productId));
            setRemovalMessage('Item removed from cart successfully');
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setError('Error removing item from cart');
        }
    };
    console.log("Product IDs:", cartItems.map(item => item.productId));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (cartItems.length === 0) {
        return (
            <>
            <Navbar/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <div style={{ textAlign: 'center', padding: '20px', width: '800px' }}>
                    <h5 className="card-title" style={{ fontWeight: '700', fontSize: '2rem' }}>Shopping Cart</h5>
                    <hr />
                    <p style={{ fontSize: '1.15rem', color: '#0078d6', fontWeight: '600' }}>Your cart is empty</p>
                </div>
            </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                {removalMessage && <div className="alert alert-success">{removalMessage}</div>}
                <h5 style={{fontSize:'2rem', margin:'1%'}}>Your Cart</h5>
                <div className="row">

                    <div className="col-md-8">
                    
                        <div className="card" style={{border:'none'}}>
                            <div className="card-body">
                                
                                {cartItems.map((item, index) => (
                                    <CartItem key={index} item={item} onRemove={handleRemoveFromCart} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Price Details</h5>
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Price ({cartItems.length} items)</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Delivery Charges</span>
                                    <span>Free</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span>Total Amount</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <button
                                    className="btn btn-primary btn-block mt-3"
                                    onClick={() => navigate(`/checkout/${mechanicId}`, { state: { productIds: cartItems.map(item => item.productId) , value:totalPrice} })}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
