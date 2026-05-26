import React, { useState } from 'react';

// Sample mock chat messages with varied dates and times in UTC
const initialMessages = [
  {
    id: 'm1',
    text: "Hey everyone! Welcome to the new frontend challenge group chat.",
    timestamp: "2026-05-26T10:15:30Z",
    sender: "Alice"
  },
  {
    id: 'm2',
    text: "Hey Alice! Happy to be here. This routing looks amazing!",
    timestamp: "2026-05-26T10:18:45Z",
    sender: "Bob"
  },
  {
    id: 'm3',
    text: "Awesome setup. I'm checking the UTC times.",
    timestamp: "2026-05-26T14:30:00Z",
    sender: "Charlie"
  },
  {
    id: 'm4',
    text: "Wait, has anyone tried grouping them by date yet?",
    timestamp: "2026-05-26T23:58:00Z",
    sender: "Alice"
  },
  {
    id: 'm5',
    text: "Good morning! New day, new practice challenges.",
    timestamp: "2026-05-27T06:05:12Z",
    sender: "Bob"
  },
  {
    id: 'm6',
    text: "Yes, this list will display all cards in chronological order for now.",
    timestamp: "2026-05-27T08:45:20Z",
    sender: "Dave"
  },
  {
    id: 'm7',
    text: "Perfect. Ready to take up the next part of the challenge!",
    timestamp: "2026-05-27T12:00:00Z",
    sender: "Charlie"
  }
];

export default function GroupChatChallenge() {
  const [messages, setMessages] = useState(initialMessages);
  const [newText, setNewText] = useState("");
  const [newSender, setNewSender] = useState("You");

  // Function to format timestamp strictly in UTC
  const formatUTCDetails = (timestampStr) => {
    try {
      const date = new Date(timestampStr);
      if (isNaN(date.getTime())) {
        return { dateStr: 'Invalid Date', timeStr: 'Invalid Time' };
      }

      // Format Date in UTC
      const dateStr = date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      // Format Time in UTC
      const timeStr = date.toLocaleTimeString('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' UTC';

      return { dateStr, timeStr };
    } catch (e) {
      return { dateStr: 'Error Parsing', timeStr: 'Error Parsing' };
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    // Create message with current real UTC time
    const newMsg = {
      id: `m-${Date.now()}`,
      text: newText.trim(),
      timestamp: new Date().toISOString(), // Standard ISO format in UTC (ends in 'Z')
      sender: newSender.trim() || "You"
    };

    setMessages([...messages, newMsg]);
    setNewText("");
  };

  return (
    <div className="chat-challenge-container">
      <div className="challenge-description-box">
        <strong>Challenge #1: Group Chat Messages by Date (Card Stage)</strong>
        <p style={{ margin: '6px 0 0' }}>
          This page renders chat messages as individual cards. The timestamps are parsed and presented strictly in <strong>UTC time</strong>. You can add new messages to the stream below. The next phase is to group and design them!
        </p>
      </div>

      {/* Input controls to send a mock message */}
      <form onSubmit={handleSendMessage} style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '28px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--border)',
        padding: '16px',
        borderRadius: '12px',
        alignItems: 'flex-end',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent)' }}>Sender Name</label>
          <input
            type="text"
            className="sidebar-search-input"
            style={{ padding: '8px 12px' }}
            value={newSender}
            onChange={(e) => setNewSender(e.target.value)}
            placeholder="Name..."
          />
        </div>
        <div style={{ flex: '3 1 350px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent)' }}>Message Content</label>
          <input
            type="text"
            className="sidebar-search-input"
            style={{ padding: '8px 12px' }}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Type a test message..."
            required
          />
        </div>
        <button type="submit" className="action-btn" style={{ padding: '9px 20px', height: '40px' }}>
          Send
        </button>
      </form>

      {/* List of Chat Cards */}
      <div className="chat-card-list">
        {messages.map((msg) => {
          const { dateStr, timeStr } = formatUTCDetails(msg.timestamp);
          return (
            <div key={msg.id} className="chat-msg-card">
              <div className="chat-card-header">
                <span className="chat-card-sender">{msg.sender}</span>
                <div className="chat-card-timestamp-details">
                  <span className="timestamp-utc-date">{dateStr}</span>
                  <span className="timestamp-utc-time">{timeStr}</span>
                </div>
              </div>
              <p className="chat-card-body">{msg.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
