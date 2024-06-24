const port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());
require('dotenv').config();

const userRoutes = require('./router/auth-router');
app.use('/api/users', userRoutes);

const ServiceRoutes = require('./router/Servicerouter');
app.use('/api/services', ServiceRoutes);

const DealerRoutes = require('./router/dealer-router');
app.use('/api/dealers', DealerRoutes);

const MechanicRoutes = require('./router/mechanic-router');
app.use('/api/mechanic', MechanicRoutes);

const middleware=(req,res,next)=>{
    console.log("Hello");
    next();
}

const DB = process.env.MONGODB_URI;
/*
mongoose.connect(DB).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.error("Connection error", err);
});

app.listen(port,(error)=>{
    if(!error){
        console.log("Running on "+port);
    }
    else{
        console.log("Error "+error);
    }
})
*/

const connect=()=>{
    return mongoose.connect(DB)
    
}
app.get("/", (req,res)=>{
    res.send("Express running");
})



const start=async()=>{
    try{
        await connect()
        app.listen(port,()=>{
            console.log("connected")
        })
    }
    catch(error){
        console.log(error)
    }
}
start()