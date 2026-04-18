import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import SectionLabel from '../components/ui/SectionLabel';

function AboutSection() {
  return (
    <section id="about" style={{ padding: '100px 24px', background: '#121826' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <SectionLabel color="#6A5CFF">ABOUT US</SectionLabel>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(22px,4vw,40px)',
            color: '#EAF2FF',
          }}>Built to Redefine Feedback</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          <GlassCard style={{ padding: 36, textAlign: 'left' }}>
            <div style={{ fontSize: 36, marginBottom: 18 }}>🔭</div>
            <h3 style={{
              color: '#1EA7FF',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 15, marginBottom: 14,
            }}>Our Vision</h3>
            <p style={{ color: 'rgba(234,242,255,0.6)', fontSize: 14, lineHeight: 1.9 }}>
              To redefine how businesses around the world collect, manage, and grow through customer
              feedback — making every customer interaction count in the digital age.
            </p>
          </GlassCard>

          <GlassCard style={{ padding: 36, textAlign: 'left' }}>
            <div style={{ fontSize: 36, marginBottom: 18 }}>🎯</div>
            <h3 style={{
              color: '#6A5CFF',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 15, marginBottom: 14,
            }}>Our Mission</h3>
            <p style={{ color: 'rgba(234,242,255,0.6)', fontSize: 14, lineHeight: 1.9 }}>
              To simplify and fully automate review collection using cutting-edge AI — so business
              owners focus on serving, not chasing reviews. Intelligence that Relieves.
            </p>
          </GlassCard>

        </div>

        {/* Team stats */}
        <div style={{
          display: 'flex', gap: 0,
          marginTop: 40,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
        }}>
          {[
            { val: '500+', label: 'Businesses Served' },
            { val: 'UAE & India', label: 'Markets Active' },
            { val: '4.9★', label: 'Customer Rating' },
            { val: '24/7', label: 'AI Availability' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: '28px 16px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 22, fontWeight: 700, color: '#1EA7FF', marginBottom: 6,
              }}>{s.val}</div>
              <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
