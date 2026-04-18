import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import SectionLabel from '../components/ui/SectionLabel';
import { FEATURES } from '../constants';

function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '100px 24px', background: '#121826' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <SectionLabel color="#1EA7FF">FEATURES</SectionLabel>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(22px,4vw,40px)',
            color: '#EAF2FF',
          }}>Everything You Need to Grow</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}>
          {FEATURES.map((f, i) => (
            <GlassCard
              key={i}
              style={{ padding: 28, transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.4)';
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{
                color: '#EAF2FF',
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 14, marginBottom: 10,
              }}>{f.title}</h3>
              <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
