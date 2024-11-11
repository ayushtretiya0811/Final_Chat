import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
 chatname: {
    type: String,
   
    trim: true
 },
 isGroupChat:{
    type: Boolean,
    default: false
 },
 users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
 }],
 latestMessage:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
 },
 createdAt: {
    type: Date,
    default: Date.now
 },
 isGroupAdmin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
 }
},
{
timestamps: true,
useNewUrlParser: true,
useUnifiedTopology: true,
strictPopulate: false 
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;