const mongoose = require("mongoose");
const product = new mongoose.Schema({
    image:{
        type:String,
        required:false,
    },
    price:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    detail:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }, 
    rating:{
        type:Number,
        required:true
    }
    

})

module.exports=mongoose.model('Product',product)