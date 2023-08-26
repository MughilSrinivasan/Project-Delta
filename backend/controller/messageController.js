const express = require( "express" )
const Message = require( "../models/messageModel" );
const User = require("../models/userModels");
const Chat = require("../models/chatModel");

const postMessage = async ( req, res ) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        return res.status(400).send("Invalid data passed into request");
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }

    try {
        let message = await Message.create(newMessage);

        message = await message.populate("sender", "username picture")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "username picture",
        });

        await Chat.findByIdAndUpdate( req.body.chatId, { latestMessage: message } );

        res.status(200).json(message);
        
    } catch (error) {
        return res.status(400).json(error)
    }
}

const getMessages = async ( req, res ) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "username picture")
            .populate("chat");
        res.status(200).json(messages);
    }
    catch ( error ) {
        res.status(400).json(error)
    }
}

module.exports = { postMessage, getMessages  };