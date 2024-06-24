import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const backendUrl = 'http://localhost:5000/api/dealers/register';
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const getLocation = (callback) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setError(null);
                    callback(); // Execute the callback function
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setError("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setError("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            setError("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            setError("An unknown error occurred.");
                            break;
                        default:
                            setError("An unknown error occurred.");
                            break;
                    }
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate fields
        let errors = {};
        if (!name) errors.name = "Name is required";
        if (!phone) errors.phone = "Phone number is required";
        if (!email) errors.email = "Email is required";
        if (!password1) errors.password1 = "Password is required";
        if (!password2) errors.password2 = "Confirm Password is required";
        if (password1 !== password2) errors.passwordMatch = "Passwords do not match";

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // Clear field errors if validation passes
        setFieldErrors({});
        setError(null);

        // Get location and then submit the form if location is retrieved successfully
        getLocation(() => {
            // Create the data object to send to the backend
            const data = {
                name,
                phone,
                email,
                password: password1,
                location
            };

            // Send the data to the backend using Axios
            axios.post(backendUrl, data)
                .then(response => {
                    // Handle successful response from backend
                    console.log('Success:', response.data);

                    // Redirect to login page after successful submission
                    navigate('/dealer/login');
                })
                .catch((error) => {
                    // Handle errors here
                    console.error('Error:', error);
                    setError('Failed to register. Please try again.');
                });
        });
    };

    const handlePasswordChange = (e) => {
        setPassword2(e.target.value);
        // Check if passwords match
        if (password1 !== e.target.value) {
            setError("Passwords do not match. Please enter the same password in both fields.");
        } else {
            setError(null);
        }
    };

    return (
        <>
            <div className="container d-flex" style={{ width: '70%', display: 'flex', alignContent: 'center', flexDirection: 'column', marginTop: '3%' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', margin: '2%' }}>
                    <h1>Register as a dealer</h1>
                </div>
                <form onSubmit={handleSubmit} style={{ margin: '4%' }}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Your Business' Name</label>
                        <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="exampleInputName1" />
                        {fieldErrors.name && <p className="error">{fieldErrors.name}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPhone1" className="form-label">Contact number</label>
                        <input type="phone" onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="exampleInputPhone1" />
                        <div className="form-text">We'll never share your number with anyone else.</div>
                        {fieldErrors.phone && <p className="error">{fieldErrors.phone}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" />
                        <div className="form-text">We'll never share your email with anyone else.</div>
                        {fieldErrors.email && <p className="error">{fieldErrors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Choose Password</label>
                        <input type="password" onChange={(e) => { setPassword1(e.target.value) }} className="form-control" id="exampleInputPassword1" />
                        {fieldErrors.password1 && <p className="error">{fieldErrors.password1}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                        <input type="password" onChange={handlePasswordChange} className="form-control" id="exampleInputPassword2" />
                        {fieldErrors.password2 && <p className="error">{fieldErrors.password2}</p>}
                    </div>
                    {fieldErrors.passwordMatch && <p className="error">{fieldErrors.passwordMatch}</p>}
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="btn btn-primary" disabled={error !== null}>Submit</button>
                </form>
            </div>
        </>
    );
};

export default Register;
