import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleCanvas from '../components/ParticleCanvas';
import QRAnimation from '../components/QRAnimation';
import GlowButton from '../components/ui/GlowButton';

function HeroSection() {
  const navigate = useNavigate();

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '80px 24px',
    }}>

      {/* Background effects */}
      <ParticleCanvas />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,167,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 860 }}>

        {/* QR animation */}
        <div className="float" style={{ marginBottom: 40 }}>
          <QRAnimation />
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 18px',
          background: 'rgba(30,167,255,0.1)',
          border: '1px solid rgba(30,167,255,0.25)',
          borderRadius: 50,
          marginBottom: 24,
          fontSize: 11, color: '#1EA7FF', letterSpacing: 1,
        }}>
          <div className="pulse-dot" style={{ width: 6, height: 6, background: '#00E0FF', borderRadius: '50%' }} />
          AI-POWERED REVIEW AUTOMATION
        </div>

        {/* Headline */}
        <h1 className="glow-text" style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(28px, 5vw, 62px)',
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: 20,
          background: 'linear-gradient(135deg, #EAF2FF 0%, #1EA7FF 40%, #00E0FF 70%, #6A5CFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Turn Every Customer Into<br />a 5-Star Review
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: 18, color: 'rgba(234,242,255,0.65)',
          lineHeight: 1.7, marginBottom: 10,
        }}>
          AI-powered instant reviews with zero typing.
        </p>
        <p style={{
          fontSize: 14, color: 'rgba(234,242,255,0.4)',
          lineHeight: 1.8, marginBottom: 44,
          maxWidth: 560, margin: '0 auto 44px',
        }}>
          Reviox AI transforms the way businesses collect and grow through customer feedback
          using AI-powered automation and smart review systems — built for Dubai and beyond.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <GlowButton onClick={scrollToDemo} style={{ fontSize: 15, padding: '15px 38px' }}>
            ⚡ Try Live Demo
          </GlowButton>
          <GlowButton variant="secondary" onClick={() => navigate('/signup')} style={{ fontSize: 15, padding: '15px 38px' }}>
            Get Started Free
          </GlowButton>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
          {[
            ['1,247+', 'Scans Today'],
            ['4.9★',   'Avg Rating'],
            ['87%',    'Google Redirects'],
          ].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 26, fontWeight: 700, color: '#1EA7FF',
              }}>{val}</div>
              <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 12, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
