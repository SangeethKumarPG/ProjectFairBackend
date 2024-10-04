// import mongoose
const mongoose = require('mongoose')

// create schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})

// create model (name should be same as collection name)
// first argument is the name of collection in the mongodb atlas, sencond argument is 
// the schema object we created in the file.
const users = mongoose.model("users",userSchema);


// export the model
module.exports = users;
