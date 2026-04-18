import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard  from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';

const MOCK_USERS = [
  { business: 'Al Barsha Cafe',       plan: 'Premium',  status: 'Active',    scans: 892,  email: 'albarsha@gmail.com' },
  { business: 'Dubai Dental Clinic',  plan: 'Standard', status: 'Active',    scans: 341,  email: 'dubaidental@gmail.com' },
  { business: 'Marina Gym',           plan: 'Basic',    status: 'Active',    scans: 127,  email: 'marinagym@gmail.com' },
  { business: 'Palm Auto Wash',       plan: 'Premium',  status: 'Suspended', scans: 0,    email: 'palmwash@gmail.com' },
  { business: 'Jumeirah Spa',         plan: 'Standard', status: 'Trial',     scans: 23,   email: 'jspa@gmail.com' },
  { business: 'Downtown Bakery',      plan: 'Basic',    status: 'Active',    scans: 88,   email: 'dtbakery@gmail.com' },
];

function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.business.toLowerCase().includes(search.toLowerCase()) ||
    u.plan.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (i) => {
    const updated = [...users];
    updated[i] = {
      ...updated[i],
      status: updated[i].status === 'Suspended' ? 'Active' : 'Suspended',
    };
    setUsers(updated);
  };

  const statusColor = (s) => s === 'Active' ? '#00E0FF' : s === 'Suspended' ? '#FF6B6B' : '#FFD700';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0F1C', fontFamily: "'Exo 2', sans-serif" }}>

      {/* Sidebar */}
      <aside style={{
        width: 200, flexShrink: 0,
        background: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        padding: '24px 12px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 32, padding: '0 8px' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#1EA7FF,#6A5CFF)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, color: '#fff' }}>R</div>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 13, background: 'linear-gradient(135deg,#1EA7FF,#00E0FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Admin</span>
        </div>
        {[
          { label: 'Users',       icon: '👥' },
          { label: 'Revenue',     icon: '💰' },
          { label: 'Analytics',   icon: '📊' },
          { label: 'Settings',    icon: '⚙️' },
        ].map(item => (
          <button key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '11px 12px', marginBottom: 4,
            background: 'transparent', border: '1px solid transparent',
            borderRadius: 10, color: 'rgba(234,242,255,0.5)',
            cursor: 'pointer', fontSize: 13, fontFamily: "'Exo 2', sans-serif", textAlign: 'left',
          }}><span>{item.icon}</span>{item.label}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'rgba(234,242,255,0.3)', cursor: 'pointer', fontSize: 12, fontFamily: "'Exo 2', sans-serif", padding: '8px 12px', textAlign: 'left' }}>← Back to Site</button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <h2 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 20, marginBottom: 6 }}>Admin Dashboard</h2>
        <p style={{ color: 'rgba(234,242,255,0.4)', fontSize: 13, marginBottom: 28 }}>Manage all users, subscriptions, and platform settings</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Users',    val: '342',        icon: '👥', color: '#1EA7FF' },
            { label: 'Active Subs',    val: '289',        icon: '💳', color: '#00E0FF' },
            { label: 'Revenue (AED)',  val: '24,830',     icon: '💰', color: '#FFD700' },
            { label: 'Pending',        val: '12',         icon: '⏳', color: '#6A5CFF' },
          ].map((s, i) => (
            <GlassCard key={i} style={{ padding: 20 }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: s.color, fontSize: 24, fontWeight: 700, fontFamily: "'Orbitron', sans-serif" }}>{s.val}</div>
              <div style={{ color: 'rgba(234,242,255,0.4)', fontSize: 11, marginTop: 4 }}>{s.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* User table */}
        <GlassCard style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ color: '#EAF2FF', fontFamily: "'Orbitron', sans-serif", fontSize: 14 }}>User Management</h3>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search users…"
              style={{
                padding: '8px 14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, color: '#EAF2FF', fontSize: 13,
                fontFamily: "'Exo 2', sans-serif", outline: 'none', width: 200,
              }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Business', 'Email', 'Plan', 'Status', 'Scans', 'Action'].map(h => (
                    <th key={h} style={{
                      color: 'rgba(234,242,255,0.35)', fontWeight: 500,
                      padding: '10px 14px', textAlign: 'left',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      fontFamily: "'Exo 2', sans-serif",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={i}>
                    <td style={{ padding: '13px 14px', color: '#EAF2FF', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{u.business}</td>
                    <td style={{ padding: '13px 14px', color: 'rgba(234,242,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{u.email}</td>
                    <td style={{ padding: '13px 14px', color: 'rgba(234,242,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{u.plan}</td>
                    <td style={{ padding: '13px 14px', color: statusColor(u.status), fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{u.status}</td>
                    <td style={{ padding: '13px 14px', color: 'rgba(234,242,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{u.scans.toLocaleString()}</td>
                    <td style={{ padding: '13px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <button
                        onClick={() => toggleStatus(i)}
                        style={{
                          padding: '5px 14px', borderRadius: 6,
                          background: u.status === 'Suspended' ? 'rgba(0,224,255,0.1)' : 'rgba(255,107,107,0.1)',
                          border: `1px solid ${u.status === 'Suspended' ? 'rgba(0,224,255,0.3)' : 'rgba(255,107,107,0.3)'}`,
                          color: u.status === 'Suspended' ? '#00E0FF' : '#FF6B6B',
                          cursor: 'pointer', fontSize: 11, fontWeight: 600,
                          fontFamily: "'Exo 2', sans-serif",
                        }}
                      >{u.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

      </main>
    </div>
  );
}

export default AdminPage;
