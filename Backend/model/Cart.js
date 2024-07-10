const mongoose = require("mongoose");
const cart = new mongoose.Schema({
    mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
        
    }
   
    

})

module.exports=mongoose.model('Cart',cart)