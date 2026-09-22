import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { state, signIn, signOut } = useAuthContext();
  const navigate = useNavigate();
  const demoRole = sessionStorage.getItem('carebridge_demo_role');

  const clearDemoMode = () => {
    sessionStorage.removeItem('carebridge_demo_role');
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', background: '#0f172a', color: '#fff', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>CareBridge</Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {demoRole && (
          <div style={{ background: '#f59e0b', color: '#000', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span>Demo Role: {demoRole}</span>
            <button onClick={clearDemoMode} title="Clear Demo Mode" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#000' }}>
              ✕
            </button>
          </div>
        )}

        {state.isAuthenticated ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>{state.username || state.email}</span>
            <button
              onClick={() => {
                sessionStorage.removeItem('carebridge_demo_role');
                signOut();
              }}
              style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => signIn()} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer' }}>
            Login with Asgardeo
          </button>
        )}
      </div>
    </nav>
  );
}