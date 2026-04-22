import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import InputBar from "./InputBar";
import logo from "../indian.png";

export default function Chat({ messages, setMessages }) {
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ── Auto-scroll ──────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Send message ─────────────────────────
  const sendMessage = async (text) => {
    const trimmed = text?.trim();
    if (!trimmed || loading) return;

    const newMessages = [...messages, { role: "user", text: trimmed }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();

      setMessages([
        ...newMessages,
        {
          role: "bot",
          text: data.answer || "No response received.",
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([
        ...newMessages,
        {
          role: "bot",
          text: "⚠️ Unable to reach the server. Please try again.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">

      {/* ── EMPTY STATE ───────────────────── */}
      {messages.length === 0 && !loading && (
        <div className="center-screen">
          <img src={logo} alt="Indian Railways" />
          <h1>Railways-GPT</h1>
          <p className="subtitle">
            Ask anything about Indian Railways documents
          </p>

          <div className="input-bar">
            <InputBar onSend={sendMessage} disabled={loading} />
          </div>
        </div>
      )}

      {/* ── CHAT MODE ─────────────────────── */}
      {messages.length > 0 && (
        <>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}

            {/* 🔥 Enhanced Loading Animation */}
            {loading && (
              <div className="message bot loading-message">
                <div className="loader"></div>
                <span className="loading-text">AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="input-bar bottom-input">
            <InputBar onSend={sendMessage} disabled={loading} />
          </div>
        </>
      )}
    </div>
  );
}