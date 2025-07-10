const express = require("express");
const {signup , login , logout , updateProfile } = require("../controllers/auth")
const User = require("../models/db");
const {middleware} = require("../middleware/middleware")
const {check} = require("../controllers/auth")

const router = express.Router();

router.post("/signup",signup);

router.post("/signin", login );

router.post("/logout",logout);


router.put("/update-profile" , middleware , updateProfile );

router.get("/check", middleware, check); 

module.exports = router 
