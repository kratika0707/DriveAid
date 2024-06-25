import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
const MechanicLogin = () => {
    const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { mechlogin } = useContext(AuthContext);
  const urlback = "http://localhost:5000/api/mechanic/login";


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(urlback, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid credentials');
      }

      const data = await response.json();
      mechlogin(phone, data.mechanicId); // Save user and dealerId in authState
      console.log('Login successful, mechanicId:', data.mechanicId);
      navigate(`/mechanic/${data.mechanicId}`);
      console.log('Login successful, mechanicId:', data.mechanicId);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container">
      <form onSubmit={handleSubmit}>
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

export default MechanicLogin
