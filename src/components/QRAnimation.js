import React, { useState, useEffect } from 'react';

// =====================================================
// QRAnimation — Animated QR scan visual for Hero
// =====================================================

function QRAnimation() {
  const [scanY, setScanY] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanY(y => {
        const next = y + 1.5;
        return next > 90 ? 5 : next;
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Generate QR-like grid pattern (7x7)
  const cells = Array.from({ length: 49 }, (_, i) => i);

  // Simulate corner finder patterns + random data
  const cornerCells = [0,1,2,7,8,9,14,15,16,32,33,34,39,40,41,46,47,48];
  const dataCells   = [20,21,24,25,27,29,31,36,37,43,44];

  const getColor = (i) => {
    if (cornerCells.includes(i)) return '#00E0FF';
    if (dataCells.includes(i)) return 'rgba(30,167,255,0.9)';
    return i % 3 === 0 ? 'rgba(106,92,255,0.6)' : 'transparent';
  };

  return (
    <div style={{ position: 'relative', width: 144, height: 144, margin: '0 auto' }}>
      {/* QR Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 2,
        padding: 12,
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 14,
        border: '1px solid rgba(0,224,255,0.25)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        height: '100%',
      }}>
        {cells.map(i => (
          <div
            key={i}
            style={{
              width: '100%',
              paddingBottom: '100%',
              background: getColor(i),
              borderRadius: 2,
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Scan line */}
      <div style={{
        position: 'absolute',
        left: 12,
        right: 12,
        top: `${scanY}%`,
        height: 2,
        background: 'linear-gradient(90deg, transparent, #00E0FF, transparent)',
        boxShadow: '0 0 10px #00E0FF, 0 0 20px rgba(0,224,255,0.4)',
        borderRadius: 2,
        transition: 'top 16ms linear',
      }} />

      {/* Corner brackets */}
      {[
        { top: 4, left: 4, borderTop: '2px solid #00E0FF', borderLeft: '2px solid #00E0FF', borderRadius: '4px 0 0 0' },
        { top: 4, right: 4, borderTop: '2px solid #00E0FF', borderRight: '2px solid #00E0FF', borderRadius: '0 4px 0 0' },
        { bottom: 4, left: 4, borderBottom: '2px solid #00E0FF', borderLeft: '2px solid #00E0FF', borderRadius: '0 0 0 4px' },
        { bottom: 4, right: 4, borderBottom: '2px solid #00E0FF', borderRight: '2px solid #00E0FF', borderRadius: '0 0 4px 0' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 16, height: 16, ...s }} />
      ))}
    </div>
  );
}

export default QRAnimation;
