import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard  from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import QRAnimation from '../components/QRAnimation';

// ── Sidebar ───────────────────────────────────────────
function Sidebar({ active, setActive }) {
  const navigate = useNavigate();
  const items = [
    { id: 'overview',  icon: '📊', label: 'Overview' },
    { id: 'qr',        icon: '📲', label: 'QR Code' },
    { id: 'reviews',   icon: '⭐', label: 'Reviews' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'settings',  icon: '⚙️', label: 'Settings' },
  ];
  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: 'rgba(255,255,255,0.02)',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', flexDirection: 'column',
      padding: '24px 12px',
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          cursor: 'pointer', marginBottom: 32, padding: '0 8px',
        }}
      >
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)',
          borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 15, color: '#fff',
        }}>R</div>
        <span style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 14,
          background: 'linear-gradient(135deg,#1EA7FF,#00E0FF)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>Reviox AI</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              width: '100%', padding: '12px 14px', marginBottom: 4,
              background: active === item.id ? 'rgba(30,167,255,0.12)' : 'transparent',
              border: active === item.id ? '1px solid rgba(30,167,255,0.25)' : '1px solid transparent',
              borderRadius: 12,
              color: active === item.id ? '#1EA7FF' : 'rgba(234,242,255,0.5)',
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
              fontFamily: "'Exo 2', sans-serif", textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '12px 14px',
          background: 'transparent', border: '1px solid transparent',
          borderRadius: 12, color: 'rgba(234,242,255,0.3)',
          cursor: 'pointer', fontSize: 13,
          fontFamily: "'Exo 2', sans-serif', textAlign: 'left",
        }}
      >← Log Out</button>
    </aside>
  );
}

// ── Stat Card ─────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <GlassCard style={{ padding: 22 }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ color: color || '#1EA7FF', fontSize: 28, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{value}</div>
      <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 12, marginTop: 4 }}>{label}</div>
    </GlassCard>
  );
}

