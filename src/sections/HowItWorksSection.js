import React from 'react';
import SectionLabel from '../components/ui/SectionLabel';
import { HOW_IT_WORKS } from '../constants';

function HowItWorksSection() {
  return (
    <section id="howitworks" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>

        <SectionLabel color="#00E0FF">HOW IT WORKS</SectionLabel>
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(22px,4vw,40px)',
          color: '#EAF2FF', marginBottom: 12,
        }}>Three Steps to More Reviews</h2>
        <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 15, marginBottom: 70 }}>
          From scan to published Google review in under 30 seconds
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 0,
        }}>
          {HOW_IT_WORKS.map((step, i) => (
            <React.Fragment key={i}>
              <div style={{ flex: '1 1 240px', maxWidth: 280, padding: '0 20px', textAlign: 'center' }}>
                {/* Icon circle */}
                <div style={{
                  width: 90, height: 90, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(30,167,255,0.15), rgba(106,92,255,0.15))',
                  border: '1px solid rgba(30,167,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36, margin: '0 auto 22px',
                  boxShadow: '0 0 30px rgba(30,167,255,0.1)',
                }}>{step.icon}</div>

                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 10, color: '#1EA7FF',
                  marginBottom: 10, letterSpacing: 2, fontWeight: 700,
                }}>STEP {step.num}</div>

                <h3 style={{
                  color: '#EAF2FF', fontSize: 18,
                  fontFamily: "'Orbitron', sans-serif",
                  marginBottom: 12,
                }}>{step.title}</h3>

                <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 13, lineHeight: 1.8 }}>
                  {step.desc}
                </p>
              </div>

              {/* Connector line between steps */}
              {i < HOW_IT_WORKS.length - 1 && (
                <div style={{
                  width: 60, height: 2,
                  background: 'linear-gradient(90deg, #1EA7FF, #6A5CFF)',
                  marginTop: 45, flexShrink: 0, alignSelf: 'flex-start',
                  opacity: 0.5,
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
