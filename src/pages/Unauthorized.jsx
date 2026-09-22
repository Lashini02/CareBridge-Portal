import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const requiredRole = state.requiredRole || 'Doctor / Patient';
  const userRoles = state.userRoles || [];
  const username = state.username || 'User';

  const enableDemoMode = (role) => {
    sessionStorage.setItem('carebridge_demo_role', role);
    const targetPath = role.toLowerCase() === 'doctor' ? '/doctor' : '/patient';
    navigate(targetPath);
  };

  return (
    <div style={{ maxWidth: '750px', margin: '3rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '2rem', border: '1px solid #fecaca', background: '#fef2f2', borderRadius: '12px' }}>
        <h1 style={{ color: '#dc2626', marginTop: 0 }}>403 - Access Denied</h1>
        <p style={{ fontSize: '1.1rem', color: '#991b1b' }}>
          Your authenticated Asgardeo account does not have the required <strong>{requiredRole}</strong> role to view this page.
        </p>

        {/* Diagnostic info */}
        <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: '8px', border: '1px solid #fee2e2', marginTop: '1.5rem', textStyle: 'left' }}>
          <h3 style={{ marginTop: 0, fontSize: '1rem', color: '#374151' }}>Authentication Diagnostics</h3>
          <p style={{ margin: '0.4rem 0', fontSize: '0.95rem' }}>
            <strong>Logged In User:</strong> {username}
          </p>
          <p style={{ margin: '0.4rem 0', fontSize: '0.95rem' }}>
            <strong>Required Role:</strong> <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{requiredRole}</span>
          </p>
          <p style={{ margin: '0.4rem 0', fontSize: '0.95rem' }}>
            <strong>Roles Found in Asgardeo Token:</strong>{' '}
            {userRoles.length > 0 ? (
              <span style={{ background: '#e0e7ff', padding: '2px 8px', borderRadius: '4px', color: '#3730a3', fontWeight: 'bold' }}>
                {userRoles.join(', ')}
              </span>
            ) : (
              <span style={{ color: '#d97706', fontWeight: 'bold' }}>None detected (groups / roles claim empty)</span>
            )}
          </p>
        </div>

        {/* Demo / Testing mode option */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '1.2rem', borderRadius: '8px', marginTop: '1.5rem' }}>
          <h4 style={{ marginTop: 0, color: '#1e40af' }}>💡 Demo & Testing Override</h4>
          <p style={{ fontSize: '0.9rem', color: '#1e3a8a', marginBottom: '1rem' }}>
            If you are testing locally or haven't configured user groups inside WSO2 Asgardeo Console yet, you can enable Demo Mode below to preview the portal:
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => enableDemoMode('Doctor')}
              style={{ background: '#059669', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Enable Demo Mode (Doctor)
            </button>
            <button
              onClick={() => enableDemoMode('Patient')}
              style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Enable Demo Mode (Patient)
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}