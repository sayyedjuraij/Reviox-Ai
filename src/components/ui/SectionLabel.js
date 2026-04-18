import React from 'react';

// =====================================================
// SectionLabel — Small badge label above section titles
// color: hex or CSS color string
// Usage: <SectionLabel color="#1EA7FF">FEATURES</SectionLabel>
// =====================================================

function SectionLabel({ children, color = '#1EA7FF' }) {
  // Convert hex to rgba manually for border
  const style = {
    display: 'inline-block',
    padding: '4px 16px',
    borderRadius: 50,
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: 600,
    marginBottom: 16,
    color: color,
    background: `${color}18`,   // 18 = ~10% opacity in hex
    border: `1px solid ${color}40`,  // 40 = ~25% opacity in hex
  };

  return <div style={style}>{children}</div>;
}

export default SectionLabel;
