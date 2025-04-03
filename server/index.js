import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import signRouter from './routes/userRoute.js';
import messageRouter from './routes/messageRoute.js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Միայն այս գրառումն է բավարար

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', signRouter);
app.use('/api/messages', messageRouter);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log("Server is Listening!!!");
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3002',
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    socket.on('add-user', (user) => {
        global.onlineUsers.set(user, socket.id);
    });

    socket.on('send-message', (data) => {
        const sendReceiveUser = global.onlineUsers.get(data.to);
        if (sendReceiveUser) {
            socket.to(sendReceiveUser).emit('receive-message', data.message);
        }
    });
});
