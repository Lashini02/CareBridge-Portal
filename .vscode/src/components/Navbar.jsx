import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', background: '#0f172a', color: '#fff', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>CareBridge</Link>
      <div>
        {state.isAuthenticated ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>{state.username || state.email}</span>
            <button onClick={() => signOut()} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
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