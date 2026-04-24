import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const S = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(145deg, #1e3a4f 0%, #2a4f6a 40%, #1a3344 100%)",
    padding: "20px",
  },
  card: {
    maxWidth: "1400px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "22px",
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
  },
  header: {
    background: "linear-gradient(90deg, #1a3a52 0%, #234f6e 100%)",
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    margin: 0,
    color: "#fff",
    fontSize: "1.3rem",
    fontWeight: "600",
  },
  backBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    borderRadius: "10px",
    padding: "8px 16px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  content: {
    padding: "24px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "#f4f6f9",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #e2eaf2",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1a3a52",
    margin: "10px 0",
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "#6b8caa",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  section: {
    background: "#f4f6f9",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "20px",
    border: "1px solid #e2eaf2",
  },
  sectionTitle: {
    margin: "0 0 15px 0",
    fontSize: "1.1rem",
    color: "#1a3a52",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    background: "linear-gradient(135deg, #1e4d73, #2563a8)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    marginRight: "10px",
    marginBottom: "10px",
  },
  buttonSecondary: {
    background: "#eaf2fb",
    color: "#1e4d73",
    border: "1px solid #b8d4ec",
    borderRadius: "10px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginRight: "10px",
    marginBottom: "10px",
  },
  findingsList: {
    maxHeight: "400px",
    overflowY: "auto",
  },
  findingItem: {
    background: "#fff",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #e2eaf2",
  },
  findingText: {
    fontSize: "0.85rem",
    color: "#2d4a60",
    margin: "5px 0",
  },
  timestamp: {
    fontSize: "0.7rem",
    color: "#8aaccc",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#6b8caa",
  },
  alert: {
    background: "#ffe0e0",
    border: "1px solid #ffb8b8",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "20px",
    color: "#c62828",
  },
  success: {
    background: "#c8e6d9",
    border: "1px solid #81c784",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "20px",
    color: "#2e7d32",
  },
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const [findings, setFindings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [stats, setStats] = useState({ total: 0, helpful: 0, unhelpful: 0 });

  useEffect(() => {
    loadFindings();
    loadStats();
  }, []);

  const loadFindings = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/admin/findings");
      if (res.ok) {
        const data = await res.json();
        setFindings(data);
      }
    } catch (err) {
      console.error("Failed to load findings:", err);
    }
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.feedback || { total: 0, helpful: 0, unhelpful: 0 });
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const triggerLearning = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/admin/learn", { method: "POST" });
      if (res.ok) {
        setMessage({ type: "success", text: "Learning cycle triggered successfully!" });
        setTimeout(() => setMessage(null), 3000);
        loadFindings();
      } else {
        throw new Error("Failed to trigger learning");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to trigger learning cycle" });
      setTimeout(() => setMessage(null), 3000);
    }
    setLoading(false);
  };

  const clearCache = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/cache/clear", { method: "POST" });
      if (res.ok) {
        setMessage({ type: "success", text: "Cache cleared successfully!" });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to clear cache" });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const analyzeGaps = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/admin/analyze-gaps", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setMessage({ type: "success", text: `Found ${data.totalGaps || 0} knowledge gaps. Top: ${data.topGaps?.[0]?.query?.substring(0, 50) || "none"}` });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to analyze gaps" });
      setTimeout(() => setMessage(null), 3000);
    }
    setLoading(false);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div style={S.container}>
      <div style={S.card}>
        <div style={S.header}>
          <h1 style={S.headerTitle}>🧠 Autonomous Learning Admin</h1>
          <button style={S.backBtn} onClick={() => navigate('/')}>
            ← Back to Chat
          </button>
        </div>

        <div style={S.content}>
          {message && (
            <div style={message.type === "success" ? S.success : S.alert}>
              {message.text}
            </div>
          )}

          <div style={S.statsGrid}>
            <div style={S.statCard}>
              <div style={S.statLabel}>Total Feedback</div>
              <div style={S.statValue}>{stats.total}</div>
            </div>
            <div style={S.statCard}>
              <div style={S.statLabel}>Helpful Responses</div>
              <div style={S.statValue}>{stats.helpful}</div>
            </div>
            <div style={S.statCard}>
              <div style={S.statLabel}>Needs Improvement</div>
              <div style={S.statValue}>{stats.unhelpful}</div>
            </div>
            <div style={S.statCard}>
              <div style={S.statLabel}>Helpfulness Rate</div>
              <div style={S.statValue}>
                {stats.total > 0 ? ((stats.helpful / stats.total) * 100).toFixed(1) : 0}%
              </div>
            </div>
          </div>

          <div style={S.section}>
            <h3 style={S.sectionTitle}>⚡ Learning Actions</h3>
            <button style={S.button} onClick={triggerLearning} disabled={loading}>
              {loading ? "Running..." : "🔄 Run Learning Cycle"}
            </button>
            <button style={S.buttonSecondary} onClick={clearCache}>
              🗑️ Clear Cache
            </button>
            <button style={S.buttonSecondary} onClick={analyzeGaps} disabled={loading}>
              🔍 Analyze Knowledge Gaps
            </button>
          </div>

          {findings?.optimizedQueries?.length > 0 && (
            <div style={S.section}>
              <h3 style={S.sectionTitle}>✨ Optimized Queries (Auto-Learned)</h3>
              <div style={S.findingsList}>
                {findings.optimizedQueries.slice(-10).reverse().map((item, idx) => (
                  <div key={idx} style={S.findingItem}>
                    <div style={S.findingText}>
                      <strong>Original:</strong> {item.original}
                    </div>
                    <div style={S.findingText}>
                      <strong>Optimized:</strong> {item.optimized}
                    </div>
                    <div style={S.timestamp}>{formatDate(item.timestamp)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {findings?.inconsistencies?.length > 0 && (
            <div style={S.section}>
              <h3 style={S.sectionTitle}>⚠️ Detected Inconsistencies</h3>
              <div style={S.findingsList}>
                {findings.inconsistencies.slice(-10).reverse().map((item, idx) => (
                  <div key={idx} style={S.findingItem}>
                    <div style={S.findingText}>
                      <strong>Question:</strong> {item.question?.substring(0, 100)}
                    </div>
                    <div style={S.findingText}>
                      <strong>Consistency Score:</strong> {item.consistencyScore}/10
                    </div>
                    <div style={S.timestamp}>{formatDate(item.timestamp)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {findings?.learningCycles?.length > 0 && (
            <div style={S.section}>
              <h3 style={S.sectionTitle}>📊 Learning Cycle History</h3>
              <div style={S.findingsList}>
                {findings.learningCycles.slice(-10).reverse().map((item, idx) => (
                  <div key={idx} style={S.findingItem}>
                    <div style={S.findingText}>
                      <strong>Action:</strong> {item.action}
                    </div>
                    {item.duration_seconds && (
                      <div style={S.findingText}>
                        <strong>Duration:</strong> {item.duration_seconds}s
                      </div>
                    )}
                    {item.cacheSize !== undefined && (
                      <div style={S.findingText}>
                        <strong>Cache Size:</strong> {item.cacheSize}
                      </div>
                    )}
                    <div style={S.timestamp}>{formatDate(item.timestamp)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && !findings && (
            <div style={S.loading}>Loading learning data...</div>
          )}

          {!loading && (!findings || (findings.optimizedQueries?.length === 0 && findings.inconsistencies?.length === 0)) && (
            <div style={S.loading}>
              No learning data yet. The system will start learning as users interact with it.
              <br /><br />
              <small>Try asking some questions to generate learning data!</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}