import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ProductDetails = () => {
    const { productId } = useParams();
    const { mechanicId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
const navigate = useNavigate();
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/getproduct/${productId}`);
                setProduct(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = () => {
        const price=product.price;
        axios.post('http://localhost:5000/api/products/addtocart', { mechanicId, productId, price })
            .then(response => {
                console.log(response.data); // Log the response from backend
                
                setShowPopup(true); // Show the popup notification
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                // Handle error state or show error message to user
            });
    };



    const handleGoToCart = () => {
        navigate(`/cart/${mechanicId}`); // Navigate to cart page
    };

    const closePopup = () => {
        setShowPopup(false); // Close the popup
    };


    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    if (isLoading) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        return <div>Error loading product details: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="product-image">
                        <img src={product.image} alt={product.title} className="img-fluid" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="product-info">
                        <h1>{product.title}</h1>
                        <p><b>Price:</b> ${product.price}</p>
                        <p><b>Rating:</b> {Array(product.rating).fill().map((_, i) => <span key={i}>&#9733;</span>)}</p>
                        <Button variant="primary" style={{padding:'10px 20px', fontSize:'1.25rem'}} onClick={handleAddToCart}>Add to Cart</Button>
                        <p className="mt-4 product-details-toggle" onClick={toggleDetails} style={{pointer:'cursor'}}>
                            {showDetails ? 'Hide Product Details' : 'Show Product Details'}
                        </p>
                        {showDetails && (
                            <div className="product-details-content">
                                <p>{product.detail}</p>
                               
                            </div>
                        )}
                    </div>
                </div>
            </div>
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
};

export default ProductDetails;
