import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BRAND } from '../constants';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '60px 32px 28px',
      background: '#0A0F1C',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 40,
          marginBottom: 48,
        }}>

          {/* Brand */}
          <div style={{ maxWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32,
                background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Orbitron', sans-serif", fontWeight: 900, color: '#fff',
              }}>R</div>
              <span style={{
                fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 15,
                background: 'linear-gradient(135deg,#1EA7FF,#00E0FF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Reviox AI</span>
            </div>
            <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 12, lineHeight: 1.8 }}>
              {BRAND.tagline}.<br />AI-powered review automation for forward-thinking businesses.
            </p>
          </div>

          {/* Link columns */}
          {[
            {
              title: 'Product',
              links: [
                { label: 'Features', to: '/#features' },
                { label: 'Pricing',  to: '/#pricing' },
                { label: 'Live Demo', to: '/#demo' },
                { label: 'Dashboard', to: '/dashboard' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About',   to: '/#about' },
                { label: 'Blog',    to: '/#blog' },
                { label: 'Contact', to: '/#contact' },
              ],
            },
            {
              title: 'Legal',
              links: [
                { label: 'Privacy Policy', to: '#' },
                { label: 'Terms of Service', to: '#' },
                { label: 'Cookie Policy', to: '#' },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{
                color: 'rgba(234,242,255,0.3)', fontSize: 10,
                letterSpacing: 2, marginBottom: 18, fontWeight: 600,
              }}>{col.title.toUpperCase()}</h4>
              {col.links.map(l => (
                <div
                  key={l.label}
                  onClick={() => navigate(l.to)}
                  style={{
                    color: 'rgba(234,242,255,0.5)', fontSize: 13,
                    marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#1EA7FF'}
                  onMouseLeave={e => e.target.style.color = 'rgba(234,242,255,0.5)'}
                >{l.label}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{ color: 'rgba(234,242,255,0.3)', fontSize: 12 }}>
            © 2026 Reviox AI. All rights reserved. Dubai, UAE.
          </span>
          <span style={{ color: 'rgba(234,242,255,0.3)', fontSize: 12 }}>
            {BRAND.email} · {BRAND.phone1}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
