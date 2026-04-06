/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useCallback } from "react";

const CATEGORIES = ["Marketing", "Design", "Web Development", "CCTV", "News", "Case Study", "General"];

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const Icons = {
  posts:   "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  plus:    "M12 4v16m8-8H4",
  edit:    "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  trash:   "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  logout:  "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  home:    "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  search:  "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  back:    "M10 19l-7-7m0 0l7-7m-7 7h18",
  lock:    "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  warn:    "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  check:   "M5 13l4 4L19 7",
  eye:     "M15 12a3 3 0 11-6 0 3 3 0 016 0zm-4.5 0a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0zM3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z",
  stats:   "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
};

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #09090f;
    --surface: #111118;
    --surface2: #16161f;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #f0f0f5;
    --muted: #6b6b80;
    --muted2: #9090a8;
    --sky: #38bdf8;
    --sky-dim: rgba(56,189,248,0.15);
    --red: #f87171;
    --red-dim: rgba(248,113,113,0.12);
    --green: #4ade80;
    --green-dim: rgba(74,222,128,0.12);
    --amber: #fbbf24;
    --amber-dim: rgba(251,191,36,0.12);
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }

  .grid-bg {
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  /* scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

  /* transitions */
  .fade-in { animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

  .spin { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* inputs */
  input, textarea, select {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border2);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 10px 14px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  input::placeholder, textarea::placeholder { color: var(--muted); }
  input:focus, textarea:focus, select:focus { border-color: var(--sky); background: rgba(56,189,248,0.05); }
  select option { background: #1a1a2e; }

  /* toggle */
  .toggle { position: relative; display: inline-flex; align-items: center; cursor: pointer; gap: 10px; }
  .toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .toggle-track {
    width: 44px; height: 24px; background: rgba(255,255,255,0.1);
    border-radius: 99px; transition: background 0.25s; position: relative; flex-shrink: 0;
  }
  .toggle input:checked + .toggle-track { background: var(--sky); }
  .toggle-thumb {
    position: absolute; top: 3px; left: 3px; width: 18px; height: 18px;
    background: white; border-radius: 50%; transition: transform 0.25s;
  }
  .toggle input:checked ~ .toggle-thumb { transform: translateX(20px); }

  /* badge */
  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 600;
    letter-spacing: 0.04em; text-transform: uppercase;
  }
  .badge-dot { width: 5px; height: 5px; border-radius: 50%; }
  .badge-green { background: var(--green-dim); color: var(--green); }
  .badge-green .badge-dot { background: var(--green); }
  .badge-amber { background: var(--amber-dim); color: var(--amber); }
  .badge-amber .badge-dot { background: var(--amber); }

  /* btn */
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 10px; font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 600; cursor: pointer; border: none;
    transition: all 0.18s; white-space: nowrap;
  }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-sky { background: var(--sky); color: #0a0a0f; }
  .btn-sky:not(:disabled):hover { background: #7dd3fc; }
  .btn-ghost { background: transparent; color: var(--muted2); border: 1px solid var(--border2); }
  .btn-ghost:not(:disabled):hover { background: rgba(255,255,255,0.05); color: var(--text); }
  .btn-red { background: var(--red-dim); color: var(--red); border: 1px solid rgba(248,113,113,0.2); }
  .btn-red:not(:disabled):hover { background: rgba(248,113,113,0.22); }

  /* card */
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; }

  /* sidebar nav item */
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 10px; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s; color: var(--muted2); border: none; background: none; width: 100%;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-item:hover { background: rgba(255,255,255,0.05); color: var(--text); }
  .nav-item.active { background: var(--sky-dim); color: var(--sky); }
  .nav-item.danger:hover { background: var(--red-dim); color: var(--red); }

  /* table */
  .table-row {
    display: grid; align-items: center;
    border-bottom: 1px solid var(--border);
    transition: background 0.12s;
  }
  .table-row:last-child { border-bottom: none; }
  .table-row:hover { background: rgba(255,255,255,0.02); }

  /* modal overlay */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.65);
    backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center;
    z-index: 100; padding: 20px;
  }
  .modal-box {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 20px; padding: 36px; max-width: 420px; width: 100%;
    box-shadow: 0 40px 80px rgba(0,0,0,0.5);
  }

  /* stat card */
  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 20px 24px;
  }
  .stat-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .stat-value { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; }

  /* toaster */
  .toast {
    position: fixed; bottom: 28px; right: 28px; z-index: 999;
    background: var(--surface2); border: 1px solid var(--border2);
    border-radius: 12px; padding: 14px 20px; display: flex; align-items: center; gap: 10px;
    font-size: 13px; font-weight: 500; box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }

  /* form section */
  .form-section { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 22px; }
  .form-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; display: block; }
