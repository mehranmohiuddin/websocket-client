import React, { useEffect, useState } from 'react';
import "./App.css"

function App() {
  const [socket, setSocket] = useState(null);
  const [server, setServer] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const connectToServer = () => {
    const ws = new WebSocket(server);
    setSocket(ws);
    ws.onopen = () => {
      console.log('Connected to websocket server');
    };
    ws.onmessage = (event) => {
      setMessages([...messages, { type: 'received', message: event.data }]);
    };
    ws.onclose = () => {
      console.log('Disconnected from websocket server');
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (socket && message) {
      setMessages([...messages, { type: 'sent', message }]);
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h1 className="header">Websocket Client Test App</h1>
      <form className="server-form">
        <input
          type="text"
          value={server}
          onChange={(event) => setServer(event.target.value)}
          className="server-input"
        />
        <button type="button" className="connect-button" onClick={connectToServer}>
          Connect
        </button>
      </form>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
      <div className="message-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.message}
          </div>
        ))}
</div>
    </div>
  );
}

export default App;