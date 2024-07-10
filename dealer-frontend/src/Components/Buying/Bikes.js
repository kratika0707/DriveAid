import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import UserPurchaseCard from './UserPurchaseCard';
import './Bikes.css';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Bikes = ({ searchTerm }) => {
    const { mechauthState } = useContext(AuthContext);
    const [details, setDetails] = useState([]);
    const [cartItems, setCartItems] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const { mechanicId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => {
                setDetails(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const addToCart = (productId, price) => {
        axios.post('http://localhost:5000/api/products/addtocart', { mechanicId, productId, price })
            .then(response => {
                console.log(response.data); // Log the response from backend
                setCartItems(prevCartItems => prevCartItems + 1); // Update frontend cart count
                setShowPopup(true); // Show the popup notification
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                // Handle error state or show error message to user
            });
    }

    const handleGoToCart = () => {
        navigate(`/cart/${mechanicId}`); // Navigate to cart page
    };

    const closePopup = () => {
        setShowPopup(false); // Close the popup
    };

    // Filter details based on searchTerm
    const filteredDetails = details.filter(detail =>
        detail.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detail.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detail.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="page-container">
            <div className={`content ${showPopup ? 'blur' : ''}`}>
                <div style={{ backgroundColor: "white", marginTop: '2%' }}>
                    <h3 style={{ marginLeft: "30px", fontFamily: "a", textAlign: "center" }}><b>Auto Parts for Sale</b></h3>
                    <br />
                    <div className="card-container" style={{ marginLeft: "10%", marginRight: "10%" }}>
                        {filteredDetails.map((detail, index) => (
                            
                             <UserPurchaseCard
                                key={index}
                                id={detail._id}
                                mechanicId={mechanicId}
                                pic={detail.image}
                                name={detail.title}
                                description={detail.detail}
                                items={detail.price}
                                addToCart={() => addToCart(detail._id, detail.price)} // Pass productId to addToCart
                            />
                            
                            
                           
                        ))}
                    </div>
                </div>
            </div>

            {/* Popup notification */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Item added to cart!</p>
                        <button className="btn btn-primary" onClick={handleGoToCart}>Go to Cart</button>
                        <button className="btn btn-secondary" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bikes;
