const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
exports.register = async (req,res)=>{
  // console.log("Inside user register controller")
  console.log(req.body)
  const {username, email, password} = req.body;
  try {
    // check email id is present or not
    const existingUser = await users.findOne({email:email})
    if(existingUser){
      res.status(400).json("Account already exists");
    }else{
      console.log("user does not exists");
      const newUser = new users({
        username:username,
        email:email,
        password:password,
        github:"",
        linkedin:"",
        profile:""
      });
      await newUser.save();

      res.status(200).json('Account created successfully!');
    }

  } catch (err) {
    res.status(401).json('registraion failed due to ',err)
  }
}

exports.login = async(req,res)=>{
  //console.log("Inside login controller");
  try {

    const {email, password} = req.body;
    const existingUser = await users.findOne({email:email, password:password});
    if (existingUser){
      const token = jwt.sign({userId:existingUser._id},"userpwd123")
      //console.log(token)
      res.status(200).json({data:existingUser, token:token})

    }else{
      //console.log("Invalid email or password");
      res.status(401).json("Invalid username or password");
    }

  } catch (err) {
    res.status(400).json("Bad Request!",err); 
  }
}

exports.getUserDetails = (req,res)=>{
  res.status(200).json("Inside get user details controller")
}