`;

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, []);
  const color = type === "success" ? "var(--green)" : "var(--red)";
  return (
    <div className="toast">
      <Icon d={type === "success" ? Icons.check : Icons.warn} size={16} style={{ color, flexShrink: 0 }} />
      <span>{msg}</span>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Invalid credentials");
      } else {
        onLogin();
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }} className="grid-bg">
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="fade-in" style={{ width: "100%", maxWidth: 420 }}>
        <div className="card" style={{ padding: "44px 40px" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ width: 56, height: 56, background: "var(--sky-dim)", border: "1px solid rgba(56,189,248,0.25)", borderRadius: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Icon d={Icons.lock} size={24} style={{ color: "var(--sky)" }} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Admin Portal</h1>
            <p style={{ color: "var(--muted)", fontSize: 13 }}>VisioAd Content Management</p>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="form-label">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@visioad.com" required />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required />
            </div>

            {err && (
              <div style={{ background: "var(--red-dim)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, padding: "10px 14px", color: "var(--red)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                <Icon d={Icons.warn} size={15} />
                {err}
              </div>
            )}

            <button type="submit" className="btn btn-sky" disabled={loading} style={{ justifyContent: "center", marginTop: 4, padding: "12px" }}>
              {loading ? <svg className="spin" width={16} height={16} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10" /></svg> : null}
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 11, marginTop: 24, lineHeight: 1.6 }}>
            
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ view, setView, onLogout }) {
  return (
    <aside style={{ width: 220, flexShrink: 0, background: "var(--surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}>
      <div style={{ padding: "24px 18px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: "var(--sky)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 14, color: "#0a0a0f" }}>V</span>
          </div>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14 }}>VisioAd</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Admin Panel</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
        <button className={`nav-item ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>
          <Icon d={Icons.posts} size={16} /> Blog Posts
        </button>
        <button className={`nav-item ${view === "stats" ? "active" : ""}`} onClick={() => setView("stats")}>
          <Icon d={Icons.stats} size={16} /> Statistics
        </button>
        <button className="nav-item" onClick={() => window.open("/", "_blank")}>
          <Icon d={Icons.home} size={16} /> View Site
        </button>
      </nav>

      <div style={{ padding: "10px 10px 18px" }}>
        <button className="nav-item danger" onClick={onLogout} style={{ width: "100%" }}>
          <Icon d={Icons.logout} size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}

