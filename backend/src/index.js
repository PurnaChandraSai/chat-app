const express = require("express");
const mongoose = require("mongoose");
// const app = express();
const authRoute = require("./routes/authRoute");
const messageRoute = require("./routes/messageRoute");
const cors = require("cors");

const User = require("./models/db");
const cookieParser = require("cookie-parser");

const { app ,server } = require("./lib/socket");




app.use(cors({
   origin: "http://localhost:5173",
  credentials: true  
}))
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());




app.use("/api/auth",authRoute)

app.use("/api/messages",messageRoute);



server.listen(2000, ()=>{
    console.log("Running at port 2000")
})