import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { PORT } from './config.js';

// Prueba cambiando origin
const app = express();

const server = http.createServer(app);

// por medio del socket estoy dando permisos al origin de mi cliente
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  }
});

// Usar middlewares
app.use(cors());
app.use(morgan('dev'));

// método que puede ejecutarse eventualmente
io.on('connection', (socket) => {  

  socket.on('message', (msg) => {

    socket.broadcast.emit('message', { body: msg.body, user:msg.user });
  })
});

server.listen(PORT);
console.log("Server started on port: "+PORT);