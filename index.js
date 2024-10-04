// importing dotenv
require("dotenv").config();

//importing express
const express = require("express");

// importing the database connection file
require('./DB/connections')

//importing cors
const cors = require("cors");

//import router js file which had implemented router
const router = require("./Router/router");

// create server using express
const pfServer = express();

//inject cors into pf server
pfServer.use(cors());

// use middleware to convert JSON data to js object
pfServer.use(express.json());

//adding app middleware(demo purpose)
//const appMiddleWare = require("../MiddleWares/appMiddleWares"//)
//pfServer.use(appMiddleWare);

//conntect the router
pfServer.use(router);

//Expose the path to the image uploads folder from server
pfServer.use('/uploads',express.static("./uploads"))

// provide port number
const port = 4000;

// run server

pfServer.listen(port, () => {
  console.log(`pf server is running on http://localhost:${port}`);
});

pfServer.get("/", (req, res) => {
  res.send("Project fair is running and waiting for client request");
});
