import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { state, signIn, getDecodedIDPIDToken } = useAuthContext();
  const [idClaims, setIdClaims] = useState(null);

  useEffect(() => {
    if (state.isAuthenticated) {
      getDecodedIDPIDToken().then(claims => setIdClaims(claims));
    }
  }, [state.isAuthenticated, getDecodedIDPIDToken]);

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1>CareBridge Healthcare Access Portal</h1>
      <p style={{ color: '#64748b' }}>Role-based Access Control Demonstration using WSO2 Asgardeo</p>

      {!state.isAuthenticated ? (
        <div style={{ padding: '2rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'center', marginTop: '2rem' }}>
          <h3>Access Restricted</h3>
          <p>Please log in using your Asgardeo credentials to view assigned portals.</p>
          <button onClick={() => signIn()} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
            Sign In with Asgardeo
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <Link to="/doctor" style={{ padding: '10px 20px', background: '#059669', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
              Go to Doctor Portal
            </Link>
            <Link to="/patient" style={{ padding: '10px 20px', background: '#4f46e5', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
              Go to Patient Portal
            </Link>
          </div>

          {/* ID Token Claims Display (Screen Scope Requirement) */}
          <div style={{ background: '#1e293b', color: '#38bdf8', padding: '1.5rem', borderRadius: '8px', overflowX: 'auto' }}>
            <h4 style={{ color: '#f8fafc', marginTop: 0 }}>Decoded OIDC ID Token Claims</h4>
            <pre style={{ fontSize: '13px' }}>
              {idClaims ? JSON.stringify(idClaims, null, 2) : 'Loading claims...'}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}