const express = require("express");
const router = express.Router();
const {AllUsers ,getMessages , SendMessage } = require("../controllers/message");
const {middleware} = require("../middleware/middleware")

router.get("/AllUsers",middleware ,AllUsers);

router.get("/:id", middleware , getMessages);


router.post("/send/:id" , middleware , SendMessage)


module.exports = router;