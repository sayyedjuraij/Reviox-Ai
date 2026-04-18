import React, { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import SectionLabel from '../components/ui/SectionLabel';
import { AI_REVIEW_SUGGESTIONS } from '../constants';

// ── Star Rating ──────────────────────────────────────
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span
          key={s}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          style={{
            fontSize: 40, cursor: 'pointer',
            transition: 'transform 0.15s',
            transform: (hovered || value) >= s ? 'scale(1.2)' : 'scale(1)',
            color: (hovered || value) >= s ? '#FFD700' : 'rgba(255,255,255,0.15)',
          }}
        >★</span>
      ))}
    </div>
  );
}

// ── Customer Demo ────────────────────────────────────
function CustomerDemo() {
  const [stars, setStars] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const suggestions = stars >= 3 ? (AI_REVIEW_SUGGESTIONS[stars] || AI_REVIEW_SUGGESTIONS[5]) : [];

  const reset = () => { setStars(0); setSelected(null); setSubmitted(false); };

  if (submitted) {
    return (
      <GlassCard style={{ padding: 40, textAlign: 'center', maxWidth: 440, margin: '0 auto' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h3 style={{ color: '#00E0FF', marginBottom: 8, fontFamily: "'Orbitron', sans-serif", fontSize: 16 }}>Review Submitted!</h3>
        <p style={{ color: 'rgba(234,242,255,0.6)', marginBottom: 20, fontSize: 13 }}>Redirecting you to Google Reviews…</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
          {[1,2,3,4,5].map(s => (
            <span key={s} style={{ fontSize: 22, color: s <= stars ? '#FFD700' : 'rgba(255,255,255,0.15)' }}>★</span>
          ))}
        </div>
        {selected && (
          <div style={{
            padding: '14px 18px',
            background: 'rgba(30,167,255,0.08)',
            borderRadius: 12,
            border: '1px solid rgba(30,167,255,0.2)',
            color: 'rgba(234,242,255,0.8)',
            fontSize: 13,
            fontStyle: 'italic',
            lineHeight: 1.6,
            marginBottom: 20,
          }}>{selected}</div>
        )}
        <div style={{
          padding: '8px 18px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 50,
          display: 'inline-block',
          color: '#00E0FF',
          fontSize: 12,
          marginBottom: 20,
        }}>→ google.com/maps/... (simulated)</div>
        <br />
        <GlowButton onClick={reset} style={{ fontSize: 13 }}>Try Again</GlowButton>
      </GlassCard>
    );
  }

  return (
    <GlassCard style={{ padding: 32, maxWidth: 440, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          width: 48, height: 48,
          background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px', fontSize: 22,
        }}>⭐</div>
        <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 15, marginBottom: 4 }}>
          Rate Your Experience
        </h3>
        <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 12 }}>
          Tap a star to get AI-generated review options
        </p>
      </div>

      <StarRating value={stars} onChange={(s) => { setStars(s); setSelected(null); }} />

      {/* Negative routing */}
      {stars > 0 && stars < 3 && (
        <div style={{
          marginTop: 24, padding: 18,
          background: 'rgba(255,100,100,0.08)',
          borderRadius: 14,
          border: '1px solid rgba(255,107,107,0.2)',
          textAlign: 'center',
        }}>
          <p style={{ color: '#FF6B6B', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>
            💬 We're sorry to hear that. Your feedback will be sent <strong>privately</strong> to the business owner to help them improve.
          </p>
          <GlowButton onClick={() => setSubmitted(true)} style={{ fontSize: 13, padding: '10px 22px' }}>
            Send Private Feedback
          </GlowButton>
        </div>
      )}

      {/* Positive suggestions */}
      {stars >= 3 && (
        <div style={{ marginTop: 24 }}>
          <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 12, textAlign: 'center', marginBottom: 14 }}>
            ✨ Choose an AI-generated review suggestion
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => setSelected(s)}
                style={{
                  padding: 14, borderRadius: 12,
                  background: selected === s ? 'rgba(30,167,255,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selected === s ? '#1EA7FF' : 'rgba(255,255,255,0.08)'}`,
                  cursor: 'pointer',
                  color: '#EAF2FF', fontSize: 13, lineHeight: 1.6,
                  transition: 'all 0.2s',
                }}
              >
                {selected === s && <span style={{ color: '#00E0FF', marginRight: 6 }}>✓</span>}
                {s}
              </div>
            ))}
          </div>
          {selected && (
            <GlowButton
              style={{ marginTop: 18, width: '100%' }}
              onClick={() => setSubmitted(true)}
            >🚀 Submit to Google Reviews</GlowButton>
          )}
        </div>
      )}
    </GlassCard>
  );
}

