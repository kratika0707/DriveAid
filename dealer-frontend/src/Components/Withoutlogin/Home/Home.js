import React from 'react'
import logo from '../../Assets/car41.jpg'
import About from '../About/About'
const Home = () => {
    return (
        <>
            <section id="hero" style={{ backgroundImage: `url(${logo})`, paddingTop: '10%', height: '110vh',width:'100vw' }}>
                <div className="container" >
                    <div className="row">
                        <div className="col-md-6 text-left" >
                            <p className="display-1 text-black mb-3" style={{ fontWeight: '400', fontSize: '2rem', display: 'inline' }}>Expand Your Reach with 
                            </p>
                            <p className="display-1 text-black mb-3" style={{ fontWeight: '400', fontSize: '2rem', display: 'inline' }}> DriveAid</p>
                            <p className="display-1 text-black mb-3" style={{ fontWeight: '400', fontSize: '2rem' }}>Join Us to Serve Better</p>

                            <p className="display-1 text-black mb-3" style={{ fontWeight: '400', fontSize: '1rem' }}>
                                DriveAid supports mechanics with easy access to service assignments, 
                                real-time updates, and tools for managing schedules and skill development.
                                </p>
                            {/* <a href="/dealer/register"><button type="button" className="btn  align-items-center my-2" style={{ border: '1px solid black' }}>
                                Register as Dealer now
                            </button>
                            </a> */}
                        </div>
                    </div>
                </div>
            </section>
            <About/>
        </>
    )
}

export default Home
