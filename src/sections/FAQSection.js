import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { FAQ } from '../constants';

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none', border: 'none',
          color: '#EAF2FF',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          fontFamily: "'Exo 2', sans-serif",
          fontSize: 15, fontWeight: 600,
          textAlign: 'left', gap: 16,
        }}
      >
        <span>{q}</span>
        <span style={{
          color: '#1EA7FF', fontSize: 22,
          transition: 'transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'none',
          flexShrink: 0, lineHeight: 1,
        }}>+</span>
      </button>

      <div style={{
        maxHeight: open ? 300 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <p style={{
          color: 'rgba(234,242,255,0.6)',
          fontSize: 14, lineHeight: 1.8,
          paddingBottom: 22, margin: 0,
        }}>{a}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section id="faq" style={{ padding: '100px 24px', background: '#121826' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(22px,4vw,40px)',
            color: '#EAF2FF',
          }}>Frequently Asked Questions</h2>
        </div>

        <GlassCard style={{ padding: '8px 32px' }}>
          {FAQ.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </GlassCard>

      </div>
    </section>
  );
}

export default FAQSection;
