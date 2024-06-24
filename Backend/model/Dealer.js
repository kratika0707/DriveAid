const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const dealer = new mongoose.Schema({
    bname:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/^\S+@\S+\.\S+$/,'Please enter valid email address.']
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
    password:{
        type: String,
        required: true
    },

})

module.exports=mongoose.model('Dealer',dealer)