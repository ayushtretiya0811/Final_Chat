import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
 sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 },
//  receiver: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//  },
 content: {
    type: String,
    required: true,
    trim: true
 },
 chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    
 }
}
,
{
   timestamps: true,
}
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;