import {Server, Socket} from 'socket.io';
import * as http from "http";

const WEBSOCKET_CORS = {
  origin: "*",
  credentials: true
}

class AudentricSocket extends Server {
  private static io: AudentricSocket;

  constructor(httpServer: http.Server) {
    super(httpServer, {
      cors: WEBSOCKET_CORS
    });
  }

  public static getInstance(httpServer?: http.Server): AudentricSocket {
    if (!AudentricSocket.io && httpServer) {
      AudentricSocket.io = new AudentricSocket(httpServer);
    }

    return AudentricSocket.io;
  }
}

export default AudentricSocket;