// ── Overview tab ──────────────────────────────────────
function OverviewTab() {
  return (
    <div>
      <h2 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 20, marginBottom: 6 }}>
        Welcome back 👋
      </h2>
      <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 13, marginBottom: 28 }}>
        Here's how your business is performing today
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard icon="📡" label="Total Scans"        value="1,247" color="#1EA7FF" />
        <StatCard icon="⭐" label="Reviews Generated"  value="893"   color="#FFD700" />
        <StatCard icon="🚀" label="Google Redirects"   value="777"   color="#00E0FF" />
        <StatCard icon="🔒" label="Private Feedback"   value="116"   color="#6A5CFF" />
      </div>

      {/* Progress */}
      <GlassCard style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ color: '#EAF2FF', fontSize: 14, fontWeight: 600 }}>Positive Review Rate</span>
          <span style={{ color: '#00E0FF', fontWeight: 700 }}>87%</span>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg,#1EA7FF,#00E0FF)', borderRadius: 4 }} />
        </div>
        <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 12, marginTop: 10 }}>
          87% of reviews are routed to Google — industry average is 62%
        </p>
      </GlassCard>

      {/* Recent feedback */}
      <GlassCard style={{ padding: 24 }}>
        <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 13, marginBottom: 18 }}>
          Recent Feedback
        </h3>
        {[
          { name: 'Sarah M.',  rating: 5, text: 'Absolutely exceptional service!', time: '3m ago' },
          { name: 'Ahmed K.',  rating: 5, text: 'Outstanding from start to finish.',time: '9m ago' },
          { name: 'Priya S.',  rating: 4, text: 'Really pleased with my visit.',    time: '17m ago' },
          { name: 'James R.',  rating: 5, text: 'Five stars. Will definitely return!', time: '25m ago' },
          { name: 'Liu W.',    rating: 2, text: '(Private) Service was slow today.', time: '31m ago', private: true },
        ].map((f, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 0',
            borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: f.private
                ? 'rgba(255,107,107,0.2)'
                : 'linear-gradient(135deg,#1EA7FF,#6A5CFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, flexShrink: 0,
              color: f.private ? '#FF6B6B' : '#fff',
            }}>{f.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#EAF2FF', fontSize: 13, fontWeight: 600 }}>{f.name}</span>
                <span style={{ color: '#FFD700', fontSize: 11 }}>{'★'.repeat(f.rating)}</span>
                {f.private && <span style={{ color: '#FF6B6B', fontSize: 10, background: 'rgba(255,107,107,0.1)', padding: '1px 6px', borderRadius: 4 }}>PRIVATE</span>}
              </div>
              <div style={{ color: 'rgba(234,242,255,0.45)', fontSize: 12 }}>{f.text}</div>
            </div>
            <span style={{ color: 'rgba(234,242,255,0.25)', fontSize: 11 }}>{f.time}</span>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

// ── QR Tab ───────────────────────────────────────────
function QRTab() {
  const [generated, setGenerated] = useState(false);
  return (
    <div style={{ maxWidth: 500 }}>
      <h2 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 20, marginBottom: 24 }}>
        Your QR Code
      </h2>
      <GlassCard style={{ padding: 36, textAlign: 'center' }}>
        {generated ? (
          <>
            <QRAnimation />
            <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 13, marginTop: 16, marginBottom: 24 }}>
              Scan this QR to trigger your review flow
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <GlowButton style={{ fontSize: 13 }}>⬇ Download PNG</GlowButton>
              <GlowButton variant="secondary" style={{ fontSize: 13 }}>⬇ Download PDF</GlowButton>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 64, marginBottom: 16 }}>📲</div>
            <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 16, marginBottom: 12 }}>
              Generate Your QR Code
            </h3>
            <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 13, marginBottom: 28, lineHeight: 1.7 }}>
              Your unique QR code links customers directly to your AI-powered review flow.
              Print it on your counter, menu, or receipt.
            </p>
            <GlowButton onClick={() => setGenerated(true)}>Generate QR Code</GlowButton>
          </>
        )}
      </GlassCard>
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────
function SettingsTab() {
  return (
    <div style={{ maxWidth: 560 }}>
      <h2 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 20, marginBottom: 24 }}>
        Account Settings
      </h2>
      <GlassCard style={{ padding: 28, marginBottom: 20 }}>
        <h3 style={{ color: '#EAF2FF', fontSize: 14, marginBottom: 20 }}>Business Info</h3>
        {['Business Name', 'Google Business URL', 'Phone Number'].map(f => (
          <div key={f} style={{ marginBottom: 16 }}>
            <label style={{ color: 'rgba(234,242,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>{f}</label>
            <input placeholder={f} style={{
              width: '100%', padding: '12px 16px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, color: '#EAF2FF', fontSize: 13,
              fontFamily: "'Exo 2', sans-serif", outline: 'none', boxSizing: 'border-box',
            }} />
          </div>
        ))}
        <GlowButton style={{ marginTop: 8 }}>Save Changes</GlowButton>
      </GlassCard>
      <GlassCard style={{ padding: 28 }}>
        <h3 style={{ color: '#EAF2FF', fontSize: 14, marginBottom: 16 }}>Current Plan</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#1EA7FF', fontWeight: 700, fontSize: 16 }}>Standard Plan</div>
            <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 12, marginTop: 4 }}>AED 69/month · Renews Apr 18, 2027</div>
          </div>
          <GlowButton variant="secondary" style={{ fontSize: 13 }}>Upgrade</GlowButton>
        </div>
      </GlassCard>
    </div>
  );
}

// ── Main Dashboard Page ───────────────────────────────
function DashboardPage() {
  const [active, setActive] = useState('overview');

  const renderTab = () => {
    switch (active) {
      case 'overview':  return <OverviewTab />;
      case 'qr':        return <QRTab />;
      case 'settings':  return <SettingsTab />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔧</div>
            <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif" }}>
              {active.charAt(0).toUpperCase() + active.slice(1)} — Coming Soon
            </h3>
            <p style={{ color: 'rgba(234,242,255,0.4)', marginTop: 8 }}>This section is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#0A0F1C', fontFamily: "'Exo 2', sans-serif",
    }}>
      <Sidebar active={active} setActive={setActive} />
      <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        {renderTab()}
      </main>
    </div>
  );
}

export default DashboardPage;
