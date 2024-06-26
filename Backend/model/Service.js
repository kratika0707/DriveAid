const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const service = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
        
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
    dateofservice:{
        type: String,
        required:true
    },
    timeofservice:{
        type:String,
        required:true
    },
    carmodel:{
        type:String,
        required:true
    },
    servicestatus:{
        type:Number,
        required:true,
        default:1
    },
    issue:{
        type:String,
        required:true
    },
    dealerId:{
        type:String,
    },
    mechanicId:{
        type:String
    }
})

module.exports=mongoose.model('Service',service)