import { io } from "./http";
import { v4 as uuid } from "uuid";

interface RoomUser {
  socket_id: string;
  username: string;
  room: string;
}

interface Message {
  messageId: string;
  room: string;
  text: string;
  username: string;
  createdAt: Date;
}

const users: RoomUser[] = [];
const messages: Message[] = [];

io.on("connection", (socket) => {
  socket.on("select_room", (data, callback) => {
    socket.join(data.select_room);

    const userInRoom = users.find(
      (user) =>
        user.username === data.username && user.room === data.select_room
    );

    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room: data.select_room,
        username: data.username,
        socket_id: socket.id,
      });
    }

    const messagesRoom = getMessagesRoom(data.select_room);

    callback(messagesRoom);
  });

  socket.on("message", (data) => {
    const message: Message = {
      messageId: uuid(),
      room: data.select_room,
      text: data.message,
      username: data.username,
      createdAt: new Date(),
    };

    messages.push(message);

    //Enviar para todos os usuários na sala.
    io.to(data.select_room).emit("message", message);
  });
});

io.on("connection_error", (err) => {
  console.log(err.message);
});

function getMessagesRoom(room: string) {
  const messagesRoom = messages.filter((message) => message.room === room);

  return messagesRoom;
}
