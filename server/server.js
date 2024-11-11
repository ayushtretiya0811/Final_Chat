import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRouer from './routes/authRout.js'
import cors from 'cors'
import ChatRout from './routes/ChatRout.js'
import messageRout from './routes/messageRout.js'
import { Server } from 'socket.io';
const app = express()


//calling .env file
dotenv.config()
app.use(morgan('dev'))
app.use(express.json())
connectDB();



app.use(cors({
// Set to true if you're using HTTPS
}));
 
const port = process.env.PORT 

app.use('/api/auth', authRouer)
app.use('/api/chat', ChatRout)
app.use('/api/message', messageRout)

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`.green);
});

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('join room', (roomID) => {
//     socket.join(roomID);
//     console.log(`User ${socket.id} joined room ${roomID}`);
//   });

//   socket.on('new message', (data) => {
//     console.log('New message received:', data);
//     io.to(data.chatId).emit('new message', data);
//   });


// });
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('new message', (data) => {
    console.log('New message received:', data);
    io.to(data.chatId).emit('new message', data); // Emit to the specific chat room
  });
});



// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Listen for users joining a specific chat room
//   socket.on('join room', (chatId) => {
//     socket.join(chatId);
//     console.log(`User ${socket.id} joined room ${chatId}`);
//   });

//   // Listen for new messages
//   socket.on('new message', (data) => {
//     console.log('New message received:', data);
//     // Emit to the specific chat room
//     io.to(data.chatId).emit('new message', data);
//   });

//   // Handle user disconnect
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });