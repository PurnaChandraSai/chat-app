const User = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = "password";
const cloudinary = require("../lib/coludinary");


const signup = async (req,res)=>{
   const {email , password ,fullname  } = req.body;

   if(!email || !password || !fullname ){
     return res.send("all fields are required");
   }

   // if(email=="" || password==""|| fullname=="" ){
   //   return res.send("all fields are required");
   // }

   const hasedPassword = await bcrypt.hash(password,10);

   const userexists = await User.findOne({email:email});

   if(userexists){
      return res.status(400).json({ error: "Email already taken" });
   }
   
   const user = await User.create({
    email:email,
    fullname:fullname,
     password:hasedPassword,
    
   });

   if(user){

   const token = jwt.sign({id:user._id}, secret );
   
   
   res.cookie("jwt",token);
   console.log(token);

   res.status(201).send(user);

   }
   else{
      res.json({error :"user is not created"});
   }
  
}

const login = async (req,res) =>{

   const {email ,password } = req.body;

   const user = await User.findOne({email});

   if(!user){
      return res.send("invalid credentials");
   }
   
   // console.log(user);

   const compare = await bcrypt.compare(password,user.password);

   // console.log(password,user.password);
  
  
   if(!compare){  
   return res.send("invalid credentials compare");

   }

   const token = jwt.sign({id:user._id},secret);

      res.cookie("jwt",token,{
         
  httpOnly: true,
  secure: false, 
  sameSite: "lax", 

      });

      console.log(token);

      return res.json({mes:"successfully logined"});

}

const logout = (req,res) =>{
 try{
   res.cookie("jwt","");
   res.send("successfully loged out")
}
catch(err){
   console.log("error is in logout  :",err);
   res.json({mes:"internal server issue"});
}
}

const updateProfile = async (req,res) =>{
   try{
   const user = req.user;

   const {profile} = req.body;

   if(!profile || profile==""){
      return res.json({mes:"Profile pic is required"})
   }

   const uploadresponse = await cloudinary.uploader.upload(profile);
   const updatedUser = await User.findByIdAndUpdate(user,{profile:uploadresponse.secure_url},{new:true});  

   return res.status(200).send(updatedUser);

   }
   catch(err){
      console.log(err);
      res.send("internal server problem");
   }
}



const check = (req,res)=>{
    
    const user= req.user;
    // const token = req.cookie.jwt;

    if(!user){
        res.send("there is no user exists");
    }

    
    res.send(user);
}

module.exports = {signup , login  , logout ,updateProfile , check}