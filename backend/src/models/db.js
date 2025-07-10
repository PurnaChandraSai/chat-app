const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     fullname:{
        type:String,
         unique : false,
        required:[true,"please provide the fullname"]
    },
    email : {
        type : String,
        unique : true,
        required:[true , "please provide the email"]
    },
    password :{
        type:String,
        required:true
    },
    profile :{
        type:String,
       default:""
    }
},
{ timestamps : true }

);


const User = mongoose.model("User",userSchema);

mongoose.connect("mongodb+srv://purnachandrasai14:1SoizkYcb1AQKLXb@cluster0.bd17l.mongodb.net/chat-db").then(() => {
        console.log("mogodb is connected");
    })
        .catch((err)=>{
            console.log(err);
        });

module.exports = User;


