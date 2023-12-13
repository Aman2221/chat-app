"use client";

import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";

const Page = () => {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  const handleInputChange = (event: any) => {
    setMessage(event.target.value);
  };
  return (
    <div>
      <h1>All messages will appear here.</h1>
      <div>
        <input
          type="text"
          name="message"
          placeholder="Please enter message here"
          value={message}
          onChange={handleInputChange}
        />
        <button onClick={() => sendMessage(message)}>SEND MESSAGE</button>
      </div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
