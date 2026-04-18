import { useState, useEffect, useRef } from "react";

// ─── GLOBALS ────────────────────────────────────────────────────────────────
const COLORS = {
  bg1: "#0A0F1C",
  bg2: "#121826",
  blue: "#1EA7FF",
  deepBlue: "#0B5FFF",
  violet: "#6A5CFF",
  cyan: "#00E0FF",
  light: "#EAF2FF",
};

const NAV_LINKS = ["Features", "How It Works", "Pricing", "About", "Blog", "Contact"];

// ─── PARTICLE CANVAS ────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      a: Math.random(),
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,224,255,${p.a * 0.7})`;
        ctx.fill();
      });
      particles.forEach((a, i) => particles.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(30,167,255,${(1 - d / 120) * 0.15})`;
          ctx.stroke();
        }
      }));
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

// ─── QR ANIMATION ───────────────────────────────────────────────────────────
function QRScan() {
  const [scanY, setScanY] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setScanY(y => (y + 2) % 100), 16);
    return () => clearInterval(interval);
  }, []);
  const cells = Array.from({ length: 49 }, (_, i) => i);
  const corners = [0, 1, 2, 7, 8, 9, 14, 15, 16, 32, 33, 34, 39, 40, 41, 46, 47, 48];
  return (
    <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, padding: 10, background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(0,224,255,0.3)", backdropFilter: "blur(10px)" }}>
        {cells.map(i => (
          <div key={i} style={{ width: "100%", paddingBottom: "100%", background: corners.includes(i) ? "#00E0FF" : Math.random() > 0.5 ? "rgba(30,167,255,0.8)" : "transparent", borderRadius: 2 }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 10, right: 10, top: `${scanY}%`, height: 2, background: "linear-gradient(90deg,transparent,#00E0FF,transparent)", boxShadow: "0 0 8px #00E0FF", borderRadius: 2, transition: "top 16ms linear" }} />
      <div style={{ position: "absolute", top: 4, left: 4, width: 16, height: 16, borderTop: "2px solid #00E0FF", borderLeft: "2px solid #00E0FF", borderRadius: "4px 0 0 0" }} />
      <div style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderTop: "2px solid #00E0FF", borderRight: "2px solid #00E0FF", borderRadius: "0 4px 0 0" }} />
      <div style={{ position: "absolute", bottom: 4, left: 4, width: 16, height: 16, borderBottom: "2px solid #00E0FF", borderLeft: "2px solid #00E0FF", borderRadius: "0 0 0 4px" }} />
      <div style={{ position: "absolute", bottom: 4, right: 4, width: 16, height: 16, borderBottom: "2px solid #00E0FF", borderRight: "2px solid #00E0FF", borderRadius: "0 0 4px 0" }} />
    </div>
  );
}

// ─── GLASS CARD ─────────────────────────────────────────────────────────────
const GlassCard = ({ children, style = {}, glow }) => (
  <div style={{
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    border: `1px solid rgba(${glow || "0,224,255"},0.2)`,
    borderRadius: 20,
    boxShadow: `0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`,
    ...style,
  }}>{children}</div>
);

// ─── GLOW BUTTON ────────────────────────────────────────────────────────────
const GlowBtn = ({ children, variant = "primary", onClick, style = {} }) => {
  const isPrimary = variant === "primary";
  return (
    <button onClick={onClick} style={{
      padding: "14px 32px", borderRadius: 50, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 15,
      fontFamily: "'Exo 2', sans-serif", letterSpacing: 0.5, transition: "all 0.3s",
      background: isPrimary ? "linear-gradient(135deg,#1EA7FF,#6A5CFF)" : "transparent",
      color: isPrimary ? "#fff" : "#1EA7FF",
      border: isPrimary ? "none" : "1px solid rgba(30,167,255,0.5)",
      boxShadow: isPrimary ? "0 0 30px rgba(30,167,255,0.4), 0 4px 20px rgba(0,0,0,0.3)" : "none",
      ...style,
    }}>{children}</button>
  );
};

// ─── STAR RATING ────────────────────────────────────────────────────────────
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)} onClick={() => onChange(s)}
          style={{ fontSize: 36, cursor: "pointer", transition: "transform 0.2s", transform: (hovered || value) >= s ? "scale(1.2)" : "scale(1)", color: (hovered || value) >= s ? "#FFD700" : "rgba(255,255,255,0.2)" }}>★</span>
      ))}
    </div>
  );
}

// ─── AI REVIEW SUGGESTIONS ──────────────────────────────────────────────────
const REVIEW_SUGGESTIONS = {
  5: ["Absolutely exceptional service! The team went above and beyond every expectation. Highly recommend to everyone!", "Outstanding experience from start to finish. The professionalism and attention to detail were truly remarkable.", "Five stars without hesitation! Everything was perfect — the service, the staff, and the results. Will definitely return!"],
  4: ["Great experience overall! Minor things could be improved but the service was genuinely impressive and I'll be back.", "Really pleased with my visit. The team was helpful and the quality exceeded my expectations in most areas.", "Very good service! A few small tweaks would make it perfect, but overall a wonderful and memorable experience."],
  3: ["Decent experience. Some aspects were great while others have room for improvement. Would consider returning.", "Average service — not bad but not outstanding. The staff were friendly which made the difference.", "It was okay. A mixed bag overall, but the positives outweigh the negatives. Might try again."],
};

