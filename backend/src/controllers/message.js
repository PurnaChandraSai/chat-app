const mongoose = require("mongoose");
const User = require("../models/db");
const message  = require("../models/message")
const { middleware } = require("../middleware/middleware");
const coludinary = require("../lib/coludinary");
const { getReceiverSocketId , io } = require("../lib/socket");


const AllUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        console.log(loggedInUser);
        const users = await User.find({ _id: { $ne: loggedInUser } });
        console.log(users);
        console.log("Successfully got all users")
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send("Error in the getting the users from sidebar", err.message);
    }

}



const getMessages = async (req, res) => {
    try {
        const { id: userChatId } = req.params;
        const myId = req.user._id;
        const messages = await message.find({
            $or: [
                { senderId: myId, receiverId: userChatId },
                { senderId: userChatId, receiverId: myId }
            ]
        });
        res.status(200).send(messages);
    }
    catch (err) {
        console.log("error at getting messages :", err);
        res.status(500).send("internal server problem");
    }
}


const SendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageurl;

        if (image) {
            const uploadresponse = await coludinary.uploader.upload(image);
            imageurl = uploadresponse.secure_url;
        }
        const createMessage = await message.create({
            senderId,
            receiverId,
            text,
            image: imageurl,
        })

         const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
        res.status(200).send(createMessage );

    }
    catch (err) {

        console.log("error in sending meassage controller :", err);
        res.status(500).send("internal server problem");

    }


}



module.exports = { AllUsers, getMessages, SendMessage }