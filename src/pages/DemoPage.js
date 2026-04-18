import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard  from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

// ── Demo Dashboard Page ───────────────────────────────
export function DemoPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1C', padding: '80px 24px', fontFamily: "'Exo 2', sans-serif" }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, color: '#fff' }}>R</div>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, background: 'linear-gradient(135deg,#1EA7FF,#00E0FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Reviox AI</span>
          </div>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 22, color: '#EAF2FF', marginBottom: 8 }}>Demo Dashboard</h2>
          <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 14 }}>Preview for new users — explore the platform before subscribing</p>
        </div>

        <GlassCard style={{ padding: 36, textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🚀</div>
          <h3 style={{ color: '#1EA7FF', fontFamily: "'Orbitron', sans-serif", fontSize: 18, marginBottom: 12 }}>You're in Demo Mode</h3>
          <p style={{ color: 'rgba(234,242,255,0.6)', fontSize: 14, lineHeight: 1.8, marginBottom: 28 }}>
            This is a preview of what your dashboard looks like once you subscribe. All numbers
            below are sample data to show you the power of Reviox AI.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <GlowButton onClick={() => navigate('/signup')}>🔓 Unlock Full Access</GlowButton>
            <GlowButton variant="secondary" onClick={() => navigate('/')}>← Back to Site</GlowButton>
          </div>
        </GlassCard>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { label: 'Sample Scans',    val: '500+', icon: '📡' },
            { label: 'Reviews',         val: '347',  icon: '⭐' },
            { label: 'Google Clicks',   val: '289',  icon: '🚀' },
            { label: 'Private Feedback',val: '58',   icon: '🔒' },
          ].map((s, i) => (
            <GlassCard key={i} style={{ padding: 22, opacity: 0.75, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#1EA7FF', fontSize: 24, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{s.val}</div>
              <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 11, marginTop: 4 }}>{s.label} (Demo)</div>
            </GlassCard>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Super Admin Page ──────────────────────────────────
export function SuperAdminPage() {
  const navigate = useNavigate();
  const [controls, setControls] = useState({
    maintenance: false,
    registrations: true,
    payments: true,
    email: true,
  });

  const toggle = (key) => setControls(c => ({ ...c, [key]: !c[key] }));

  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1C', padding: '40px 24px', fontFamily: "'Exo 2', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 20, margin: 0 }}>Super Admin Panel</h2>
              <span style={{
                background: 'rgba(255,100,100,0.12)',
                border: '1px solid rgba(255,100,100,0.3)',
                color: '#FF6B6B', fontSize: 10,
                padding: '3px 10px', borderRadius: 50, fontWeight: 700,
              }}>RESTRICTED</span>
            </div>
            <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 13, marginTop: 6 }}>Full platform control</p>
          </div>
          <GlowButton variant="secondary" onClick={() => navigate('/')} style={{ fontSize: 13 }}>← Back to Site</GlowButton>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Platform Users', val: '342',      icon: '👥' },
            { label: 'Total Revenue',  val: 'AED 24,830',icon: '💰' },
            { label: 'Active Plans',   val: '289',      icon: '💳' },
            { label: 'System Health',  val: '99.9%',    icon: '💚' },
          ].map((s, i) => (
            <GlassCard key={i} style={{ padding: 22 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#00E0FF', fontSize: 20, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{s.val}</div>
              <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 11, marginTop: 4 }}>{s.label}</div>
            </GlassCard>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Plan management */}
          <GlassCard style={{ padding: 26 }}>
            <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 13, marginBottom: 20 }}>
              Plan Management
            </h3>
            {[
              { name: 'Basic',    price: 'AED 49', users: '142 users' },
              { name: 'Standard', price: 'AED 69', users: '98 users' },
              { name: 'Premium',  price: 'AED 99', users: '49 users' },
            ].map((p, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 0',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <div>
                  <div style={{ color: '#EAF2FF', fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ color: 'rgba(234,242,255,0.35)', fontSize: 11 }}>{p.price}/mo · {p.users}</div>
                </div>
                <button style={{
                  padding: '5px 14px', borderRadius: 7,
                  background: 'rgba(30,167,255,0.1)',
                  border: '1px solid rgba(30,167,255,0.25)',
                  color: '#1EA7FF', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                  fontFamily: "'Exo 2', sans-serif",
                }}>Edit Plan</button>
              </div>
            ))}
          </GlassCard>

          {/* System controls */}
          <GlassCard style={{ padding: 26 }}>
            <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 13, marginBottom: 20 }}>
              System Controls
            </h3>
            {[
              { key: 'maintenance',    label: 'Maintenance Mode' },
              { key: 'registrations',  label: 'New Registrations' },
              { key: 'payments',       label: 'Payment Gateway' },
              { key: 'email',          label: 'Email Service' },
            ].map((c, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '13px 0',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <span style={{ color: 'rgba(234,242,255,0.7)', fontSize: 13 }}>{c.label}</span>
                <button
                  onClick={() => toggle(c.key)}
                  style={{
                    padding: '4px 14px', borderRadius: 50,
                    background: controls[c.key] ? 'rgba(0,224,255,0.15)' : 'rgba(255,107,107,0.12)',
                    border: `1px solid ${controls[c.key] ? 'rgba(0,224,255,0.3)' : 'rgba(255,107,107,0.3)'}`,
                    color: controls[c.key] ? '#00E0FF' : '#FF6B6B',
                    cursor: 'pointer', fontSize: 11, fontWeight: 700,
                    fontFamily: "'Exo 2', sans-serif",
                  }}
                >{controls[c.key] ? 'ON' : 'OFF'}</button>
              </div>
            ))}
          </GlassCard>

        </div>
      </div>
    </div>
  );
}

// useState was used inside SuperAdminPage but not imported at the top of this file via the split.
// Fix: add it here.
import { useState } from 'react';

export default DemoPage;
