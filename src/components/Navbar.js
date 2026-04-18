import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlowButton from './ui/GlowButton';

const NAV_LINKS = [
  { label: 'Features',    href: '/#features' },
  { label: 'How It Works', href: '/#howitworks' },
  { label: 'Pricing',     href: '/#pricing' },
  { label: 'About',       href: '/#about' },
  { label: 'Blog',        href: '/#blog' },
  { label: 'Contact',     href: '/#contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    const [path, hash] = href.split('#');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hide navbar on dashboard/admin pages
  const hiddenPaths = ['/dashboard', '/admin', '/superadmin', '/demo'];
  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 32px',
      background: scrolled
        ? 'rgba(10,15,28,0.92)'
        : 'rgba(10,15,28,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid rgba(255,255,255,${scrolled ? 0.08 : 0.04})`,
      transition: 'all 0.3s ease',
    }}>

      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
      >
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 16,
          color: '#fff',
        }}>R</div>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          background: 'linear-gradient(135deg,#1EA7FF,#00E0FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>Reviox AI</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {NAV_LINKS.map(link => (
          <button
            key={link.label}
            onClick={() => handleNav(link.href)}
            style={{
              background: 'none', border: 'none',
              color: 'rgba(234,242,255,0.6)',
              cursor: 'pointer', fontSize: 13,
              fontFamily: "'Exo 2', sans-serif", fontWeight: 600,
              letterSpacing: 0.3, transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.color = '#1EA7FF'; }}
            onMouseLeave={e => { e.target.style.color = 'rgba(234,242,255,0.6)'; }}
          >{link.label}</button>
        ))}
      </div>

      {/* Auth buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        <GlowButton
          variant="secondary"
          onClick={() => navigate('/login')}
          style={{ padding: '10px 22px', fontSize: 13 }}
        >Log In</GlowButton>
        <GlowButton
          onClick={() => navigate('/signup')}
          style={{ padding: '10px 22px', fontSize: 13 }}
        >Get Started</GlowButton>
      </div>
    </nav>
  );
}

export default Navbar;
