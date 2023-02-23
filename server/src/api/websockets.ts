import { frontendEnv, webfrontendEnv } from 'middleware';
import { IncomingMessage, Server, ServerResponse } from 'node:http';

const SocketServer = require('socket.io').Server;

export const startSocketIO = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
  const io = new SocketServer(server, {
    cors: {
      origin: [frontendEnv.URL, webfrontendEnv.URL],
      pingTimeout: 60000,
    },
  });
  console.log(webfrontendEnv.URL, "frontend url");
  io.on('connection', (socket: any) => {
    socket.on('join_room', (data: any) => {
      socket.join(data);
      console.log('user joined room', data);
    });

    socket.on('send_message', (data: any) => {
      socket.nsp.to(data.chatId).emit('receive_message', data);
    });

    socket.on('send_typing', (data: any) => {
      socket.to(data.chatId).emit('receive_typing', data);
    });

    socket.on('send_block', (data: any) => {
      socket.to(data.chatId).emit('receive_block', data);
    });

    socket.on('send_notification', (data: any) => {
      socket.to(data.chatId).emit('receive_notification', data);
    });
    socket.on('setup', (userData: any) => {
      socket.join(userData);
      socket.emit('connected');
    });
    socket.on('join chat', (room: any) => {
      socket.join(room);
      console.log('user joined room', room);
      // socket.emit('connected');
    });
    socket.on('new message', (newMessageReceived: any) => {
      let chat = newMessageReceived.chatId;
      if (!chat) return console.log('Chat does not exist');
      socket.broadcast.to(chat).emit('message received', newMessageReceived);
    });
    //   socket.on('typing', (room : any) => {
    //     socket.in(room).emit('typing');
    //   })
    //   socket.on('stop typing', (room : any) => {
    //     socket.in(room).emit('stop typing');
    //   })
  });
};
