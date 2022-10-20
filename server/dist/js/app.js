"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const users_1 = __importDefault(require("./routes/api/users"));
const socket_1 = __importDefault(require("./util/socket"));
const app = (0, express_1.default)();
// connect db
(0, db_1.default)();
// cors
app.use((0, cors_1.default)({ origin: true, credentials: true }));
// init middleware
app.use(express_1.default.json());
// use routes
app.use('/api/users', users_1.default);
app.get('/', (req, res) => res.send('Hello world!'));
const port = process.env.PORT || 8082;
const server = app.listen(port, () => console.log(`Server running on port ${port}`));
const io = socket_1.default.getInstance(server);
server.on("connection", (socket) => {
    console.log("Client connected");
});
