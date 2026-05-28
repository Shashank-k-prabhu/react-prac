import React, { useState } from "react";

// Sample mock chat messages with varied dates and times in UTC
const initialMessages = [
  {
    id: "m1",
    text: "Hey everyone! Welcome to the new frontend challenge group chat.",
    timestamp: "2026-05-26T10:15:30Z",
    sender: "Alice",
  },
  {
    id: "m2",
    text: "Hey Alice! Happy to be here. This routing looks amazing!",
    timestamp: "2026-05-26T10:18:45Z",
    sender: "Bob",
  },
  {
    id: "m3",
    text: "Awesome setup. I'm checking the UTC times.",
    timestamp: "2026-05-26T14:30:00Z",
    sender: "Charlie",
  },
  {
    id: "m4",
    text: "Wait, has anyone tried grouping them by date yet?",
    timestamp: "2026-05-26T23:58:00Z",
    sender: "Alice",
  },
  {
    id: "m5",
    text: "Good morning! New day, new practice challenges.",
    timestamp: "2026-05-27T06:05:12Z",
    sender: "Bob",
  },
  {
    id: "m6",
    text: "Yes, this list will display all cards in chronological order for now.",
    timestamp: "2026-05-27T08:45:20Z",
    sender: "Dave",
  },
  {
    id: "m7",
    text: "Perfect. Ready to take up the next part of the challenge!",
    timestamp: "2026-05-27T12:00:00Z",
    sender: "Charlie",
  },
];

export default function GroupChatChallenge() {
  const [messages, setMessages] = useState(initialMessages);

  const sortMessagesByDate = messages.reduce((acc, msg) => {
    const getDate = new Date(msg.timestamp).toDateString();
    console.log(getDate);

    if (!acc[getDate]) {
      acc[getDate] = [];
    }

    acc[getDate].push(msg);
    return acc;
  }, {});

  console.log(sortMessagesByDate);

  return (
    <div className="chat-challenge-container">
      <div className="challenge-description-box">
        <strong>Challenge #1: Group Chat Messages by Date (Card Stage)</strong>
        <p style={{ margin: "6px 0 0" }}>
          This page renders chat messages as individual cards. The timestamps
          are parsed and presented strictly in <strong>UTC time</strong>. You
          can add new messages to the stream below. The next phase is to group
          and design them!
        </p>
      </div>

      {/* List of Chat Cards */}
      {/* <div className="chat-card-list">
        {messages.map((msg) => {
     
          return (
            <div key={msg.id} className="chat-msg-card">
              <div className="chat-card-header">
                <span className="chat-card-sender">{msg.sender}</span>
                <div className="chat-card-timestamp-details">
                  <span className="timestamp-utc-date">{new Date(msg.timestamp).toDateString()}</span>
                  <span className="timestamp-utc-time">{new Date(msg.timestamp).toTimeString()}</span>
                </div>
              </div>
              <p className="chat-card-body">{msg.text}</p>
            </div>
          );
        })}
      </div> */}
      <div className="chat-card-list">
        {Object.entries(sortMessagesByDate).map(([date, values]) => {
          return (
            <div key={date}>
              <div className="date-header">{date}</div>
              <div className="chat-card-list">
                {values.map((msg) => {
                  return (
                    <div key={msg.id} className="chat-msg-card">
                      <div className="chat-card-header">
                        <span className="chat-card-sender">{msg.sender}</span>
                        <div className="chat-card-timestamp-details">
                          <span className="timestamp-utc-time">
                            {new Date(msg.timestamp).toTimeString()}
                          </span>
                        </div>
                      </div>
                      <p className="chat-card-body">{msg.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
