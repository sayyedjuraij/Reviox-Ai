import React from 'react';

// =====================================================
// GlowButton — Reusable CTA button
// variant: "primary" (filled gradient) | "secondary" (outlined)
// Usage: <GlowButton onClick={fn}>Click Me</GlowButton>
// =====================================================

function GlowButton({ children, variant = 'primary', onClick, style = {}, type = 'button' }) {
  const isPrimary = variant === 'primary';

  const baseStyle = {
    padding: '13px 30px',
    borderRadius: 50,
    border: isPrimary ? 'none' : '1px solid rgba(30,167,255,0.5)',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 14,
    fontFamily: "'Exo 2', sans-serif",
    letterSpacing: 0.5,
    transition: 'all 0.3s ease',
    background: isPrimary
      ? 'linear-gradient(135deg, #1EA7FF, #6A5CFF)'
      : 'transparent',
    color: isPrimary ? '#fff' : '#1EA7FF',
    boxShadow: isPrimary
      ? '0 0 30px rgba(30,167,255,0.35), 0 4px 20px rgba(0,0,0,0.3)'
      : 'none',
    display: 'inline-block',
    textAlign: 'center',
    ...style,
  };

  return (
    <button type={type} onClick={onClick} style={baseStyle}>
      {children}
    </button>
  );
}

export default GlowButton;
