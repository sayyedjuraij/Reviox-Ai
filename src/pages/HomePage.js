import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sections
import HeroSection      from '../sections/HeroSection';
import DemoSection      from '../sections/DemoSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import FeaturesSection  from '../sections/FeaturesSection';
import PricingSection   from '../sections/PricingSection';
import AboutSection     from '../sections/AboutSection';
import BlogSection      from '../sections/BlogSection';
import FAQSection       from '../sections/FAQSection';
import ContactSection   from '../sections/ContactSection';
import Footer           from '../components/Footer';

// UI
import GlassCard  from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

// Dashboard CTA banner between FAQ and Contact
function DashboardCTA() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '80px 24px', background: '#121826' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <GlassCard style={{
          padding: 52, textAlign: 'center',
          background: 'rgba(30,167,255,0.04)',
          border: '1px solid rgba(30,167,255,0.18)',
        }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(18px,3vw,30px)',
            color: '#EAF2FF', marginBottom: 12,
          }}>Ready to See the Full Dashboard?</h2>
          <p style={{
            color: 'rgba(234,242,255,0.5)', fontSize: 15,
            maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7,
          }}>
            Explore the Client, Admin, Demo, and Super Admin dashboards — all fully interactive.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <GlowButton
              onClick={() => navigate('/dashboard')}
              style={{ fontSize: 15, padding: '15px 38px' }}
            >📊 Open Dashboard</GlowButton>
            <GlowButton
              variant="secondary"
              onClick={() => navigate('/signup')}
              style={{ fontSize: 15, padding: '15px 38px' }}
            >🚀 Get Started Free</GlowButton>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main style={{ paddingTop: 68 /* navbar height */ }}>
      <HeroSection />
      <DemoSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <AboutSection />
      <BlogSection />
      <FAQSection />
      <DashboardCTA />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default HomePage;
