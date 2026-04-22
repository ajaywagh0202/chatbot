import React, { useState, useEffect, useRef } from "react";
import logo from "../indian.png";

// ── Inline styles object ──────────────────────────────────────
const S = {
  // Page
  page: {
    minHeight: "100vh",
    background: "linear-gradient(145deg, #1e3a4f 0%, #2a4f6a 40%, #1a3344 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 16px",
    fontFamily: "'Segoe UI', 'Noto Sans', sans-serif",
    gap: "16px",
    boxSizing: "border-box",
  },

  // ── Header Card ──────────────────────────────────────────────
  headerCard: {
    width: "100%",
    maxWidth: "1700px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
    flexShrink: 0,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logoCircle: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#fff",
    border: "2px solid #d0dce8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoText: {
    fontSize: "22px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#1a2f45",
    letterSpacing: "-0.3px",
  },
  headerSub: {
    margin: 0,
    fontSize: "0.75rem",
    color: "#5a7a96",
    fontWeight: "500",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
    animation: "pulse 2s infinite",
  },
  statusLabel: {
    fontSize: "0.78rem",
    color: "#22994a",
    fontWeight: "600",
  },


  // ── Chat Card ────────────────────────────────────────────────
  chatCard: {
    width: "100%",
    maxWidth: "1700px",
    flex: 1,
    background: "#f4f6f9",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
    minHeight: "600px",
    maxHeight: "calc(100vh - 150px)",
  },

  // Chat sub-header
  chatHeader: {
    background: "linear-gradient(90deg, #1a3a52 0%, #234f6e 100%)",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderRadius: "16px 16px 0 0",
    borderColor: "#ffffff",
  },
  chatHeaderIcon: {
    fontSize: "18px",
  },
  chatHeaderText: {
    margin: 0,
    color: "#e8f0f7",
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  chatHeaderSub: {
    margin: 0,
    color: "#7aaccf",
    fontSize: "0.72rem",
  },

  // Messages area
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  // ── Empty / welcome state ────────────────────────────────────
  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "40px 20px",
  },
  emptyIcon: {
    fontSize: "52px",
    marginBottom: "4px",
  },
  emptyTitle: {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#1a2f45",
  },
  emptySub: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#6b8caa",
    textAlign: "center",
    maxWidth: "380px",
    lineHeight: "1.6",
  },
  suggestionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "16px",
    width: "100%",
    maxWidth: "560px",
  },
  suggestionChip: {
    background: "#ffffff",
    border: "1.5px solid #d0dce8",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "0.82rem",
    color: "#1e4060",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: "500",
    lineHeight: "1.4",
    transition: "border-color 0.15s, background 0.15s",
  },

  // ── Message rows ─────────────────────────────────────────────
  msgRowUser: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: "8px",
  },
  msgRowBot: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "8px",
  },
  botAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1a3a52, #2a6496)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    flexShrink: 0,
    marginTop: "2px",
  },
  userAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#234f6e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    flexShrink: 0,
  },
  bubbleUser: {
    background: "linear-gradient(135deg, #1e4d73 0%, #2563a8 100%)",
    color: "#ffffff",
    borderRadius: "18px 18px 4px 18px",
    padding: "11px 16px",
    maxWidth: "70%",
    fontSize: "0.9rem",
    lineHeight: "1.55",
    fontWeight: "400",
    boxShadow: "0 2px 8px rgba(30,77,115,0.25)",
  },
  bubbleBot: {
    background: "#ffffff",
    color: "#1a2f45",
    borderRadius: "4px 18px 18px 18px",
    padding: "13px 16px",
    maxWidth: "78%",
    fontSize: "0.9rem",
    lineHeight: "1.65",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    border: "1px solid #e2eaf2",
  },

  // Bot bubble internals
  botPara: {
    margin: "0 0 8px 0",
    color: "#2d4a60",
  },
  botParaLast: {
    margin: 0,
    color: "#2d4a60",
  },
  botList: {
    margin: "4px 0",
    paddingLeft: "0",
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  botListItem: {
    display: "flex",
    gap: "8px",
    color: "#2d4a60",
    lineHeight: "1.55",
  },
  listBullet: {
    color: "#2563a8",
    fontWeight: "700",
    flexShrink: 0,
    marginTop: "1px",
  },

  // Sources
  sourcesBar: {
    marginTop: "10px",
    paddingTop: "8px",
    borderTop: "1px solid #e2eaf2",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "6px",
  },
  sourcesLabel: {
    fontSize: "0.72rem",
    color: "#8aaccc",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },
  sourceChip: {
    background: "#eaf2fb",
    color: "#1a5a96",
    border: "1px solid #b8d4ec",
    borderRadius: "20px",
    padding: "2px 10px",
    fontSize: "0.72rem",
    fontWeight: "600",
  },

  // Typing indicator
  typingBubble: {
    background: "#ffffff",
    border: "1px solid #e2eaf2",
    borderRadius: "4px 18px 18px 18px",
    padding: "14px 18px",
    display: "flex",
    gap: "5px",
    alignItems: "center",
    width: "fit-content",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  typingDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#2563a8",
    opacity: 0.6,
  },

  // ── Input bar ────────────────────────────────────────────────
  inputBar: {
    padding: "14px 16px",
    background: "#eef1f6",
    borderTop: "1px solid #d8e3ed",
    borderRadius: "0 0 16px 16px",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#ffffff",
    borderRadius: "30px",
    border: "1.5px solid #c8d8e8",
    padding: "6px 6px 6px 18px",
    transition: "border-color 0.2s",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "0.92rem",
    color: "#1a2f45",
    fontFamily: "inherit",
  },
  sendBtn: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #1e4d73, #2563a8)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "16px",
    transition: "transform 0.1s, opacity 0.2s",
  },
  sendBtnDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
  },
  inputHint: {
    textAlign: "center",
    fontSize: "0.7rem",
    color: "#9ab0c4",
    marginTop: "8px",
  },
};

