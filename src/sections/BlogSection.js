import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import SectionLabel from '../components/ui/SectionLabel';
import { BLOG_POSTS } from '../constants';

function BlogSection() {
  return (
    <section id="blog" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <SectionLabel color="#00E0FF">BLOG</SectionLabel>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(22px,4vw,40px)',
            color: '#EAF2FF',
          }}>Insights & Growth Tips</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {BLOG_POSTS.map((post, i) => (
            <GlassCard
              key={i}
              style={{ padding: 28, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.4)';
              }}
            >
              {/* Tag */}
              <div style={{
                display: 'inline-block',
                padding: '3px 12px',
                background: 'rgba(30,167,255,0.1)',
                border: '1px solid rgba(30,167,255,0.2)',
                borderRadius: 50,
                color: '#1EA7FF', fontSize: 10,
                marginBottom: 18, letterSpacing: 1, fontWeight: 600,
              }}>{post.tag.toUpperCase()}</div>

              {/* Title */}
              <h3 style={{
                color: '#EAF2FF', fontSize: 15,
                lineHeight: 1.55, marginBottom: 18,
                fontWeight: 600,
              }}>{post.title}</h3>

              {/* Meta */}
              <div style={{ display: 'flex', gap: 18, color: 'rgba(234,242,255,0.4)', fontSize: 12 }}>
                <span>📅 {post.date}</span>
                <span>⏱ {post.read} read</span>
              </div>

              {/* Read more */}
              <div style={{
                marginTop: 18, color: '#1EA7FF', fontSize: 12, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>Read Article <span style={{ fontSize: 14 }}>→</span></div>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BlogSection;
