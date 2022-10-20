import express from 'express'
import cors from 'cors'
import connectDB from "./config/db"
import users from './routes/api/users';
import {Socket} from "socket.io";
import AudentricSocket from './util/socket';

const app = express();

// connect db
connectDB();

// cors
app.use(cors({origin: true, credentials: true}));

// init middleware
app.use(express.json());

// use routes
app.use('/api/users', users);

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

const io = AudentricSocket.getInstance(server);

server.on("connection", (socket: Socket) => {
  console.log("Client connected");
});

