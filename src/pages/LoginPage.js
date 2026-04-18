import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard  from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    // TODO: Replace with real Firebase auth
    // import { signInWithEmailAndPassword } from 'firebase/auth';
    // await signInWithEmailAndPassword(auth, form.email, form.password);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  const inputStyle = {
    display: 'block', width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    color: '#EAF2FF', fontSize: 14,
    fontFamily: "'Exo 2', sans-serif",
    outline: 'none', marginBottom: 16,
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0F1C',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 24,
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(30,167,255,0.07) 0%, transparent 70%)',
      }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              cursor: 'pointer', marginBottom: 8,
            }}
          >
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)',
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
              fontSize: 18, color: '#fff',
            }}>R</div>
            <span style={{
              fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 18,
              background: 'linear-gradient(135deg,#1EA7FF,#00E0FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Reviox AI</span>
          </div>
          <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 13 }}>Sign in to your account</p>
        </div>

        <GlassCard style={{ padding: 36 }}>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 18, color: '#EAF2FF',
            marginBottom: 28, textAlign: 'center',
          }}>Welcome Back</h2>

          {error && (
            <div style={{
              padding: '12px 16px', marginBottom: 16,
              background: 'rgba(255,107,107,0.1)',
              border: '1px solid rgba(255,107,107,0.3)',
              borderRadius: 10, color: '#FF6B6B', fontSize: 13,
            }}>{error}</div>
          )}

          <label style={{ color: 'rgba(234,242,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>
            Email Address
          </label>
          <input
            name="email" type="email" value={form.email}
            onChange={handleChange} placeholder="you@business.com"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(30,167,255,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />

          <label style={{ color: 'rgba(234,242,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>
            Password
          </label>
          <input
            name="password" type="password" value={form.password}
            onChange={handleChange} placeholder="••••••••"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(30,167,255,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />

          <div style={{ textAlign: 'right', marginTop: -8, marginBottom: 24 }}>
            <button
              style={{
                background: 'none', border: 'none',
                color: '#1EA7FF', fontSize: 12, cursor: 'pointer',
              }}
              onClick={() => alert('Password reset email sent! (TODO: connect Firebase)')}
            >Forgot password?</button>
          </div>

          <GlowButton
            style={{ width: '100%', fontSize: 15 }}
            onClick={handleLogin}
          >
            {loading ? 'Signing in…' : 'Log In'}
          </GlowButton>

          <p style={{ textAlign: 'center', marginTop: 22, color: 'rgba(234,242,255,0.4)', fontSize: 13 }}>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              style={{ background: 'none', border: 'none', color: '#1EA7FF', cursor: 'pointer', fontSize: 13 }}
            >Sign up free</button>
          </p>
        </GlassCard>

      </div>
    </div>
  );
}

export default LoginPage;
