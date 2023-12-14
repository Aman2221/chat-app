"use client";

import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import styles from "./css/page.module.css";

const Page = () => {
  // useSocket is a custom hook which gives access to sendMessage function and incoming message function
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  const handleInputChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setMessage("");
    sendMessage(message);
  };

  return (
    <div className={styles.mainDiv}>
      <div
        className={`${styles.mainDivInner} flex items-center justify-center`}
      >
        <div className={`flex flex-col items-center justify-center p-10`}>
          <h1 className="uppercase mb-10 text-3xl text-slate-300 font-semibold">
            Message box
          </h1>
          <input
            type="text"
            name="message"
            placeholder="Write a message here"
            value={message}
            onChange={handleInputChange}
            className={styles.messageInput}
          />
          <button
            className={`${styles.sendMessageBtn} mt-5`}
            onClick={handleSendMessage}
          >
            SEND MESSAGE
          </button>
          <ul className="mt-5">
            {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
