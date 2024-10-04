// import express
const express = require("express");


//get router instance from express
const router = new express.Router();

// importing controller
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')

// importing jwt MiddleWare
const jwtMiddleWare = require("../MiddleWares/jwtMiddleWare")

// importing multer config
const multerConfig = require('../MiddleWares/multerMiddleware');

// differrent paths for resolving requests
// router.get("/user/getUserDetails", (req, res) => {
//   res.send("inside getUserDetails route");
// });
router.post("/user/register", userController.register);
router.get("/user/getUserDetails", userController.getUserDetails);
router.post("/user/login",userController.login);
//adding middle ware for router
//adding multer middleware after jwt middleware
router.post("/project/addproject",jwtMiddleWare,multerConfig.single('projectImage'),projectController.addProject);
router.get("/project/homeproject", projectController.getHomeProjects);
router.get("/project/allProjects",jwtMiddleWare, projectController.getAllProjects);
router.get("/project/userProjects", jwtMiddleWare, projectController.getUserProjects);
router.put("/project/editProject/:id", jwtMiddleWare, multerConfig.single("projectImage"),projectController.editUserProject)
router.delete("/project/remove/:id", jwtMiddleWare, projectController.deleteProject)

// export router
module.exports = router;
