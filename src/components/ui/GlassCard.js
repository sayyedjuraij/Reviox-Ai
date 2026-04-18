import React from 'react';

// =====================================================
// GlassCard — Reusable glassmorphism card component
// Usage: <GlassCard style={{ padding: 24 }}>...</GlassCard>
// glow: CSS rgb string e.g. "30,167,255" or "106,92,255"
// =====================================================

function GlassCard({ children, style = {}, glow, className = '', onClick }) {
  const glowColor = glow || '0,224,255';

  const baseStyle = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: `1px solid rgba(${glowColor},0.18)`,
    borderRadius: 20,
    boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
    ...style,
  };

  return (
    <div style={baseStyle} className={className} onClick={onClick}>
      {children}
    </div>
  );
}

export default GlassCard;
