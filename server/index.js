const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const signRouter = require('./routes/userRoute');
const messageRouter = require('./routes/messageRoute');
const socket = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', signRouter);
app.use('/api/messages', messageRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb connected!!!"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

const server = app.listen( PORT, () => {
    console.log("Server is Listening!!!");
});

const io = socket(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:3002',
        predentials: true
    }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    socket.on('add-user', (user) => {
        onlineUsers.set(user,socket.id)
    });

    socket.on('send-message', (data) => {
        const sendReceiveUser = onlineUsers.get(data.to);
        if(sendReceiveUser) {
            socket.to(sendReceiveUser).emit('receive-message', data.message)
        }
    })
})