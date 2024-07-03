import React, { Component } from 'react';

class Footer extends Component {
    state = {  } 
    render() { 
        return (

            <div>
                  
                  <nav className="navbar navbar-dark bg-primary" style={{height : 200}}>

                        <div className="row">
                 <div className="col-med-3" style={{ marginLeft:"70%" , marginBottom: "10%"}}>   
               
                <button type="button" class="btn btn-primary" >Contact US</button>
                <button type="button" class="btn btn-primary" >Terms and Conditions</button>
                <button type="button" class="btn btn-primary" >Maps</button>
                </div></div>







        {/* <div className="col-med-3" style={{backgroundColor: "yellow", marginLeft : "550px",width : "17%",
         display:"inline-block"}} >
                
                 <a
           class="btn btn-outline-light btn-floating m-1"
           href="#!"
           role="button"
           ><i class="fab fa-facebook-f"></i
          ></a></div>
             </div>
 */}


                {/* <div className="row">
                 <div className="col-med-3" >
                </div> </div>
                
                <div className="row">
                 <div className="col-med-3">   
               <button type="button" class="btn btn-primary" >Used Cars</button>
                <button type="button" class="btn btn-primary" >New Cars</button>
                <button type="button" class="btn btn-primary" >Bikes</button>
                <button type="button" class="btn btn-primary" >AutoParts</button>
                </div></div>
                 */}
                {/* <div className="row">
                 <div className="col-med-4"> 
               
               
               
                 </div></div> */}
               
                  </nav>
            </div>
        );
    }
}
 
export default Footer;