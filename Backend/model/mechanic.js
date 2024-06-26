const mongoose = require("mongoose");
const mechanic = new mongoose.Schema({
    dealerId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    available:{
        type:Boolean,
        required:true,
        default:false
    }

})

module.exports=mongoose.model('Mechanic',mechanic)