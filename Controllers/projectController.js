const projects = require('../Models/projectSchema');
exports.addProject = async (req,res)=>{
  console.log("Inside addProject controller");
  //  res.send("Inside addProject controller");
  const userId = req.payload;
  console.log("User Id : ",userId);
  // in request we are getting form data
  // so it is not possible to directly access this data
  // we need to use a mdule called multer

  const projectImage = req.file.filename;
  console.log("Project image file name : ", projectImage);
  const {title, language, github, website, overview} = req.body;
  try {
    const existingProject = await projects.findOne({github:github});
    if(existingProject){
      res.status(409).json("Project already exists");
    }else{
      const newProject = new projects({
        title,
        language,
        github,
        website,
        overview,
        projectImage,
        userId 
      });
      await newProject.save();
      res.status(200).json("Project uploaded successfully");
    }
  } catch (err) {
    console.log(err);
    res.status(401).json("Project upload failed",err);
  }

}
// get any 3 project details for home page
exports.getHomeProjects = async(req,res)=>{
  try {
    const homeProjects = await projects.find().limit(3);
    res.status(200).json(homeProjects);
  } catch (err) {
    console.log(err);
    res.status(401).json("Unable to fetch Projects!")
  }
}
// get all projects 
exports.getAllProjects = async(req,res)=>{
  const searchKey = req.query.search;
  //console.log(searchKey);
  const searchQuery = {
    $or:[
      {language : {
        $regex:searchKey, $options:'i'

      }},

      {title:{
        $regex : searchKey, $options:'i'
      }}

    ] 
  }
  try {
    const allProjects = await projects.find(searchQuery);
    res.status(200).json(allProjects);
  } catch (err) {
    console.log(err);
    res.status(401).json("Unable to get all projects")
  }
}
// get all uploaded projects by that specific user 
exports.getUserProjects = async (req,res)=>{
  const userId = req.payload;
  try {
    const userProjects = await projects.find({userId:userId});
    res.status(200).json(userProjects);
  } catch (err) {
    console.log(err);
    res.status(401).json("Unable to get user projects");
  }
}

// edit the project details of a user with the specific id 
exports.editUserProject = async (req,res) => {
  const {id} = req.params;
  const userId = req.payload;
  const {title, language, github, website, overview, projectImage} = req.body;
  console.log(req.body);
  const uploadedImage = req.file?req.file.filename : projectImage;
  try {
    const updateProject = await projects.findByIdAndUpdate({
      _id:id
    },{
        title:title,
        language:language,
        github:github,
        overview:overview,
        website:website,
        projectImage : uploadedImage,
        userId:userId
      },{
        new:true
      });
    //saving project after update
    await updateProject.save();
    res.status(200).json(updateProject);
  } catch (err) {
   res.status(401).json(err); 
  }


}

// delete project 
exports.deleteProject = async (req, res) => {
  console.log("Inside delete")
  const {id} = req.params;
  try {
    const removedProject = await projects.findByIdAndDelete({
      _id:id
    });
    res.status(200).json(removedProject);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  
  }
}

