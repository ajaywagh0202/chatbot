// import React, { useState } from "react";
// import "./App.css";
// import Chat from "./components/Chat";

// function App() {
//   const [messages, setMessages] = useState([]);

//   return (
//     <div className="app">
//       <Chat messages={messages} setMessages={setMessages} />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RailGPTChat from "./components/RailGPTChat";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RailGPTChat />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}