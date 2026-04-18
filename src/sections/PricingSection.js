import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import SectionLabel from '../components/ui/SectionLabel';
import { PRICING_PLANS } from '../constants';

function PricingCard({ plan, price, features, popular }) {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 320 }}>
      {popular && (
        <div style={{
          position: 'absolute', top: -14, left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)',
          color: '#fff', fontSize: 11, fontWeight: 700,
          padding: '5px 18px', borderRadius: 50,
          whiteSpace: 'nowrap', zIndex: 1,
          boxShadow: '0 4px 16px rgba(30,167,255,0.4)',
        }}>🔥 MOST POPULAR</div>
      )}

      <GlassCard
        glow={popular ? '30,167,255' : '255,255,255'}
        style={{
          padding: 32, height: '100%', boxSizing: 'border-box',
          ...(popular ? {
            border: '1px solid rgba(30,167,255,0.45)',
            boxShadow: '0 0 50px rgba(30,167,255,0.15), 0 8px 40px rgba(0,0,0,0.4)',
          } : {}),
        }}
      >
        <h3 style={{
          color: popular ? '#1EA7FF' : '#EAF2FF',
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 16, marginBottom: 10,
        }}>{plan}</h3>

        <div style={{ marginBottom: 26 }}>
          <span style={{
            color: '#EAF2FF', fontSize: 44,
            fontWeight: 700, fontFamily: "'Orbitron', sans-serif",
          }}>AED {price}</span>
          <span style={{ color: 'rgba(234,242,255,0.35)', fontSize: 14 }}>/mo</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 30 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#00E0FF', marginTop: 1, flexShrink: 0 }}>✓</span>
              <span style={{ color: 'rgba(234,242,255,0.65)', fontSize: 13 }}>{f}</span>
            </div>
          ))}
        </div>

        <GlowButton
          variant={popular ? 'primary' : 'secondary'}
          onClick={() => navigate('/signup')}
          style={{ width: '100%' }}
        >Get Started</GlowButton>
      </GlassCard>
    </div>
  );
}

function PricingSection() {
  return (
    <section id="pricing" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel color="#FFD700">PRICING</SectionLabel>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(22px,4vw,40px)',
            color: '#EAF2FF', marginBottom: 12,
          }}>Simple, Transparent Pricing</h2>
          <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 15 }}>
            No setup fees. Cancel anytime. Priced for UAE businesses.
          </p>
        </div>

        <div style={{
          display: 'flex', gap: 24,
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'stretch',
        }}>
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={i} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
