import React from 'react'
import Navbar from '../Navbar/Navbar'

const Login = () => {
  return (
    <>
    <div className='container-xxl d-flex flex-column justify-content-center align-items-center' style={{ height: '85vh', width: '100vw', marginTop: '0' }}>
    <h1 className='mb-2'>Login Please</h1>
    <form className='container m-4 p-4' style={{ maxWidth: '500px', border: '1px solid black', marginTop: '0' }}>
        <div className="mb-3" style={{width:'70%'}}>
            <label htmlFor="exampleInputEmail1" className="form-label">Email Contact number</label>
            <input type="phone" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3" style={{width:'70%'}}>
            <label htmlFor="exampleInputPassword1" className="form-label">Enter OTP</label>
            <input type="otp" className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>



    </>
  )
}

export default Login
