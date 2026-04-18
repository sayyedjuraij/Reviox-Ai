import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { BRAND } from '../constants';

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    // TODO: Connect to your email service (EmailJS, Formspree, Firebase)
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', business: '', message: '' });
  };

  const inputStyle = {
    display: 'block', width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    color: '#EAF2FF', fontSize: 14, outline: 'none',
    marginBottom: 14,
    fontFamily: "'Exo 2', sans-serif",
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <section id="contact" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(22px,4vw,40px)',
            color: '#EAF2FF', marginBottom: 12,
          }}>Get in Touch</h2>
          <p style={{ color: 'rgba(234,242,255,0.5)', fontSize: 15 }}>
            We're based in Dubai and ready to help you grow
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '📞', label: 'Phone / WhatsApp', lines: [BRAND.phone1, BRAND.phone2] },
              { icon: '📧', label: 'Email', lines: [BRAND.email] },
              { icon: '📍', label: 'Location', lines: [BRAND.location] },
            ].map((c, i) => (
              <GlassCard key={i} style={{ padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 11, marginBottom: 6, letterSpacing: 1 }}>
                    {c.label.toUpperCase()}
                  </div>
                  {c.lines.map((line, j) => (
                    <div key={j} style={{ color: '#EAF2FF', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                      {line}
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '16px 24px',
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.3)',
                borderRadius: 14,
                color: '#25D366', fontSize: 14, fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.12)'}
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Contact form */}
          <GlassCard style={{ padding: 28 }}>
            <h3 style={{
              color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif",
              fontSize: 14, marginBottom: 22,
            }}>Send a Message</h3>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <p style={{ color: '#00E0FF', fontSize: 14, fontWeight: 600 }}>Message sent! We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Your Name" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(30,167,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <input
                  name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="Email Address" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(30,167,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <input
                  name="business" value={form.business} onChange={handleChange}
                  placeholder="Business Name" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(30,167,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Your message..." rows={4}
                  style={{ ...inputStyle, resize: 'vertical', marginBottom: 18 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(30,167,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <GlowButton style={{ width: '100%' }} onClick={handleSubmit}>
                  Send Message →
                </GlowButton>
              </>
            )}
          </GlassCard>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;
