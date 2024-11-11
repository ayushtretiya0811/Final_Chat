import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";
import Message from "../models/messageModel.js"

 export const sendMessage = async (req, res, next) => {
        const {content , chatId}    = req.body;
        if(!chatId || !chatId)
            {
                return res.status(400).send({
                    success: false,
                    message: 'chatId and content are required'
                })
            }
            var newmessage = {
                sender: req.user._id,
                content: content,
                chat:chatId

            }
            try {
                var message = await Message.create(newmessage); 
                message = await message.populate("sender","name");
                message = await message.populate("chat");
                message = await User.populate(
                    message,
                    {
                        path: "chat.users",
                        select: "name  email",
                    }
                )
                
                        await Chat.findByIdAndUpdate(req.body.chatId,{
                            latestMessage: message._id,
                          
                        })
                        res.json(message)
                
            } catch (error) {
                res.status(404).send({
                    success: false,
                    message: 'error.while sending message',
                    error: error.message
                })
            }
        }

export const  allMessage = async (req, res) => {
    try {
        const messages = await Message.find({chat:req.params.chatId}).populate("sender","name email").populate("chat");
        res.json(messages)
    } catch (error) {
        res.status(404).send({
            success: false,
            message: 'error.while fetching messages',
            error: error.message
        })
    } 
}
