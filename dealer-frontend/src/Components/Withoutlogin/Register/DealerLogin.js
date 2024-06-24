import React, { useState } from 'react';

const DealerLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Phone:',phone);
    console.log('Password:', password);
    console.log('Checked:', isChecked);
  };

  return (
    <>
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputPhone" className="form-label">Contact Number</label>
        <input
          type="phone"
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
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
    </>
  );
};

export default DealerLogin;