// ── Suggested questions ───────────────────────────────────────
const SUGGESTIONS = [
  "What is the leave policy for railway employees?",
  "Explain the process of railway budget allocation",
  "What are the inspection rules for station accounts?",
  "How is freight traffic managed on Indian Railways?",
];

// ── Format bot response text ──────────────────────────────────
function BotContent({ text }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div>
      {blocks.map((block, bi) => {
        const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
        if (!lines.length) return null;

        const isBullet   = lines.every(l => /^[-•*]\s/.test(l));
        const isNumbered = lines.every(l => /^\d+[.)]\s/.test(l));

        if (isBullet || isNumbered) {
          return (
            <ul key={bi} style={S.botList}>
              {lines.map((l, li) => {
                const clean = l.replace(/^([-•*]|\d+[.)]) /, "");
                const num   = isNumbered ? l.match(/^\d+/)?.[0] : null;
                return (
                  <li key={li} style={S.botListItem}>
                    <span style={S.listBullet}>{num ? `${num}.` : "▸"}</span>
                    <span>{renderInline(clean)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        const isLast = bi === blocks.length - 1;
        return (
          <p key={bi} style={isLast ? S.botParaLast : S.botPara}>
            {lines.map((l, li) => {
              const isBul = /^[-•*]\s/.test(l);
              const isNum = /^\d+[.)]\s/.test(l);
              if (isBul || isNum) {
                const clean = l.replace(/^([-•*]|\d+[.)]) /, "");
                return (
                  <span key={li} style={{ display: "block", paddingLeft: "12px" }}>
                    <span style={S.listBullet}>{isNum ? l.match(/^\d+/)?.[0] + "." : "▸"} </span>
                    {renderInline(clean)}
                  </span>
                );
              }
              return (
                <React.Fragment key={li}>
                  {renderInline(l)}{li < lines.length - 1 ? " " : ""}
                </React.Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <strong key={i} style={{ color: "#1a3a52", fontWeight: "600" }}>{p.slice(2, -2)}</strong>
      : p
  );
}

// ── Typing dots ───────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ ...S.msgRowBot }}>
      <div style={S.botAvatar}><img src={logo} alt="IR" style={{ width:"22px", height:"22px", objectFit:"contain", borderRadius:"50%" }} /></div>
      <div style={S.typingBubble}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              ...S.typingDot,
              animation: `dotBounce 1.2s ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Single message ────────────────────────────────────────────
function Message({ msg }) {
  if (msg.role === "user") {
    return (
      <div style={S.msgRowUser}>
        <div style={S.bubbleUser}>{msg.text}</div>
        <div style={S.userAvatar}>👤</div>
      </div>
    );
  }
  return (
    <div style={S.msgRowBot}>
      <div style={S.botAvatar}><img src={logo} alt="IR" style={{ width:"22px", height:"22px", objectFit:"contain", borderRadius:"50%" }} /></div>
      <div style={S.bubbleBot}>
        <BotContent text={msg.text} />
        {msg.sources?.length > 0 && (
          <div style={S.sourcesBar}>
            <span style={S.sourcesLabel}>SOURCES</span>
            {msg.sources.map((s, i) => (
              <span key={i} style={S.sourceChip}>{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Chat component ───────────────────────────────────────
export default function RailGPTChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");

    const next = [...messages, { role: "user", text: q }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: q }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages([...next, {
        role:    "bot",
        text:    data.answer || "No response received.",
        sources: data.sources || [],
      }]);
    } catch (err) {
      setMessages([...next, {
        role:    "bot",
        text:    "Unable to reach the server. Please ensure the backend is running.",
        sources: [],
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };



  return (
    <>
      {/* Keyframe injected once */}
      <style>{`
        @keyframes pulse {
          0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,0.2)}
          50%{box-shadow:0 0 0 6px rgba(34,197,94,0.08)}
        }
        @keyframes dotBounce {
          0%,80%,100%{transform:translateY(0);opacity:0.5}
          40%{transform:translateY(-6px);opacity:1}
        }
        .sug-chip:hover{background:#dceaf6!important;border-color:#2563a8!important}
        .send-btn:hover:not(:disabled){transform:scale(1.08)}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#c0cdd8;border-radius:4px}
      `}</style>

      <div style={S.page}>

        {/* ── HEADER CARD ─────────────────────────────────────── */}
        <div style={S.headerCard}>
          <div style={S.headerLeft}>
            <div style={S.logoCircle}>
              <img src={logo} alt="Indian Railways" style={{ width:"38px", height:"38px", objectFit:"contain", borderRadius:"50%" }} />
            </div>
            <div>
              <p style={S.headerTitle}>Rail GPT</p>
              <p style={S.headerSub}>Indian Railways AI Assistant</p>
            </div>
          </div>
          <div style={S.headerRight}>
            <div style={S.statusDot} />
            <span style={S.statusLabel}>Online</span>

          </div>
        </div>

        {/* ── CHAT CARD ────────────────────────────────────────── */}
        <div style={S.chatCard}>

          {/* Chat sub-header */}
          <div style={S.chatHeader}>
            <span style={S.chatHeaderIcon}>💬</span>
            <div>
              <p style={S.chatHeaderText}>Ask anything about Indian Railways</p>
              <p style={S.chatHeaderSub}>Powered by local AI • Your data stays private</p>
            </div>
          </div>

          {/* Messages */}
          <div style={S.messagesArea}>
            {messages.length === 0 && !loading ? (
              <div style={S.emptyState}>
                <img src={logo} alt="Indian Railways" style={{ width:"72px", height:"72px", objectFit:"contain", marginBottom:"4px" }} />
                <h2 style={S.emptyTitle}>Welcome to Rail GPT</h2>
                <p style={S.emptySub}>
                  Ask questions about railway rules, finance, administration,
                  and more — powered by your own documents.
                </p>
                <div style={S.suggestionsGrid}>
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      className="sug-chip"
                      style={S.suggestionChip}
                      onClick={() => send(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <Message key={i} msg={msg} />
                ))}
                {loading && <TypingDots />}
                <div ref={bottomRef} />
              </>
            )}
          </div>

          {/* Input bar */}
          <div style={S.inputBar}>
            <div style={S.inputWrap}>
              <input
                ref={inputRef}
                style={S.input}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything about Indian Railways…"
                disabled={loading}
              />
              <button
                className="send-btn"
                style={{
                  ...S.sendBtn,
                  ...((!input.trim() || loading) ? S.sendBtnDisabled : {}),
                }}
                onClick={() => send()}
                disabled={!input.trim() || loading}
              >
                ➤
              </button>
            </div>
            <p style={S.inputHint}>Press Enter to send · Shift+Enter for new line</p>
          </div>

        </div>{/* end chatCard */}

      </div>{/* end page */}
    </>
  );
}