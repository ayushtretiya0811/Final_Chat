import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";
import { json } from "express";
// import Message  from '../models/messageModel.js'

export const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name  email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.send(FullChat).status(200);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

export const fetchChat = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("isGroupChat", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server  error in fetchchat",
      error: error.message,
    });
  }
};

export const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({
      success: false,
      message: "Please provide all the required fields",
    });
  }
  var users = [...req.body.users];
  // var users = req.body.users; 
  if (users.length < 2) {
    return res.status(400).send({
      success: false,
      message: "Please provide atleast 2 users",
    });
  }
  users.push(req.user._id);
  try {
    const groupChat = await Chat.create({
      chatname: req.body.name,
      users: users,
      isGroupChat: true,
      isGroupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("isGroupAdmin", "-password");
    res.status(200).send(fullGroupChat);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      
    });
  }
};


export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatname: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("isGroupAdmin", "-password");
  if (!updatedChat) {
    res.status(404).send({
      success: false,
      message: "Chat Not Found",
    });
  } else {
    res.status(200).send(updatedChat);
  }
  
}

export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
  )
    .populate("users", "-password")
    .populate("isGroupAdmin", "-password");
    if(!added){
      res.status(404).send({
        success: false,
        message: "Chat Not Found",
      });
    }else{
      res.status(200).send(added);
    }
}


export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
  )
    .populate("users", "-password")
    .populate("isGroupAdmin", "-password");

    if(!removed){
      res.status(404).send({
        success: false,
        message: "Chat Not Found",
      });
    }else{
      res.status(200).send(removed);
    }
}