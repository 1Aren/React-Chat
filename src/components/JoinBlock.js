import React, { useState } from "react";
import axios from "axios";

const JoinBlock = ({ onLogin }) => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Enter RoomID, UserName");
    }
    const obj = {
      roomId,
      userName,
    };
    await axios.post("http://localhost:9999/rooms", obj);
    onLogin(obj);
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room id"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={onEnter}>Sign in</button>
    </div>
  );
};

export default JoinBlock;
