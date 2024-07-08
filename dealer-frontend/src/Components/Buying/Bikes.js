import React, { Component } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import UserPurchaseCard from './UserPurchaseCard';
import { getAutoPartsDetails } from './UserAutoParts';
import NewCars from './NewCars';
import './Bikes.css';  // Ensure you have imported the CSS file

class Bikes extends Component {
    state = {
        details: getAutoPartsDetails(),
        CottonFabric_quantity: 9,
        CarScratchRemover_quantity: 7,
        SolarPoweredAeroplane_quantity: 8,
        NexenTire_quantity: 4,
        PurposeCleaner_quantity: 9,
        FloorMats_quantity: 12,
        SeatSafetyBeltClip_quantity: 19,
        Towel_quantity: 2,
        CartItems: 0,
        abc: NewCars
    }

    handleDecrement = (item) => {
        this.setState((prevState) => ({
            [`${item}_quantity`]: prevState[`${item}_quantity`] - 1,
            CartItems: prevState.CartItems + 1
        }));
    }

    render() {
        return (
            <div style={{ backgroundColor: "white" }}>
                <h3 style={{ marginLeft: "90%", marginTop: "2%", display: "inline-block"}}>
                    <b><AiOutlineShoppingCart /></b>
                </h3>
                <h3 style={{ marginLeft: "30px", fontFamily: "a", textAlign: "center"}}><b>Auto Parts for Sale</b></h3>
                <br />
                <div className="card-container" style={{marginLeft: "10%", marginRight: "10%"}}>
                    {this.state.details.map((detail, index) => (
                        <UserPurchaseCard
                            key={index}
                            pic={detail.pic}
                            name={detail.name}
                            description={detail.description}
                            items={this.state[`${detail.name.replace(/\s+/g, '')}_quantity`]}
                            method={() => this.handleDecrement(detail.name.replace(/\s+/g, ''))}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Bikes;
