const Chat = require("../models/chatModel");
const User = require( "../models/userModels" );

const accessChat = (async (req, res) => {
    const userId = req.body.userID;
    
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var chat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

    chat = await User.populate(chat, {
        path: "latestMessage.sender",
        select: "username picture",
    } );

    if (chat.length > 0) {
        res.send(chat[0]);
    }
    else {
        var chatData = {
            chatName: "newChat",
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate( "users","-password");
            res.status(200).json(FullChat);
        }
        catch ( error ) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchChats = (async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (response) => {
            response = await User.populate(response, {
                path: "latestMessage.sender",
                select: "username picture",
        });
        res.status(200).send(response);
        });
    }
    catch ( error ) {
        res.status(400);
        throw new Error(error.message);
}
});

module.exports = { accessChat , fetchChats }