// ── Business Demo ────────────────────────────────────
function BusinessDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const scans   = 1247 + tick * 3;
  const reviews = 893  + tick * 2;
  const positive = Math.round(reviews * 0.87);
  const privateF = reviews - positive;

  const stats = [
    { label: 'Total Scans',       value: scans.toLocaleString(),   icon: '📡', color: '#1EA7FF' },
    { label: 'Reviews Generated', value: reviews.toLocaleString(), icon: '⭐', color: '#FFD700' },
    { label: 'Google Redirects',  value: positive.toLocaleString(),icon: '🚀', color: '#00E0FF' },
    { label: 'Private Feedback',  value: privateF.toLocaleString(),icon: '🔒', color: '#6A5CFF' },
  ];

  const recent = [
    { name: 'Sarah M.',  rating: 5, time: '2m ago',  text: 'Absolutely exceptional service!' },
    { name: 'Ahmed K.',  rating: 5, time: '8m ago',  text: 'Outstanding experience from start to finish.' },
    { name: 'Priya S.',  rating: 4, time: '15m ago', text: 'Really pleased with my visit. Great team!' },
    { name: 'James R.',  rating: 5, time: '22m ago', text: 'Five stars without hesitation. Will return!' },
  ];

  return (
    <GlassCard style={{ padding: 28, maxWidth: 560, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 14, margin: 0 }}>
          Business Dashboard
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="pulse-dot" style={{ width: 8, height: 8, background: '#00E0FF', borderRadius: '50%' }} />
          <span style={{ color: '#00E0FF', fontSize: 11, fontWeight: 600 }}>LIVE</span>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: 16,
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 22, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{s.value}</div>
            <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 11, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: 'rgba(234,242,255,0.5)', fontSize: 12 }}>Positive → Google</span>
          <span style={{ color: '#00E0FF', fontSize: 12, fontWeight: 700 }}>87%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            width: '87%', height: '100%',
            background: 'linear-gradient(90deg,#1EA7FF,#00E0FF)',
            borderRadius: 3, transition: 'width 1s ease',
          }} />
        </div>
      </div>

      {/* Recent feed */}
      <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 11, marginBottom: 12, letterSpacing: 0.5 }}>RECENT FEEDBACK</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {recent.map((f, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.03)', borderRadius: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, flexShrink: 0,
            }}>{f.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ color: '#EAF2FF', fontSize: 12, fontWeight: 600 }}>{f.name}</span>
                <span style={{ color: '#FFD700', fontSize: 10 }}>{'★'.repeat(f.rating)}</span>
              </div>
              <div style={{ color: 'rgba(234,242,255,0.45)', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.text}</div>
            </div>
            <span style={{ color: 'rgba(234,242,255,0.25)', fontSize: 10, flexShrink: 0 }}>{f.time}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

// ── Main Section ─────────────────────────────────────
function DemoSection() {
  const [mode, setMode] = useState('customer');

  return (
    <section id="demo" style={{ padding: '100px 24px', background: '#121826', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(106,92,255,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel color="#6A5CFF">LIVE INTERACTIVE DEMO</SectionLabel>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(22px,4vw,40px)',
            color: '#EAF2FF', marginBottom: 12,
          }}>Experience It Yourself</h2>
          <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 15 }}>
            Switch between perspectives and see how Reviox AI works in real time
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 50, overflow: 'hidden',
          }}>
            {[
              ['customer', '👤 Customer Experience'],
              ['business', '📊 Business Owner'],
            ].map(([val, label]) => (
              <button key={val} onClick={() => setMode(val)} style={{
                padding: '12px 28px',
                background: mode === val ? 'linear-gradient(135deg,#1EA7FF,#6A5CFF)' : 'transparent',
                border: 'none',
                color: mode === val ? '#fff' : 'rgba(234,242,255,0.5)',
                cursor: 'pointer', fontSize: 13,
                fontFamily: "'Exo 2', sans-serif", fontWeight: 600,
                transition: 'all 0.3s',
              }}>{label}</button>
            ))}
          </div>
        </div>

        {mode === 'customer' ? <CustomerDemo /> : <BusinessDemo />}
      </div>
    </section>
  );
}

export default DemoSection;
