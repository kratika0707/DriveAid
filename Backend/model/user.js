const mongoose = require("mongoose");
const user = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports=mongoose.model('User',user)