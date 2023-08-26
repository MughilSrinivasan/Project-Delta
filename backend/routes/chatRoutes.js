const express = require("express");
const {
    accessChat,
    fetchChats,
} = require( "../controller/chatController" );
const authCheck = require( '../middleware/authCheck' )

const router = express.Router();

router.use(authCheck)

router.post("/", accessChat);
router.get("/", fetchChats);

module.exports = router;