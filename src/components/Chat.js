import React from "react";
import socket from "../socket";
import { useState, useRef, useEffect } from "react";

const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
  const [messageValue, setMessageValue] = useState("");
  const messagesRef = useRef(null);

  const onSendMessage = () => {
    socket.emit("ROOM:ADD_MESSAGE", {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue("");
  };

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        <b>Room: {roomId}</b>
        <hr />
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message, index) => (
            <div className="message" key={index}>
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            rows="3"
          ></textarea>
          <button onClick={onSendMessage} type="button" className="sendBtn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
