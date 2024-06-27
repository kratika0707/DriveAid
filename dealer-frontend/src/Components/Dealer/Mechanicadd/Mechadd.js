import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
const Mechadd = () => {
    const [phone, setPhone] = useState('');
    const [name, setName]=useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { authState } = useContext(AuthContext);
  const [fieldErrors, setFieldErrors] = useState({});
  const urlback = "http://localhost:5000/api/mechanic/register"; // Ensure this matches the backend URL
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!phone) errors.phone = "Phone number is required";
   
    if (!password) errors.password1 = "Password is required";
   

    if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
    }

    // Clear field errors if validation passes
    setFieldErrors({});
    setError(null);

    // Get location and then submit the form if location is retrieved successfully
    
        // Create the data object to send to the backend
        const dealerId=authState.dealerId;
        const data = {
            dealerId,
            name,
            phone,
            password
            
        };

        // Send the data to the backend using Axios
        axios.post(urlback, data)
            .then(response => {
                // Handle successful response from backend
                console.log('Success:', response.data);

                // Redirect to login page after successful submission
                navigate("/dealer/mechanics/${dealerId}");
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
                setError('Failed to register. Please try again.');
            });
    
};

  return (
    <>
      <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="exampleInputPhone" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPhone"
            aria-describedby="PhoneHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhone" className="form-label">Contact Number</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPhone"
            aria-describedby="PhoneHelp"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
    </>
  )
}

export default Mechadd
