import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard  from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

function SuperAdminPage() {
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
              <h2 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 20, margin: 0 }}>
                Super Admin Panel
              </h2>
              <span style={{
                background: 'rgba(255,100,100,0.12)',
                border: '1px solid rgba(255,100,100,0.3)',
                color: '#FF6B6B', fontSize: 10,
                padding: '3px 10px', borderRadius: 50, fontWeight: 700,
              }}>RESTRICTED</span>
            </div>
            <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 13, marginTop: 6 }}>
              Full platform control — handle with care
            </p>
          </div>
          <GlowButton variant="secondary" onClick={() => navigate('/')} style={{ fontSize: 13 }}>
            ← Back to Site
          </GlowButton>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Platform Users', val: '342',        icon: '👥' },
            { label: 'Total Revenue',  val: 'AED 24,830', icon: '💰' },
            { label: 'Active Plans',   val: '289',        icon: '💳' },
            { label: 'System Health',  val: '99.9%',      icon: '💚' },
          ].map((s, i) => (
            <GlassCard key={i} style={{ padding: 22 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#00E0FF', fontSize: 22, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>
                {s.val}
              </div>
              <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 11, marginTop: 4 }}>{s.label}</div>
            </GlassCard>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Plan Management */}
          <GlassCard style={{ padding: 26 }}>
            <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 13, marginBottom: 22 }}>
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

          {/* System Controls */}
          <GlassCard style={{ padding: 26 }}>
            <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 13, marginBottom: 22 }}>
              System Controls
            </h3>
            {[
              { key: 'maintenance',   label: 'Maintenance Mode',  danger: true },
              { key: 'registrations', label: 'New Registrations', danger: false },
              { key: 'payments',      label: 'Payment Gateway',   danger: false },
              { key: 'email',         label: 'Email Service',     danger: false },
            ].map((c, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '13px 0',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <div>
                  <span style={{ color: 'rgba(234,242,255,0.75)', fontSize: 13 }}>{c.label}</span>
                  {c.danger && <span style={{ color: '#FF6B6B', fontSize: 10, marginLeft: 8 }}>⚠ Caution</span>}
                </div>
                <button
                  onClick={() => toggle(c.key)}
                  style={{
                    padding: '4px 16px', borderRadius: 50, cursor: 'pointer',
                    fontSize: 11, fontWeight: 700, fontFamily: "'Exo 2', sans-serif",
                    background: controls[c.key] ? 'rgba(0,224,255,0.14)' : 'rgba(255,107,107,0.12)',
                    border: `1px solid ${controls[c.key] ? 'rgba(0,224,255,0.3)' : 'rgba(255,107,107,0.3)'}`,
                    color: controls[c.key] ? '#00E0FF' : '#FF6B6B',
                  }}
                >{controls[c.key] ? 'ON' : 'OFF'}</button>
              </div>
            ))}
          </GlassCard>

        </div>

        {/* Danger zone */}
        <GlassCard style={{ padding: 26, marginTop: 24, border: '1px solid rgba(255,107,107,0.2)' }}>
          <h3 style={{ color: '#FF6B6B', fontFamily: "'Orbitron', sans-serif", fontSize: 13, marginBottom: 16 }}>
            ⚠ Danger Zone
          </h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Clear All Sessions', 'Reset Analytics', 'Export All Data', 'Purge Cache'].map(action => (
              <button key={action} style={{
                padding: '10px 20px', borderRadius: 10,
                background: 'rgba(255,107,107,0.08)',
                border: '1px solid rgba(255,107,107,0.25)',
                color: '#FF6B6B', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                fontFamily: "'Exo 2', sans-serif",
                transition: 'all 0.2s',
              }}>{action}</button>
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
}

export default SuperAdminPage;
