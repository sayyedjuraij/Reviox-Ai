import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard  from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('form'); // 'form' | 'verify'
  const [form, setForm] = useState({ business: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    setError('');
    if (!form.business || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    // TODO: Replace with real Firebase auth
    // import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
    // const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
    // await sendEmailVerification(cred.user);
    setTimeout(() => {
      setLoading(false);
      setStep('verify');
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
    outline: 'none', marginBottom: 14,
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0F1C',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 24,
    }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(106,92,255,0.07) 0%, transparent 70%)',
      }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            onClick={() => navigate('/')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 8 }}
          >
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)',
              borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 18, color: '#fff',
            }}>R</div>
            <span style={{
              fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 18,
              background: 'linear-gradient(135deg,#1EA7FF,#00E0FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Reviox AI</span>
          </div>
          <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 13 }}>Create your free account</p>
        </div>

        <GlassCard style={{ padding: 36 }}>
          {step === 'form' ? (
            <>
              <h2 style={{
                fontFamily: "'Orbitron', sans-serif", fontSize: 17,
                color: '#EAF2FF', marginBottom: 28, textAlign: 'center',
              }}>Get Started Free</h2>

              {error && (
                <div style={{
                  padding: '12px 16px', marginBottom: 16,
                  background: 'rgba(255,107,107,0.1)',
                  border: '1px solid rgba(255,107,107,0.3)',
                  borderRadius: 10, color: '#FF6B6B', fontSize: 13,
                }}>{error}</div>
              )}

              {[
                { name: 'business', label: 'Business Name', placeholder: 'Al Barsha Cafe', type: 'text' },
                { name: 'email', label: 'Email Address', placeholder: 'you@business.com', type: 'email' },
                { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
                { name: 'confirm', label: 'Confirm Password', placeholder: '••••••••', type: 'password' },
              ].map(field => (
                <div key={field.name}>
                  <label style={{ color: 'rgba(234,242,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>
                    {field.label}
                  </label>
                  <input
                    name={field.name} type={field.type}
                    value={form[field.name]} onChange={handleChange}
                    placeholder={field.placeholder} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(30,167,255,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              ))}

              <GlowButton style={{ width: '100%', fontSize: 15, marginTop: 8 }} onClick={handleSignup}>
                {loading ? 'Creating account…' : 'Create Account'}
              </GlowButton>

              <p style={{ textAlign: 'center', marginTop: 18, color: 'rgba(234,242,255,0.3)', fontSize: 11, lineHeight: 1.7 }}>
                By signing up you agree to Reviox AI's Terms of Service and Privacy Policy.
              </p>

              <p style={{ textAlign: 'center', marginTop: 16, color: 'rgba(234,242,255,0.4)', fontSize: 13 }}>
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  style={{ background: 'none', border: 'none', color: '#1EA7FF', cursor: 'pointer', fontSize: 13 }}
                >Log in</button>
              </p>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 20 }}>📧</div>
              <h3 style={{
                color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif",
                fontSize: 16, marginBottom: 12,
              }}>Verify Your Email</h3>
              <p style={{ color: 'rgba(234,242,255,0.55)', fontSize: 13, lineHeight: 1.8, marginBottom: 28 }}>
                We've sent a verification link to <strong style={{ color: '#1EA7FF' }}>{form.email}</strong>.
                Click the link to activate your account and access your dashboard.
              </p>
              <GlowButton onClick={() => navigate('/dashboard')}>
                Open Dashboard →
              </GlowButton>
              <br /><br />
              <button
                onClick={() => setStep('form')}
                style={{ background: 'none', border: 'none', color: 'rgba(234,242,255,0.4)', fontSize: 12, cursor: 'pointer' }}
              >← Back to form</button>
            </div>
          )}
        </GlassCard>

      </div>
    </div>
  );
}

export default SignupPage;
