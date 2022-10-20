"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const WEBSOCKET_CORS = {
    origin: "*",
    credentials: true
};
class AudentricSocket extends socket_io_1.Server {
    constructor(httpServer) {
        super(httpServer, {
            cors: WEBSOCKET_CORS
        });
    }
    static getInstance(httpServer) {
        if (!AudentricSocket.io && httpServer) {
            AudentricSocket.io = new AudentricSocket(httpServer);
        }
        return AudentricSocket.io;
    }
}
exports.default = AudentricSocket;
