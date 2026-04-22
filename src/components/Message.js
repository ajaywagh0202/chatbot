import React from "react";
import logo from "../indian.png";
// ── Lightweight text formatter — no external deps needed ──────
// Handles: numbered lists, dash bullets, bold (**text**), blank-line paragraphs
function FormattedText({ text }) {
  if (!text) return null;

  // Split into blocks by blank lines
  const blocks = text.split(/\n{2,}/);

  return (
    <div className="formatted-text">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
        if (!lines.length) return null;

        // Detect if ALL lines are list items
        const isNumbered = lines.every(l => /^\d+[\.\)]\s/.test(l));
        const isBullet   = lines.every(l => /^[-•*]\s/.test(l));

        // ── Numbered list ─────────────────────────────────────
        if (isNumbered) {
          return (
            <ol key={bi} className="msg-list msg-list--numbered">
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^\d+[\.\)]\s+/, ""))}</li>
              ))}
            </ol>
          );
        }

        // ── Bullet list ───────────────────────────────────────
        if (isBullet) {
          return (
            <ul key={bi} className="msg-list msg-list--bullet">
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^[-•*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        // ── Mixed block: render line by line ──────────────────
        return (
          <p key={bi} className="msg-para">
            {lines.map((l, li) => {
              const isNum = /^\d+[\.\)]\s/.test(l);
              const isBul = /^[-•*]\s/.test(l);
              if (isNum || isBul) {
                const clean = l.replace(/^(\d+[\.\)]|[-•*])\s+/, "");
                return (
                  <span key={li} className="msg-inline-item">
                    {isNum ? `${l.match(/^\d+/)[0]}. ` : "• "}
                    {renderInline(clean)}
                  </span>
                );
              }
              return <React.Fragment key={li}>{renderInline(l)}{li < lines.length - 1 ? " " : ""}</React.Fragment>;
            })}
          </p>
        );
      })}
    </div>
  );
}

/** Render inline bold (**text**) and keep plain text */
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

// ── Main Message component ────────────────────────────────────
export default function Message({ msg }) {
  const isBot  = msg.role === "bot";
  const isUser = msg.role === "user";

  return (
    <div className={`message-wrapper ${isUser ? "user-wrapper" : "bot-wrapper"}`}>
      {/* Avatar */}
      {isBot && (
        <div className="avatar bot-avatar" aria-label="Rail GPT">
          <image src={logo} alt="Rail GPT"/>
        </div>
      )}

      <div className={`message-bubble ${isUser ? "user-bubble" : "bot-bubble"}`}>

        {/* Message body */}
        {isBot
          ? <FormattedText text={msg.text} />
          : <p className="msg-para">{msg.text}</p>
        }

        {/* Sources footer */}
        {isBot && msg.sources?.length > 0 && (
          <div className="sources-footer">
            <span className="sources-label">📄 Sources:</span>
            {msg.sources.map((s, i) => (
              <span key={i} className="source-chip">{s}</span>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="avatar user-avatar" aria-label="You">
          👤
        </div>
      )}
    </div>
  );
}