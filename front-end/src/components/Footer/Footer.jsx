import React from 'react';
import { Link as ScrollLink, scroller } from 'react-scroll';


const Footer = () => {
  const activateTabAndScroll = (tabId) => {
    // Activate the tab
    const tabTrigger = document.querySelector(`[data-bs-target="${tabId}"]`);
    if (tabTrigger) {
      const tab = new bootstrap.Tab(tabTrigger);
      tab.show();
    }

    // Scroll to the element after a short delay to ensure the tab content is rendered
    setTimeout(() => {
        console.log(tabId);
      scroller.scrollTo(tabId.substring(1), {
        duration: 3,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }, 1); // Adjust the delay as needed
  };

  return (
    // <div className="container-fluid bg-dark  footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="copyright text-light bg-dark footer pt-4 pb-4 wow fadeIn" data-wow-delay="0.1s">
          
            <div className="col-md-11 text-center text-md-end">
              <div className="footer-menu" >
                <a href="#" style={{color:'white'}}>Home</a>
                <a href="" style={{color:'white'}}>Reviews</a>
                <a href="" style={{color:'white'}}>Help</a>
                <a href="" style={{color:'white'}}>FAQs</a>
              </div>
            </div>
          
        </div>
    // </div>
  );
};

export default Footer;