// ─── POSTS LIST ──────────────────────────────────────────────────────────────
function PostsList({ posts, onNew, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "published" ? p.published : !p.published);
    return matchSearch && matchFilter;
  });

  return (
    <div className="fade-in" style={{ padding: "32px 36px", flex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Blog Posts</h1>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>{posts.length} total articles</p>
        </div>
        <button className="btn btn-sky" onClick={onNew}>
          <Icon d={Icons.plus} size={15} /> New Post
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Total", value: posts.length, color: "var(--sky)" },
          { label: "Published", value: posts.filter(p => p.published).length, color: "var(--green)" },
          { label: "Drafts", value: posts.filter(p => !p.published).length, color: "var(--amber)" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }}>
            <Icon d={Icons.search} size={15} />
          </span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…" style={{ paddingLeft: 38 }} />
        </div>
        {["all", "published", "drafts"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className="btn" style={{
            background: filter === f ? "var(--sky-dim)" : "transparent",
            color: filter === f ? "var(--sky)" : "var(--muted2)",
            border: `1px solid ${filter === f ? "rgba(56,189,248,0.25)" : "var(--border2)"}`,
            textTransform: "capitalize", fontSize: 12,
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        {/* Header row */}
        <div className="table-row" style={{ gridTemplateColumns: "2fr 120px 110px 120px 90px", padding: "10px 20px", background: "rgba(255,255,255,0.02)" }}>
          {["Title", "Category", "Status", "Date", ""].map((h, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", textAlign: i === 4 ? "right" : "left" }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
            <Icon d={Icons.posts} size={40} style={{ opacity: 0.2, display: "block", margin: "0 auto 12px" }} />
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, marginBottom: 4 }}>No posts found</p>
            <p style={{ fontSize: 13 }}>{search ? "Try a different search term" : "Create your first post"}</p>
          </div>
        ) : filtered.map(post => (
          <div key={post._id || post.id} className="table-row" style={{ gridTemplateColumns: "2fr 120px 110px 120px 90px", padding: "14px 20px" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>/{post.slug}</div>
            </div>
            <div>
              <span style={{ background: "rgba(255,255,255,0.07)", padding: "3px 9px", borderRadius: 6, fontSize: 12, color: "var(--muted2)" }}>{post.category}</span>
            </div>
            <div>
              <span className={`badge ${post.published ? "badge-green" : "badge-amber"}`}>
                <span className="badge-dot" />
                {post.published ? "Live" : "Draft"}
              </span>
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
            <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
              <button onClick={() => onEdit(post)} title="Edit" style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: 8, color: "var(--muted)", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--sky-dim)"; e.currentTarget.style.color = "var(--sky)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}>
                <Icon d={Icons.edit} size={15} />
              </button>
              <button onClick={() => onDelete(post)} title="Delete" style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: 8, color: "var(--muted)", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--red-dim)"; e.currentTarget.style.color = "var(--red)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--muted)"; }}>
                <Icon d={Icons.trash} size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STATISTICS ───────────────────────────────────────────────────────────────
function Statistics({ posts }) {
  const byCategory = CATEGORIES.map(cat => ({
    cat,
    count: posts.filter(p => p.category === cat).length,
  })).filter(x => x.count > 0).sort((a, b) => b.count - a.count);

  const max = Math.max(...byCategory.map(x => x.count), 1);

  return (
    <div className="fade-in" style={{ padding: "32px 36px", flex: 1 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 28 }}>Statistics</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Summary */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 18, color: "var(--muted2)" }}>OVERVIEW</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Total Posts", val: posts.length, color: "var(--sky)" },
              { label: "Published", val: posts.filter(p => p.published).length, color: "var(--green)" },
              { label: "Drafts", val: posts.filter(p => !p.published).length, color: "var(--amber)" },
              { label: "Publish Rate", val: `${posts.length ? Math.round(posts.filter(p => p.published).length / posts.length * 100) : 0}%`, color: "var(--sky)" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--muted2)" }}>{item.label}</span>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: item.color }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By Category */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 18, color: "var(--muted2)" }}>BY CATEGORY</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {byCategory.length === 0
              ? <p style={{ color: "var(--muted)", fontSize: 13 }}>No posts yet</p>
              : byCategory.map(({ cat, count }) => (
                <div key={cat}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
                    <span style={{ color: "var(--muted2)" }}>{cat}</span>
                    <span style={{ fontWeight: 600 }}>{count}</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 99 }}>
                    <div style={{ height: "100%", width: `${count / max * 100}%`, background: "var(--sky)", borderRadius: 99, transition: "width 0.6s ease" }} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── POST FORM ────────────────────────────────────────────────────────────────
function PostFormView({ post, onSave, onCancel }) {
  const postId = post?._id || post?.id || null;
  const isEdit = !!postId;
  const blank = { title: "", slug: "", excerpt: "", content: "", coverImage: "", category: "General", published: false };
  const [form, setForm] = useState(
    post ? { title: post.title || "", slug: post.slug || "", excerpt: post.excerpt || "",
              content: post.content || "", coverImage: post.coverImage || "",
              category: post.category || "General", published: post.published || false } : blank
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "title" && !isEdit) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      return next;
    });
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) { setErr("Title is required."); return; }
    if (!form.content.trim()) { setErr("Content is required."); return; }
    setSaving(true);
    setErr("");
    try {
      const url    = "/api/posts";
      const method = isEdit ? "PUT" : "POST";
      const payload = isEdit ? { ...form, id: postId } : form;
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Failed to save post");
      } else {
        onSave(data);
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fade-in" style={{ padding: "32px 36px", flex: 1, maxWidth: 760 }}>
      {/* Back */}
      <button className="btn btn-ghost" style={{ marginBottom: 24, fontSize: 12 }} onClick={onCancel}>
        <Icon d={Icons.back} size={14} /> Back to Posts
      </button>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{isEdit ? "Edit Post" : "New Post"}</h1>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>{isEdit ? "Update existing article" : "Create a new article"}</p>
        </div>
        <label className="toggle">
          <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
          <div className="toggle-track"><div className="toggle-thumb" /></div>
          <span style={{ fontSize: 13, color: form.published ? "var(--green)" : "var(--muted2)", fontWeight: 500 }}>
            {form.published ? "Published" : "Draft"}
          </span>
        </label>
      </div>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Title */}
        <div className="form-section">
          <label className="form-label">Title *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Enter a compelling title…" style={{ background: "transparent", border: "none", fontSize: 18, fontFamily: "Syne, sans-serif", fontWeight: 700, padding: "4px 0", borderRadius: 0 }} required />
        </div>

        {/* Slug + Category */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="form-section">
            <label className="form-label">Slug</label>
            <input name="slug" value={form.slug} onChange={handleChange} placeholder="auto-generated-slug" style={{ fontSize: 13 }} />
          </div>
          <div className="form-section">
            <label className="form-label">Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Cover Image */}
        <div className="form-section">
          <label className="form-label">Cover Image URL</label>
          <input name="coverImage" value={form.coverImage} onChange={handleChange} placeholder="https://example.com/image.jpg" style={{ fontSize: 13 }} />
          {form.coverImage && (
            <div style={{ marginTop: 12, borderRadius: 10, overflow: "hidden", height: 160 }}>
              <img src={form.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <div className="form-section">
          <label className="form-label">Excerpt</label>
          <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Short summary shown in listings…" rows={3} style={{ resize: "vertical" }} />
        </div>

        {/* Content */}
        <div className="form-section">
          <label className="form-label">Content *</label>
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Write your article here… Markdown supported." rows={14} style={{ resize: "vertical", fontFamily: "monospace", fontSize: 13, lineHeight: 1.7 }} required />
        </div>

        {err && (
          <div style={{ background: "var(--red-dim)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, padding: "10px 14px", color: "var(--red)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={Icons.warn} size={15} /> {err}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingBottom: 32 }}>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-sky" disabled={saving}>
            {saving && <svg className="spin" width={14} height={14} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10" /></svg>}
            {saving ? "Saving…" : isEdit ? "Save Changes →" : "Publish Post →"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── DELETE MODAL ─────────────────────────────────────────────────────────────
function DeleteModal({ post, onConfirm, onCancel }) {
  const [deleting, setDeleting] = useState(false);
  function confirm() {
    setDeleting(true);
    setTimeout(() => { onConfirm(); setDeleting(false); }, 400);
  }
  return (
    <div className="modal-overlay">
      <div className="modal-box fade-in">
        <div style={{ width: 52, height: 52, background: "var(--red-dim)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Icon d={Icons.warn} size={24} style={{ color: "var(--red)" }} />
        </div>
        <h2 style={{ textAlign: "center", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Delete Post?</h2>
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 13, marginBottom: 6 }}>
          You re about to permanently delete:
        </p>
        <p style={{ textAlign: "center", fontWeight: 600, fontSize: 14, marginBottom: 28, padding: "0 10px" }}>&quot;{post.title}&quot;
          
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onCancel}>Cancel</button>
          <button className="btn btn-red" style={{ flex: 1, justifyContent: "center" }} onClick={confirm} disabled={deleting}>
            {deleting ? "Deleting…" : "Delete Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/posts", { credentials: "include" });
      if (res.ok) setPosts(await res.json());
    } catch (e) {
      console.error("Failed to fetch posts", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) fetchPosts();
  }, [authed]);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
  }

  function handleSave(savedPost) {
    const isEdit = posts.some(p => (p._id || p.id) === (savedPost._id || savedPost.id));
    setPosts(prev =>
      isEdit
        ? prev.map(p => (p._id || p.id) === (savedPost._id || savedPost.id) ? savedPost : p)
        : [savedPost, ...prev]
    );
    setView("list");
    setEditing(null);
    showToast(isEdit ? "Post updated!" : "Post created!");
  }

  async function handleDelete() {
    const id = toDelete._id || toDelete.id;
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE", credentials: "include" });
      setPosts(prev => prev.filter(p => (p._id || p.id) !== id));
      showToast("Post deleted.");
    } catch {
      showToast("Failed to delete post.", "error");
    }
    setToDelete(null);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthed(false);
    setPosts([]);
  }

  if (!authed) return (
    <>
      <style>{CSS}</style>
      <Login onLogin={() => setAuthed(true)} />
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar
          view={view}
          setView={v => { setView(v); setEditing(null); }}
          onLogout={handleLogout}
        />

        <main style={{ flex: 1, overflowY: "auto" }}>
          {view === "list" && (
            <PostsList
              posts={posts}
              loading={loading}
              onNew={() => { setEditing(null); setView("form"); }}
              onEdit={p => { setEditing(p); setView("form"); }}
              onDelete={p => setToDelete(p)}
            />
          )}
          {view === "form" && (
            <PostFormView
              post={editing}
              onSave={handleSave}
              onCancel={() => { setView("list"); setEditing(null); }}
            />
          )}
          {view === "stats" && <Statistics posts={posts} />}
        </main>
      </div>

      {toDelete && <DeleteModal post={toDelete} onConfirm={handleDelete} onCancel={() => setToDelete(null)} />}
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </>
  );
}