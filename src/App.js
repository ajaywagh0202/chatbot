import React, { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="app">
      <Chat messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default App;