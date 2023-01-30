import { frontendEnv } from 'middleware';
import { IncomingMessage, Server, ServerResponse } from 'node:http';

const SocketServer = require('socket.io').Server;

export const startSocketIO = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
  const io = new SocketServer(server, {
    cors: {
      origin: frontendEnv.URL,
    }
  })
  
  io.on('connection', (socket: any) => {
    console.log('User connected', socket.id);

    socket.on('join_room', (data: any) => {
      socket.join(data);
    })

    socket.on('send_message', (data: any) => {
      socket.nsp.to(data.chatId).emit('receive_message', data);
    })

    socket.on('disconnect', () =>  {
      console.log('User disconnected', socket.id);
    });
  })
}