// import mongoose
const mongoose = require('mongoose');

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB connected Successfully!!!");
}).catch((err)=>{
    console.log("Connection Error",err);
})