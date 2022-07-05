import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

interface Message {
  messageId: string;
  room: string;
  text: string;
  username: string;
  createdAt: Date;
}

export function Chat() {
  const [messageChat, setMessageChat] = useState("");
  const [messagesRoom, setMessagesRoom] = useState<Message[]>([]);

  const navigate = useNavigate();

  const socket = io("http://localhost:3333");

  const { select_room, username } = useParams();

  useEffect(() => {
    socket.emit(
      "select_room",
      {
        username,
        select_room,
      },
      (message: Message[]) => {
        setMessagesRoom(message);
      }
    );
  }, []);

  function isSendMessage() {
    const messageSent = {
      select_room,
      messageChat,
      username,
    };
    socket.emit("message", messageSent);
  }

  function isLogoutClassRoom() {
    navigate("/");
  }

  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesRoom((OldMessage) => [...OldMessage, message]);
    });
  }, [messageChat]);

  return (
    <div className="container">
      <div className="content">
        <div className="button_content">
          <button id="logout" type="button" onClick={isLogoutClassRoom}>
            Logout
          </button>
        </div>
        <div id="username">
          Olá {username} - {select_room}
        </div>

        <div className="chat_content">
          <div className="messages" id="messages">
            {messagesRoom.map((message) => (
              <div key={message.messageId} className="new_message">
                <label className="form-label">
                  <strong>
                    {message.username}: <span>{message.text}</span>
                  </strong>
                </label>
              </div>
            ))}
          </div>
        </div>

        <input
          className="form-control"
          type="text"
          placeholder="Digite sua mensagem"
          id="message"
          onChange={(e) => setMessageChat(e.target.value)}
          value={messageChat}
        />
        <button type="button" onClick={isSendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}
