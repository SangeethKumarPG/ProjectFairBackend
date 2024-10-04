// This is a sample application middleware
const appMiddleWare = (req,res, next)=>{
  console.log("Inside app middleware!!!");
  next();
}

module.exports = appMiddleWare;
