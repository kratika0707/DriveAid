import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../BuyHome/Navbar';
import './Checkout.css';

const Checkout = () => {
    
    const { mechanicId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const productIds = location.state ? location.state.productIds : [];
    const value = location.state.value;
    console.log(productIds); // Check console to verify productIds are correctly received


    
    const serviceId= localStorage.getItem('serviceId');
    console.log(serviceId)

    const [formData, setFormData] = useState({
        address: '',
        pincode: '',
        city: '',
        state: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [liveLocation, setLiveLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLiveLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            error => {
                console.error("Error getting live location:", error);
            }
        );
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const concatenatedAddress = `${formData.address}, ${formData.pincode}, ${formData.city}, ${formData.state}`;

        try {
            const response = await axios.post('http://localhost:5000/api/orders/placeorder', {
                mechanicId,
                productIds,
                address: concatenatedAddress,
                location: liveLocation,
                value:value,
                serviceId:serviceId,
            });

            setLoading(false);
            setSuccessMessage('Order placed successfully!');
            setTimeout(() => {
                navigate(`/${mechanicId}/orderhistory`);
            }, 2000);
        } catch (error) {
            setLoading(false);
            setError('Error placing order: ' + error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="checkout-container mt-4">
                <h1 className='checkout-heading'>Checkout Page</h1>
                <form className='form-container' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="form-control"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pincode">Pincode:</label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            className="form-control"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="form-control"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            className="form-control"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {loading && <p>Submitting order...</p>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                        Place Order
                    </button>
                </form>
            </div>
        </>
    );
};

export default Checkout;
