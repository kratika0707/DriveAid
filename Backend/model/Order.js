const mongoose = require("mongoose");
const { Decimal128 } = require("mongodb");
const order = new mongoose.Schema({
    mechanicId:{
        type:String,
        required:true,
    },
    productIds: [{
        type: String,
        required: true
    }],
    placedAt: { 
        type: Date, 
        default: Date.now 
    },
    location: {
        latitude: {
            type: Decimal128,
            required: true
        },
        longitude: {
            type: Decimal128,
            required: true
        }
    },
    address:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    },
    serviceId:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('Order',order)