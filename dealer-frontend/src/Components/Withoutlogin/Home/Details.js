import React from 'react'

const Details = () => {
  return (
    <>
      <section id="process" className="mx-5" >
      <div style={{ overflow: 'hidden' }}>
        <div  >
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="py-3 py-md-5 px-3">
                <h4 className="mb-3" style={{fontWeight:'550', color:'black'}}>
                  <span className="heading-color" style={{fontWeight:'550', color:'#0078d6'}}>01.</span> Service Request
                </h4>
                <p style={{color:'black'}}>
                Customers report their vehicle issues and its details and share their live location for service.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="py-3 py-md-5 px-3">
                <h4 className="mb-3" style={{fontWeight:'550', color:'black'}}>
                  <span className="heading-color"  style={{fontWeight:'550', color:'#0078d6'}}>02.</span>Allocation
                </h4>
                <p style={{color:'black'}}>
                The system finds and notifies the nearest dealer, who then receives the customer’s service request and details.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="py-3 py-md-5 px-3">
                <h4 className="mb-3" style={{fontWeight:'550', color:'black'}}>
                  <span className="heading-color" style={{fontWeight:'550', color:'#0078d6'}}>03.</span>Dispatch
                </h4>
                <p style={{color:'black'}}>
                The dealer assigns the task to a mechanic who travels to the customer's location with necessary tools, arranging for any missing parts if needed.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="py-3 py-md-5 px-3">
                <h4 className="mb-3" style={{fontWeight:'550', color:'black'}}>
                  <span className="heading-color" style={{fontWeight:'550', color:'#0078d6'}}>04.</span> Completion
                </h4>
                <p style={{color:'black'}}>
                After the mechanic completes the repair, the customer verifies service completion with an OTP.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Details
