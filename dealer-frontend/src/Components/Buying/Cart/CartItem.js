import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CartItem = ({ item, onRemove }) => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/getproduct/${item.productId}`);
                setProduct(response.data); // Assuming backend responds with product details
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [item.productId]);

    const handleRemove = () => {
        if (product) {
            const price = parseFloat(product.price);
            onRemove(item.productId, item.quantity * price.toFixed(2)); // Call parent component function to remove item from cart
        }
    };

    if (isLoading) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        return <div>Error loading product details: {error}</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    const price = parseFloat(product.price);

    return (
        <div className="card mb-6 position-relative">
            <FontAwesomeIcon 
                icon={faTimes}
                className="position-absolute"
                style={{ top: '10px', right: '10px', cursor: 'pointer', zIndex: 10 }}
                onClick={handleRemove}
            />
            <div className="row no-gutters">
                <div className="col-md-3" >
                    <img src={product.image} style={{margin:'25%'}} className="card-img" alt={product.title} />
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">Price: ${!isNaN(price) ? (item.quantity * price).toFixed(2) : 'N/A'}</p>
                        <p className="card-text">Quantity: {item.quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
