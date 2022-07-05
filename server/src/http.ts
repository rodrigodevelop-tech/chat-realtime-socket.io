import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: process.env.CLIENT_WEB_URL,
  },
});

export { serverHttp, io };
