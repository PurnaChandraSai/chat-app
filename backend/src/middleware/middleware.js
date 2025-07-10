const jwt = require("jsonwebtoken");
const User = require("../models/db");
const secret = "password";

 const middleware = async (req , res ,next) =>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).send("Unauthroized  - Token is not Found")
        }

        const decode = jwt.verify(token , secret );
        // console.log(decode);
        // console.log(decode.id);


        if(!decode){
            return res.status(401).send("Unauthroized  - Token is invalid");
        }

        const user = await User.findById(decode.id);

        console.log(user);

        if(!user){
            return res.status(404).send("user not found");
        }
        req.user = user;

        next();
    }
    catch(err){
        console.log(err);

        res.json({mes:"Internet sever issue"});
    }
}

module.exports={middleware}
