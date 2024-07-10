import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(1); // Initialize rating with 1
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [ price, setPrice] = useState('');

    // function ConverttoBase64(e){
    //     console.log(e);
    //     var reader = new FileReader();
    //     reader.readAsDataURL(e.target.filesd[0]);
    //     reader.onload =()=>{
    //         console.log(reader.result);
    //         setImage(reader.result);
    //     };
    //     reader.onerror= error =>{
    //         console.log("Error", error);
    //     }
    // }
    function ConverttoBase64(e) {
        const file = e.target.files[0]; // Access the first file selected by the user
    
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                // Update the state with the base64 result
                console.log(reader.result);
                setImage(reader.result);
            };
    
            reader.readAsDataURL(file); // Convert the file to Base64
        }
        else{
            console.log('hi')
        }
    }
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('image', image); // Check if 'image' is correctly set
        formData.append('title', title);
        formData.append('detail', detail);
        formData.append('category', category);
        formData.append('rating', rating);
        formData.append('price', price);
        try {
            await axios.post('http://localhost:5000/api/products/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage('Product added successfully');
            // Reset form fields and state after successful submission
            setImage(null);
            setTitle('');
            setDetail('');
            setCategory('');
            setRating(1);
        } catch (err) {
            setError(err.message);
        }
    };
    
    const handleRatingChange = (e) => {
        let value = Number(e.target.value);
        // Ensure rating is between 1 and 5
        if (value >= 1 && value <= 5) {
            setRating(value);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Product</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="file" className="form-control" id="image" onChange={ConverttoBase64} required />
                    {image=="" || image==null?"": <img width={100} height={100} src={image}/>}
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" onChange={(e) => setPrice(e.target.value)} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="detail" className="form-label">Detail</label>
                    <textarea className="form-control" id="detail" value={detail} onChange={(e) => setDetail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating (1-5)</label>
                    <input type="number" className="form-control" id="rating" value={rating} onChange={handleRatingChange} min="1" max="5" required />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddProductForm;