// ─── CUSTOMER DEMO ───────────────────────────────────────────────────────────
function CustomerDemo() {
  const [step, setStep] = useState(0);
  const [stars, setStars] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const suggestions = stars >= 3 ? REVIEW_SUGGESTIONS[stars] || REVIEW_SUGGESTIONS[5] : [];
  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      {submitted ? (
        <GlassCard style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
          <h3 style={{ color: "#00E0FF", marginBottom: 8, fontFamily: "'Orbitron', sans-serif" }}>Review Submitted!</h3>
          <p style={{ color: "#EAF2FF", opacity: 0.7, marginBottom: 20 }}>Redirecting you to Google Reviews…</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
            {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 24, color: s <= stars ? "#FFD700" : "rgba(255,255,255,0.2)" }}>★</span>)}
          </div>
          <div style={{ padding: "12px 20px", background: "rgba(30,167,255,0.1)", borderRadius: 12, border: "1px solid rgba(30,167,255,0.3)", color: "#EAF2FF", fontSize: 13, fontStyle: "italic", opacity: 0.85 }}>{selected}</div>
          <div style={{ marginTop: 20, padding: "8px 20px", background: "rgba(255,255,255,0.05)", borderRadius: 50, display: "inline-block", color: "#00E0FF", fontSize: 12 }}>→ google.com/maps/... (simulated)</div>
          <GlowBtn style={{ marginTop: 20 }} onClick={() => { setSubmitted(false); setStars(0); setSelected(null); setStep(0); }}>Try Again</GlowBtn>
        </GlassCard>
      ) : (
        <GlassCard style={{ padding: 32 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, background: "linear-gradient(135deg,#1EA7FF,#6A5CFF)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 22 }}>⭐</div>
            <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 16, marginBottom: 4 }}>Rate Your Experience</h3>
            <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 13 }}>Tap a star to get AI-generated reviews</p>
          </div>
          <StarRating value={stars} onChange={(s) => { setStars(s); setSelected(null); }} />
          {stars > 0 && stars < 3 && (
            <div style={{ marginTop: 20, padding: 16, background: "rgba(255,100,100,0.1)", borderRadius: 12, border: "1px solid rgba(255,100,100,0.2)", textAlign: "center" }}>
              <p style={{ color: "#FF6B6B", fontSize: 13, margin: 0 }}>💬 We're sorry to hear that. Your feedback will be sent privately to the business owner to help them improve.</p>
              <GlowBtn style={{ marginTop: 12, fontSize: 13, padding: "10px 20px" }} onClick={() => setSubmitted(true)}>Send Private Feedback</GlowBtn>
            </div>
          )}
          {stars >= 3 && (
            <div style={{ marginTop: 24 }}>
              <p style={{ color: "rgba(234,242,255,0.6)", fontSize: 12, textAlign: "center", marginBottom: 12 }}>✨ AI-Generated Review Suggestions</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {suggestions.map((s, i) => (
                  <div key={i} onClick={() => setSelected(s)} style={{ padding: 14, borderRadius: 12, background: selected === s ? "rgba(30,167,255,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${selected === s ? "#1EA7FF" : "rgba(255,255,255,0.1)"}`, cursor: "pointer", color: "#EAF2FF", fontSize: 13, lineHeight: 1.5, transition: "all 0.2s" }}>
                    {selected === s && <span style={{ color: "#00E0FF", marginRight: 6 }}>✓</span>}{s}
                  </div>
                ))}
              </div>
              {selected && (
                <GlowBtn style={{ marginTop: 16, width: "100%" }} onClick={() => setSubmitted(true)}>
                  🚀 Submit to Google Reviews
                </GlowBtn>
              )}
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
}

// ─── BUSINESS DASHBOARD DEMO ─────────────────────────────────────────────────
function BusinessDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 2000); return () => clearInterval(t); }, []);
  const scans = 1247 + tick * 3;
  const reviews = 893 + tick * 2;
  const positive = Math.round(reviews * 0.87);
  const privateF = reviews - positive;
  const stats = [
    { label: "Total Scans", value: scans.toLocaleString(), icon: "📡", color: "#1EA7FF" },
    { label: "Reviews Generated", value: reviews.toLocaleString(), icon: "⭐", color: "#FFD700" },
    { label: "Google Redirects", value: positive.toLocaleString(), icon: "🚀", color: "#00E0FF" },
    { label: "Private Feedback", value: privateF.toLocaleString(), icon: "🔒", color: "#6A5CFF" },
  ];
  const feedbacks = [
    { name: "Sarah M.", rating: 5, time: "2m ago", text: "Absolutely exceptional service!" },
    { name: "Ahmed K.", rating: 5, time: "8m ago", text: "Outstanding experience from start to finish." },
    { name: "Priya S.", rating: 4, time: "15m ago", text: "Really pleased with my visit. Great team!" },
    { name: "James R.", rating: 5, time: "22m ago", text: "Five stars without hesitation. Will return!" },
  ];
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <GlassCard style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 14, margin: 0 }}>Business Dashboard</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, background: "#00E0FF", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#00E0FF", fontSize: 11 }}>LIVE</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: 16, background: "rgba(255,255,255,0.03)", borderRadius: 14, border: `1px solid rgba(255,255,255,0.08)` }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: s.color, fontSize: 22, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{s.value}</div>
              <div style={{ color: "rgba(234,242,255,0.5)", fontSize: 11, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "rgba(234,242,255,0.6)", fontSize: 12 }}>Positive → Google</span>
            <span style={{ color: "#00E0FF", fontSize: 12 }}>87%</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: "87%", height: "100%", background: "linear-gradient(90deg,#1EA7FF,#00E0FF)", borderRadius: 3, transition: "width 1s" }} />
          </div>
        </div>
        <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 12, marginBottom: 12 }}>Recent Feedback</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {feedbacks.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#1EA7FF,#6A5CFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{f.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <span style={{ color: "#EAF2FF", fontSize: 12, fontWeight: 600 }}>{f.name}</span>
                  <span style={{ color: "#FFD700", fontSize: 10 }}>{"★".repeat(f.rating)}</span>
                </div>
                <div style={{ color: "rgba(234,242,255,0.5)", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.text}</div>
              </div>
              <span style={{ color: "rgba(234,242,255,0.3)", fontSize: 10, flexShrink: 0 }}>{f.time}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ─── PRICING CARD ────────────────────────────────────────────────────────────
function PricingCard({ plan, price, features, popular }) {
  return (
    <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 320 }}>
      {popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#1EA7FF,#6A5CFF)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 50, whiteSpace: "nowrap", zIndex: 1 }}>🔥 MOST POPULAR</div>}
      <GlassCard glow={popular ? "30,167,255" : "255,255,255"} style={{ padding: 32, height: "100%", boxSizing: "border-box", ...(popular ? { border: "1px solid rgba(30,167,255,0.5)", boxShadow: "0 0 40px rgba(30,167,255,0.2), 0 8px 40px rgba(0,0,0,0.4)" } : {}) }}>
        <h3 style={{ color: popular ? "#1EA7FF" : "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 16, marginBottom: 8 }}>{plan}</h3>
        <div style={{ marginBottom: 24 }}>
          <span style={{ color: "#EAF2FF", fontSize: 42, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>AED {price}</span>
          <span style={{ color: "rgba(234,242,255,0.4)", fontSize: 14 }}>/mo</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#00E0FF", marginTop: 1 }}>✓</span>
              <span style={{ color: "rgba(234,242,255,0.7)", fontSize: 13 }}>{f}</span>
            </div>
          ))}
        </div>
        <GlowBtn variant={popular ? "primary" : "secondary"} style={{ width: "100%" }}>Get Started</GlowBtn>
      </GlassCard>
    </div>
  );
}

// ─── FAQ ITEM ────────────────────────────────────────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "none", border: "none", color: "#EAF2FF", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontSize: 15, fontWeight: 600, textAlign: "left", gap: 16 }}>
        <span>{q}</span>
        <span style={{ color: "#1EA7FF", fontSize: 20, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
      </button>
      {open && <p style={{ color: "rgba(234,242,255,0.6)", fontSize: 14, lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>{a}</p>}
    </div>
  );
}

// ─── FULL DASHBOARD ──────────────────────────────────────────────────────────
function FullDashboard({ onClose }) {
  const [activeTab, setActiveTab] = useState("client");
  const tabs = ["client", "admin", "demo", "superadmin"];
  const [qrGenerated, setQrGenerated] = useState(false);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0A0F1C", zIndex: 1000, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Topbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(18,24,38,0.9)", backdropFilter: "blur(20px)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#1EA7FF,#6A5CFF)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>R</div>
          <span style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 14, fontWeight: 700 }}>Reviox AI</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "'Exo 2', sans-serif", textTransform: "uppercase", letterSpacing: 0.5, background: activeTab === t ? "linear-gradient(135deg,#1EA7FF,#6A5CFF)" : "transparent", color: activeTab === t ? "#fff" : "rgba(234,242,255,0.5)", transition: "all 0.2s" }}>
              {t === "superadmin" ? "Super Admin" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EAF2FF", borderRadius: 8, padding: "6px 16px", cursor: "pointer", fontFamily: "'Exo 2', sans-serif" }}>✕ Close</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {/* CLIENT DASHBOARD */}
        {activeTab === "client" && (
          <div>
            <h2 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 20, marginBottom: 6 }}>Client Dashboard</h2>
            <p style={{ color: "rgba(234,242,255,0.5)", marginBottom: 24, fontSize: 13 }}>Manage your QR code, track reviews, and analyze performance</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 24 }}>
              {[{ label:"Total Scans", val:"1,247", icon:"📡", c:"#1EA7FF" },{ label:"Reviews Generated", val:"893", icon:"⭐", c:"#FFD700" },{ label:"Google Redirects", val:"777", icon:"🚀", c:"#00E0FF" },{ label:"Private Feedback", val:"116", icon:"🔒", c:"#6A5CFF" }].map((s,i) => (
                <GlassCard key={i} style={{ padding: 20 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ color: s.c, fontSize: 26, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{s.val}</div>
                  <div style={{ color: "rgba(234,242,255,0.4)", fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </GlassCard>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <GlassCard style={{ padding: 24 }}>
                <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 14, marginBottom: 16 }}>Your QR Code</h3>
                {qrGenerated ? (
                  <>
                    <QRScan />
                    <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 12, textAlign: "center", marginTop: 12 }}>Scan to trigger review flow</p>
                    <GlowBtn variant="secondary" style={{ width: "100%", marginTop: 12, fontSize: 13 }} onClick={() => {}}>⬇ Download QR</GlowBtn>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: 20 }}>
                    <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 13, marginBottom: 16 }}>Generate your unique QR code</p>
                    <GlowBtn onClick={() => setQrGenerated(true)}>Generate QR</GlowBtn>
                  </div>
                )}
              </GlassCard>
              <GlassCard style={{ padding: 24 }}>
                <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 14, marginBottom: 16 }}>Recent Feedback</h3>
                {["Sarah M. ★★★★★ 3m ago", "Ahmed K. ★★★★★ 9m ago", "Priya S. ★★★★☆ 17m ago", "James R. ★★★★★ 25m ago", "Liu W. ★★★☆☆ 34m ago (Private)"].map((f,i) => (
                  <div key={i} style={{ padding: "10px 0", borderBottom: i<4 ? "1px solid rgba(255,255,255,0.05)" : "none", color: "rgba(234,242,255,0.7)", fontSize: 12 }}>{f}</div>
                ))}
              </GlassCard>
            </div>
          </div>
        )}

        {/* ADMIN DASHBOARD */}
        {activeTab === "admin" && (
          <div>
            <h2 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 20, marginBottom: 24 }}>Admin Dashboard</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 24 }}>
              {[{ label:"Total Users", val:"342", icon:"👥", c:"#1EA7FF" },{ label:"Active Subs", val:"289", icon:"💳", c:"#00E0FF" },{ label:"Revenue (AED)", val:"24,830", icon:"💰", c:"#FFD700" },{ label:"Pending", val:"12", icon:"⏳", c:"#6A5CFF" }].map((s,i) => (
                <GlassCard key={i} style={{ padding: 20 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ color: s.c, fontSize: 26, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{s.val}</div>
                  <div style={{ color: "rgba(234,242,255,0.4)", fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </GlassCard>
              ))}
            </div>
            <GlassCard style={{ padding: 24 }}>
              <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 14, marginBottom: 16 }}>User Management</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>{["Business", "Plan", "Status", "Scans", "Action"].map(h => <th key={h} style={{ color: "rgba(234,242,255,0.4)", fontWeight: 500, padding: "8px 12px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {[["Al Barsha Cafe","Premium","Active","892","—"],["Dubai Dental Clinic","Standard","Active","341","—"],["Marina Gym","Basic","Active","127","—"],["Palm Auto Wash","Premium","Suspended","0","Unsuspend"],["Jumeirah Spa","Standard","Trial","23","—"]].map((r,i) => (
                    <tr key={i}>{r.map((c,j) => <td key={j} style={{ padding: "12px", color: j===2 ? (c==="Active" ? "#00E0FF" : c==="Suspended" ? "#FF6B6B" : "#FFD700") : "rgba(234,242,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{j===4 && c!=="—" ? <button style={{ padding: "4px 12px", borderRadius: 6, background: "rgba(30,167,255,0.2)", border: "1px solid rgba(30,167,255,0.3)", color: "#1EA7FF", cursor: "pointer", fontSize: 11 }}>{c}</button> : c}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        )}

        {/* DEMO DASHBOARD */}
        {activeTab === "demo" && (
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 20, marginBottom: 8 }}>Demo Dashboard</h2>
              <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 14 }}>Preview for new users — explore the full power of Reviox AI</p>
            </div>
            <GlassCard style={{ padding: 32, textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
              <h3 style={{ color: "#1EA7FF", fontFamily: "'Orbitron', sans-serif", fontSize: 18, marginBottom: 12 }}>You're in Demo Mode</h3>
              <p style={{ color: "rgba(234,242,255,0.6)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>This is a preview of what your dashboard will look like once you subscribe. All numbers below are sample data to help you understand the power of Reviox AI.</p>
              <GlowBtn>🔓 Unlock Full Access</GlowBtn>
            </GlassCard>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[{ label:"Sample Scans", val:"500+", icon:"📡" },{ label:"Reviews", val:"347", icon:"⭐" },{ label:"Google Clicks", val:"289", icon:"🚀" },{ label:"Private", val:"58", icon:"🔒" }].map((s,i) => (
                <GlassCard key={i} style={{ padding: 20, opacity: 0.7 }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ color: "#1EA7FF", fontSize: 22, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{s.val}</div>
                  <div style={{ color: "rgba(234,242,255,0.4)", fontSize: 11, marginTop: 2 }}>{s.label} (Demo)</div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* SUPER ADMIN */}
        {activeTab === "superadmin" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <h2 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 20, margin: 0 }}>Super Admin Panel</h2>
              <span style={{ background: "rgba(255,100,100,0.15)", border: "1px solid rgba(255,100,100,0.3)", color: "#FF6B6B", fontSize: 10, padding: "3px 10px", borderRadius: 50, fontWeight: 700 }}>RESTRICTED</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 24 }}>
              {[{ label:"Platform Users", val:"342", icon:"👥" },{ label:"Total Revenue", val:"AED 24,830", icon:"💰" },{ label:"Active Plans", val:"289", icon:"💳" },{ label:"System Health", val:"99.9%", icon:"💚" }].map((s,i) => (
                <GlassCard key={i} style={{ padding: 20 }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ color: "#00E0FF", fontSize: 20, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{s.val}</div>
                  <div style={{ color: "rgba(234,242,255,0.4)", fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </GlassCard>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <GlassCard style={{ padding: 24 }}>
                <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 13, marginBottom: 16 }}>Plan Management</h3>
                {[["Basic","AED 49","142 users"],["Standard","AED 69","98 users"],["Premium","AED 99","49 users"]].map((p,i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i<2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div>
                      <div style={{ color: "#EAF2FF", fontSize: 13, fontWeight: 600 }}>{p[0]}</div>
                      <div style={{ color: "rgba(234,242,255,0.4)", fontSize: 11 }}>{p[1]}/mo · {p[2]}</div>
                    </div>
                    <button style={{ padding: "4px 12px", borderRadius: 6, background: "rgba(30,167,255,0.15)", border: "1px solid rgba(30,167,255,0.3)", color: "#1EA7FF", cursor: "pointer", fontSize: 11 }}>Edit</button>
                  </div>
                ))}
              </GlassCard>
              <GlassCard style={{ padding: 24 }}>
                <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 13, marginBottom: 16 }}>System Controls</h3>
                {[["Maintenance Mode","OFF"],["New Registrations","ON"],["Payment Gateway","ACTIVE"],["Email Service","ACTIVE"]].map((c,i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i<3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ color: "rgba(234,242,255,0.7)", fontSize: 13 }}>{c[0]}</span>
                    <span style={{ color: c[1]==="OFF"||c[1]==="INACTIVE" ? "#FF6B6B" : "#00E0FF", fontSize: 11, fontWeight: 700 }}>{c[1]}</span>
                  </div>
                ))}
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── AUTH MODAL ──────────────────────────────────────────────────────────────
function AuthModal({ mode, onClose }) {
  const [tab, setTab] = useState(mode);
  const [step, setStep] = useState("form");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,15,28,0.9)", backdropFilter: "blur(12px)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <GlassCard style={{ padding: 40, width: "100%", maxWidth: 400, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "rgba(234,242,255,0.4)", cursor: "pointer", fontSize: 18 }}>✕</button>
        <div style={{ display: "flex", gap: 0, marginBottom: 28, borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {["login","signup"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px 0", background: tab===t ? "linear-gradient(135deg,#1EA7FF,#6A5CFF)" : "transparent", border: "none", color: tab===t ? "#fff" : "rgba(234,242,255,0.4)", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Exo 2', sans-serif", transition: "all 0.2s" }}>{t === "login" ? "Log In" : "Sign Up"}</button>
          ))}
        </div>
        {step === "form" ? (
          <>
            {tab === "signup" && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ color: "rgba(234,242,255,0.5)", fontSize: 12, display: "block", marginBottom: 6 }}>Business Name</label>
                <input placeholder="Al Barsha Cafe" style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#EAF2FF", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "'Exo 2', sans-serif" }} />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "rgba(234,242,255,0.5)", fontSize: 12, display: "block", marginBottom: 6 }}>Email</label>
              <input type="email" placeholder="you@business.com" style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#EAF2FF", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "'Exo 2', sans-serif" }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ color: "rgba(234,242,255,0.5)", fontSize: 12, display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#EAF2FF", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "'Exo 2', sans-serif" }} />
            </div>
            {tab === "login" && <div style={{ textAlign: "right", marginTop: -16, marginBottom: 20 }}><button style={{ background: "none", border: "none", color: "#1EA7FF", fontSize: 12, cursor: "pointer" }}>Forgot password?</button></div>}
            <GlowBtn style={{ width: "100%" }} onClick={() => tab === "signup" ? setStep("verify") : onClose()}>{tab === "login" ? "Log In" : "Create Account"}</GlowBtn>
            {tab === "signup" && <p style={{ color: "rgba(234,242,255,0.4)", fontSize: 11, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>By signing up, you agree to Reviox AI's Terms of Service and Privacy Policy</p>}
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
            <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 16, marginBottom: 8 }}>Verify Your Email</h3>
            <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>We've sent a verification link to your email. Click it to activate your account and access your dashboard.</p>
            <GlowBtn variant="secondary" onClick={() => setStep("form")}>← Back</GlowBtn>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

// ─── DEPLOYMENT GUIDE ────────────────────────────────────────────────────────
function DeploymentGuide({ onClose }) {
  const steps = [
    { title: "1. Setup Project Locally", icon: "💻", content: `Install Node.js from nodejs.org (v18+), then open your terminal and run:\n\nnpx create-react-app reviox-ai\ncd reviox-ai\nnpm install firebase stripe react-router-dom\n\nThis creates your project with all dependencies installed.` },
    { title: "2. Connect Firebase Database", icon: "🔥", content: `Go to firebase.google.com → Create project → Add web app.\n\nCopy your Firebase config and create a .env file:\n\nREACT_APP_FIREBASE_API_KEY=your_key\nREACT_APP_PROJECT_ID=your_id\n\nFirestore rules: Set to authenticated access only in Firebase Console.` },
    { title: "3. Configure Authentication", icon: "🔐", content: `In Firebase Console → Authentication → Enable:\n• Email/Password\n• Google (optional)\n\nIn your app, use firebase/auth:\nimport { createUserWithEmailAndPassword } from "firebase/auth"\n\nAdd email verification with sendEmailVerification().` },
    { title: "4. Add Stripe Payments", icon: "💳", content: `Sign up at stripe.com → Get your API keys.\n\nInstall: npm install @stripe/stripe-js\n\nCreate subscription plans in Stripe Dashboard matching:\n• Basic AED 49/mo\n• Standard AED 69/mo\n• Premium AED 99/mo\n\nAdd your price IDs to .env file.` },
    { title: "5. Deploy on Vercel", icon: "🚀", content: `Push your code to GitHub first:\ngit init && git add . && git commit -m "initial"\ngit push origin main\n\nGo to vercel.com → Import project → Connect GitHub repo.\nAdd all .env variables in Vercel's Environment Variables section.\nClick Deploy — your site is live in 2 minutes!` },
    { title: "6. Connect Custom Domain", icon: "🌐", content: `In Vercel Dashboard → Your Project → Settings → Domains.\n\nType your domain (e.g., reviox.ai) → Click Add.\n\nVercel gives you nameservers. Go to your domain registrar (Hostinger, GoDaddy) and update nameservers to Vercel's.\n\nSSL certificate is automatic and free!` },
    { title: "7. Go Live Checklist", icon: "✅", content: `Before launching:\n✓ Test all auth flows (signup, login, reset)\n✓ Test payment with Stripe test card 4242 4242 4242 4242\n✓ Check mobile responsiveness\n✓ Verify QR code generation works\n✓ Test review submission flow\n✓ Set Firestore rules to production mode\n✓ Switch Stripe from test to live mode\n✓ Your site is ready! 🎉` },
  ];
  const [active, setActive] = useState(0);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,15,28,0.95)", backdropFilter: "blur(12px)", zIndex: 900, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <h2 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 18, margin: 0 }}>🚀 Deployment Guide</h2>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EAF2FF", borderRadius: 8, padding: "6px 16px", cursor: "pointer", fontFamily: "'Exo 2', sans-serif" }}>✕ Close</button>
      </div>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ width: 240, borderRight: "1px solid rgba(255,255,255,0.08)", overflowY: "auto", padding: 16, flexShrink: 0 }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: "100%", background: active === i ? "rgba(30,167,255,0.15)" : "transparent", border: active === i ? "1px solid rgba(30,167,255,0.3)" : "1px solid transparent", color: active === i ? "#1EA7FF" : "rgba(234,242,255,0.5)", padding: "12px 14px", borderRadius: 10, cursor: "pointer", textAlign: "left", fontSize: 12, fontFamily: "'Exo 2', sans-serif", marginBottom: 6, transition: "all 0.2s" }}>
              <span style={{ fontSize: 16, marginRight: 8 }}>{s.icon}</span>{s.title}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
          <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 18, marginBottom: 20 }}>{steps[active].title}</h3>
          <GlassCard style={{ padding: 24 }}>
            <pre style={{ color: "rgba(234,242,255,0.8)", fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "'Courier New', monospace", margin: 0 }}>{steps[active].content}</pre>
          </GlassCard>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {active > 0 && <GlowBtn variant="secondary" onClick={() => setActive(a => a - 1)}>← Previous</GlowBtn>}
            {active < steps.length - 1 && <GlowBtn onClick={() => setActive(a => a + 1)}>Next Step →</GlowBtn>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [demoMode, setDemoMode] = useState("customer");
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAuth, setShowAuth] = useState(null);
  const [showDeploy, setShowDeploy] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const section = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: "#0A0F1C", minHeight: "100vh", color: "#EAF2FF", fontFamily: "'Exo 2', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0A0F1C; } ::-webkit-scrollbar-thumb { background: rgba(30,167,255,0.3); border-radius: 3px; }
        @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,224,255,0.4)} 50%{opacity:0.7;box-shadow:0 0 0 8px rgba(0,224,255,0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glow { 0%,100%{text-shadow:0 0 20px rgba(0,224,255,0.5)} 50%{text-shadow:0 0 40px rgba(30,167,255,0.8),0 0 80px rgba(106,92,255,0.4)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .float { animation: float 4s ease-in-out infinite; }
        .glow-text { animation: glow 3s ease-in-out infinite; }
        .slide-up { animation: slideUp 0.7s ease forwards; }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        a { color: inherit; text-decoration: none; }
        input::placeholder { color: rgba(234,242,255,0.3); }
      `}</style>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/971529682123" target="_blank" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 800, width: 56, height: 56, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 4px 20px rgba(37,211,102,0.4)", textDecoration: "none", transition: "transform 0.2s" }} title="Chat on WhatsApp">💬</a>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 700, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", background: "rgba(10,15,28,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#1EA7FF,#6A5CFF)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontFamily: "'Orbitron', sans-serif", fontSize: 16 }}>R</div>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 16, background: "linear-gradient(135deg,#1EA7FF,#00E0FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Reviox AI</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map(l => <button key={l} onClick={() => section(l.toLowerCase().replace(" ",""))} style={{ background: "none", border: "none", color: "rgba(234,242,255,0.6)", cursor: "pointer", fontSize: 13, fontFamily: "'Exo 2', sans-serif", fontWeight: 600, letterSpacing: 0.3, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color="#1EA7FF"} onMouseLeave={e => e.target.style.color="rgba(234,242,255,0.6)"}>{l}</button>)}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <GlowBtn variant="secondary" onClick={() => setShowAuth("login")} style={{ padding: "10px 22px", fontSize: 13 }}>Log In</GlowBtn>
          <GlowBtn onClick={() => setShowAuth("signup")} style={{ padding: "10px 22px", fontSize: 13 }}>Get Started</GlowBtn>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "80px 24px" }}>
        <ParticleCanvas />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,167,255,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 860 }}>
          <div className="float" style={{ marginBottom: 40 }}><QRScan /></div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", background: "rgba(30,167,255,0.1)", border: "1px solid rgba(30,167,255,0.25)", borderRadius: 50, marginBottom: 24, fontSize: 12, color: "#1EA7FF", letterSpacing: 1 }}>
            <div style={{ width: 6, height: 6, background: "#00E0FF", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            AI-POWERED REVIEW AUTOMATION
          </div>
          <h1 className="glow-text" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 20, background: "linear-gradient(135deg,#EAF2FF 0%,#1EA7FF 40%,#00E0FF 70%,#6A5CFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Turn Every Customer Into<br />a 5-Star Review
          </h1>
          <p style={{ fontSize: 18, color: "rgba(234,242,255,0.6)", lineHeight: 1.7, marginBottom: 12, maxWidth: 600, margin: "0 auto 12px" }}>AI-powered instant reviews with zero typing.</p>
          <p style={{ fontSize: 14, color: "rgba(234,242,255,0.4)", lineHeight: 1.7, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>Reviox AI transforms the way businesses collect and grow through customer feedback using AI-powered automation and smart review systems — built for Dubai and beyond.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <GlowBtn onClick={() => section("demo")} style={{ fontSize: 16, padding: "16px 40px" }}>⚡ Try Live Demo</GlowBtn>
            <GlowBtn variant="secondary" onClick={() => setShowAuth("signup")} style={{ fontSize: 16, padding: "16px 40px" }}>Get Started Free</GlowBtn>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            {[["1,247+","Scans Today"],["4.9★","Avg Rating"],["87%","Google Redirects"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, fontWeight: 700, color: "#1EA7FF" }}>{v}</div>
                <div style={{ color: "rgba(234,242,255,0.4)", fontSize: 12, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO ─────────────────────────────────────── */}
      <section id="demo" style={{ padding: "100px 24px", background: "#121826", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(106,92,255,0.06) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", padding: "4px 16px", background: "rgba(106,92,255,0.15)", border: "1px solid rgba(106,92,255,0.3)", borderRadius: 50, color: "#6A5CFF", fontSize: 11, marginBottom: 16, letterSpacing: 1 }}>LIVE INTERACTIVE DEMO</div>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px,4vw,42px)", marginBottom: 12, color: "#EAF2FF" }}>Experience It Yourself</h2>
            <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 15 }}>Switch between perspectives and see how Reviox AI works</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, overflow: "hidden" }}>
              {[["customer","👤 Customer Experience"],["business","📊 Business Owner Experience"]].map(([v,l]) => (
                <button key={v} onClick={() => setDemoMode(v)} style={{ padding: "12px 28px", background: demoMode===v ? "linear-gradient(135deg,#1EA7FF,#6A5CFF)" : "transparent", border: "none", color: demoMode===v ? "#fff" : "rgba(234,242,255,0.5)", cursor: "pointer", fontSize: 13, fontFamily: "'Exo 2', sans-serif", fontWeight: 600, transition: "all 0.3s" }}>{l}</button>
              ))}
            </div>
          </div>
          {demoMode === "customer" ? <CustomerDemo /> : <BusinessDemo />}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section id="howitworks" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 16px", background: "rgba(0,224,255,0.1)", border: "1px solid rgba(0,224,255,0.25)", borderRadius: 50, color: "#00E0FF", fontSize: 11, marginBottom: 16, letterSpacing: 1 }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px,4vw,40px)", marginBottom: 12, color: "#EAF2FF" }}>Three Steps to More Reviews</h2>
          <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 15, marginBottom: 64, maxWidth: 500, margin: "0 auto 64px" }}>From scan to published review in under 30 seconds</p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { num: "01", icon: "📱", title: "Scan QR Code", desc: "Customer scans your unique Reviox QR at the counter, table, or receipt — no app download needed." },
              { num: "02", icon: "✨", title: "AI Suggests Reviews", desc: "Our AI instantly generates emotionally authentic review options based on the customer's star rating." },
              { num: "03", icon: "🚀", title: "Boost Reputation", desc: "Positive reviews go straight to Google. Negative ones are routed privately to you to handle first." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
                <div style={{ flex: "1 1 240px", maxWidth: 280, padding: "0 20px", textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,rgba(30,167,255,0.2),rgba(106,92,255,0.2))", border: "1px solid rgba(30,167,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 20px" }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 11, color: "#1EA7FF", marginBottom: 8, letterSpacing: 2 }}>STEP {s.num}</div>
                  <h3 style={{ color: "#EAF2FF", fontSize: 18, fontFamily: "'Orbitron', sans-serif", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
                {i < 2 && <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,#1EA7FF,#6A5CFF)", marginTop: 40, flexShrink: 0, alignSelf: "flex-start" }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section id="features" style={{ padding: "100px 24px", background: "#121826" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-block", padding: "4px 16px", background: "rgba(30,167,255,0.1)", border: "1px solid rgba(30,167,255,0.25)", borderRadius: 50, color: "#1EA7FF", fontSize: 11, marginBottom: 16, letterSpacing: 1 }}>FEATURES</div>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px,4vw,40px)", color: "#EAF2FF" }}>Everything You Need to Grow</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {[
              { icon: "🤖", title: "AI-Generated Reviews", desc: "Emotionally authentic, context-aware review text generated in seconds based on sentiment." },
              { icon: "🔀", title: "Smart Review Routing", desc: "5-star reviews go to Google. 1-3 stars stay private. Protect your reputation automatically." },
              { icon: "📲", title: "Dynamic QR System", desc: "Unique QR code per business. Works on any surface — print, screen, or packaging." },
              { icon: "⚡", title: "Pre-filled Review Text", desc: "Zero effort for customers. They choose a suggestion and click — done in seconds." },
              { icon: "💬", title: "WhatsApp Follow-ups", desc: "Automated WhatsApp messages sent to customers post-visit to capture delayed reviews." },
              { icon: "📱", title: "SMS Review Requests", desc: "Send SMS review links instantly after a transaction or service completion." },
              { icon: "🌍", title: "Multi-Language Support", desc: "Arabic, Hindi, English, French and more — customers review in their native language." },
              { icon: "📊", title: "Analytics Dashboard", desc: "Full view of scans, reviews, conversion rate, and trends over time — all in real-time." },
            ].map((f, i) => (
              <GlassCard key={i} style={{ padding: 28 }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 14, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-block", padding: "4px 16px", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", borderRadius: 50, color: "#FFD700", fontSize: 11, marginBottom: 16, letterSpacing: 1 }}>PRICING</div>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px,4vw,40px)", color: "#EAF2FF", marginBottom: 12 }}>Simple, Transparent Pricing</h2>
            <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 15 }}>No setup fees. Cancel anytime. Priced for UAE businesses.</p>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", alignItems: "stretch" }}>
            <PricingCard plan="Basic" price="49" features={["1 QR Code","Up to 200 scans/mo","AI review suggestions","Smart routing","Email support"]} />
            <PricingCard plan="Standard" price="69" popular features={["3 QR Codes","Up to 600 scans/mo","WhatsApp follow-ups","SMS requests","Analytics dashboard","Priority support"]} />
            <PricingCard plan="Premium" price="99" features={["Unlimited QR Codes","Unlimited scans","Multi-language reviews","Full API access","Custom branding","Dedicated manager"]} />
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section id="about" style={{ padding: "100px 24px", background: "#121826" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 16px", background: "rgba(106,92,255,0.1)", border: "1px solid rgba(106,92,255,0.25)", borderRadius: 50, color: "#6A5CFF", fontSize: 11, marginBottom: 16, letterSpacing: 1 }}>ABOUT US</div>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px,4vw,40px)", color: "#EAF2FF", marginBottom: 48 }}>Built to Redefine Feedback</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <GlassCard style={{ padding: 32, textAlign: "left" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🔭</div>
              <h3 style={{ color: "#1EA7FF", fontFamily: "'Orbitron', sans-serif", fontSize: 15, marginBottom: 12 }}>Our Vision</h3>
              <p style={{ color: "rgba(234,242,255,0.6)", fontSize: 14, lineHeight: 1.8 }}>To redefine how businesses around the world collect, manage, and grow through customer feedback — making every customer interaction count in the digital age.</p>
            </GlassCard>
            <GlassCard style={{ padding: 32, textAlign: "left" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎯</div>
              <h3 style={{ color: "#6A5CFF", fontFamily: "'Orbitron', sans-serif", fontSize: 15, marginBottom: 12 }}>Our Mission</h3>
              <p style={{ color: "rgba(234,242,255,0.6)", fontSize: 14, lineHeight: 1.8 }}>To simplify and fully automate review collection using cutting-edge AI — so business owners focus on serving, not chasing reviews. Intelligence that Relieves.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── BLOG ──────────────────────────────────────────── */}
      <section id="blog" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", padding: "4px 16px", background: "rgba(0,224,255,0.1)", border: "1px solid rgba(0,224,255,0.25)", borderRadius: 50, color: "#00E0FF", fontSize: 11, marginBottom: 16, letterSpacing: 1 }}>BLOG</div>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px,4vw,40px)", color: "#EAF2FF" }}>Insights & Growth Tips</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {[
              { tag: "AI Reviews", title: "Why 87% of Customers Trust Online Reviews as Much as Personal Recommendations", date: "Apr 14, 2026", read: "4 min" },
              { tag: "Strategy", title: "How Dubai Restaurants Are Using QR Review Systems to Dominate Google Maps", date: "Apr 8, 2026", read: "5 min" },
              { tag: "Growth", title: "The Psychology of Review Friction — And How AI Eliminates It Entirely", date: "Mar 29, 2026", read: "6 min" },
            ].map((b, i) => (
              <GlassCard key={i} style={{ padding: 28, cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
                <div style={{ display: "inline-block", padding: "3px 12px", background: "rgba(30,167,255,0.1)", border: "1px solid rgba(30,167,255,0.2)", borderRadius: 50, color: "#1EA7FF", fontSize: 10, marginBottom: 16, letterSpacing: 1 }}>{b.tag}</div>
                <h3 style={{ color: "#EAF2FF", fontSize: 15, lineHeight: 1.5, marginBottom: 16, fontWeight: 600 }}>{b.title}</h3>
                <div style={{ display: "flex", gap: 16, color: "rgba(234,242,255,0.4)", fontSize: 12 }}>
                  <span>📅 {b.date}</span>
                  <span>⏱ {b.read} read</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" style={{ padding: "100px 24px", background: "#121826" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px,4vw,40px)", color: "#EAF2FF" }}>Frequently Asked Questions</h2>
          </div>
          <GlassCard style={{ padding: "8px 32px" }}>
            {[
              { q: "How does Reviox AI work?", a: "Reviox AI works in three steps: your customer scans a unique QR code, they're shown star rating options and AI-generated review suggestions tailored to their experience, and then they click submit. The review is instantly routed — positive reviews go to Google, while low-rated feedback is sent privately to you so you can act on it before it becomes public." },
              { q: "Is it connected to Google Reviews?", a: "Yes. When a customer submits a positive review through our system, they are redirected to your Google Business Profile with the review text pre-filled. They just confirm and publish — the entire process takes under 30 seconds with zero effort required from the customer." },
              { q: "Can I customize the review suggestions?", a: "Absolutely. On Standard and Premium plans, you can set the tone and style of AI-generated suggestions. You can specify whether you want formal, casual, industry-specific, or language-specific reviews. The AI adapts to your brand voice." },
              { q: "Is it legal and safe?", a: "Yes — Reviox AI is fully compliant. We generate AI-assisted suggestions, but customers choose and submit their own reviews. This keeps everything within Google's review policies. Negative feedback is routed privately, which is a standard and accepted practice. Your customer data is encrypted and never sold." },
              { q: "Do customers need to download an app?", a: "No app required. Customers simply scan the QR code with their phone camera, and everything opens directly in the browser. The experience is instant, frictionless, and works on any smartphone." },
            ].map((faq, i) => <FAQItem key={i} {...faq} />)}
          </GlassCard>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section id="contact" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(24px,4vw,40px)", color: "#EAF2FF", marginBottom: 12 }}>Get in Touch</h2>
            <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 15 }}>We're based in Dubai and ready to help you grow</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "📞", label: "Phone / WhatsApp", val: "+971 52 968 2123", sub: "+971 52 595 2878" },
                { icon: "📧", label: "Email", val: "ai.reviox@gmail.com" },
                { icon: "📍", label: "Location", val: "Dubai, United Arab Emirates" },
              ].map((c, i) => (
                <GlassCard key={i} style={{ padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 28 }}>{c.icon}</div>
                  <div>
                    <div style={{ color: "rgba(234,242,255,0.4)", fontSize: 11, marginBottom: 4, letterSpacing: 1 }}>{c.label}</div>
                    <div style={{ color: "#EAF2FF", fontWeight: 600, fontSize: 14 }}>{c.val}</div>
                    {c.sub && <div style={{ color: "#EAF2FF", fontWeight: 600, fontSize: 14, marginTop: 2 }}>{c.sub}</div>}
                  </div>
                </GlassCard>
              ))}
            </div>
            <GlassCard style={{ padding: 28 }}>
              <h3 style={{ color: "#EAF2FF", fontFamily: "'Orbitron', sans-serif", fontSize: 14, marginBottom: 20 }}>Send a Message</h3>
              {["Your Name", "Email Address", "Business Name"].map(p => (
                <input key={p} placeholder={p} style={{ display: "block", width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#EAF2FF", fontSize: 13, outline: "none", marginBottom: 12, fontFamily: "'Exo 2', sans-serif" }} />
              ))}
              <textarea placeholder="Your message..." rows={4} style={{ display: "block", width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#EAF2FF", fontSize: 13, outline: "none", marginBottom: 16, resize: "vertical", fontFamily: "'Exo 2', sans-serif" }} />
              <GlowBtn style={{ width: "100%" }}>Send Message →</GlowBtn>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD CTA ────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: "#121826" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <GlassCard style={{ padding: 48, textAlign: "center", background: "rgba(30,167,255,0.05)", border: "1px solid rgba(30,167,255,0.2)" }}>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(20px,3vw,32px)", color: "#EAF2FF", marginBottom: 12 }}>Ready to See the Dashboard?</h2>
            <p style={{ color: "rgba(234,242,255,0.5)", fontSize: 15, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>Explore all four dashboards — Client, Admin, Demo, and Super Admin — with full interactive UI.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <GlowBtn onClick={() => setShowDashboard(true)} style={{ fontSize: 16, padding: "16px 40px" }}>📊 Open Dashboard</GlowBtn>
              <GlowBtn variant="secondary" onClick={() => setShowDeploy(true)} style={{ fontSize: 16, padding: "16px 40px" }}>🚀 Deployment Guide</GlowBtn>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#1EA7FF,#6A5CFF)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontFamily: "'Orbitron', sans-serif" }}>R</div>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, background: "linear-gradient(135deg,#1EA7FF,#00E0FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Reviox AI</span>
              </div>
              <p style={{ color: "rgba(234,242,255,0.4)", fontSize: 12, maxWidth: 220, lineHeight: 1.7 }}>Intelligence that Relieves. AI-powered review automation for forward-thinking businesses.</p>
            </div>
            {[["Product",["Features","Pricing","Demo","Dashboard"]],["Company",["About","Blog","Contact","Careers"]],["Legal",["Privacy Policy","Terms of Service","Cookie Policy"]]].map(([title, links]) => (
              <div key={title}>
                <h4 style={{ color: "rgba(234,242,255,0.3)", fontSize: 10, letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>{title.toUpperCase()}</h4>
                {links.map(l => <div key={l} style={{ color: "rgba(234,242,255,0.5)", fontSize: 13, marginBottom: 10, cursor: "pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ color: "rgba(234,242,255,0.3)", fontSize: 12 }}>© 2026 Reviox AI. All rights reserved. Dubai, UAE.</span>
            <span style={{ color: "rgba(234,242,255,0.3)", fontSize: 12 }}>ai.reviox@gmail.com · +971 52 968 2123</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {showDashboard && <FullDashboard onClose={() => setShowDashboard(false)} />}
      {showAuth && <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} />}
      {showDeploy && <DeploymentGuide onClose={() => setShowDeploy(false)} />}
    </div>
  );
}
