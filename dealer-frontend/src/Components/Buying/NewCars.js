import React, { Component } from 'react';
import { itemdetails } from './Array';

class NewCars extends Component {
    state = { 
        
       items : itemdetails()
     } 


    render() { 
        return (

            <div>
              <h1>{this.state.items[0].name}</h1>
            </div>
        );
    }
}
 
export default NewCars;