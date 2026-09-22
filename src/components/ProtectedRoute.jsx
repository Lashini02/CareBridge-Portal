import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

export default function ProtectedRoute({ allowedRole, children }) {
  const { state, getDecodedIDPIDToken, getBasicUserInfo } = useAuthContext();
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function extractRoles() {
      if (state.isAuthenticated) {
        try {
          const decodedToken = await getDecodedIDPIDToken().catch(() => null);
          const basicUserInfo = await getBasicUserInfo().catch(() => null);

          const rawSources = [
            decodedToken?.groups,
            decodedToken?.roles,
            decodedToken?.role,
            decodedToken?.group,
            decodedToken?.['http://wso2.org/claims/role'],
            decodedToken?.['http://wso2.org/claims/groups'],
            basicUserInfo?.groups,
            basicUserInfo?.roles,
            basicUserInfo?.role,
            basicUserInfo?.group,
          ];

          const extracted = new Set();

          rawSources.forEach(source => {
            if (!source) return;
            if (Array.isArray(source)) {
              source.forEach(item => {
                if (typeof item === 'string') {
                  item.split(',').forEach(s => extracted.add(s.trim()));
                } else if (item && typeof item === 'object') {
                  if (item.name) extracted.add(String(item.name));
                  else if (item.value) extracted.add(String(item.value));
                }
              });
            } else if (typeof source === 'string') {
              source.split(',').forEach(s => extracted.add(s.trim()));
            }
          });

          const rolesArray = Array.from(extracted);
          console.log('[CareBridge Auth] Detected user roles/groups:', rolesArray);
          setUserRoles(rolesArray);
        } catch (error) {
          console.error('[CareBridge Auth] Error extracting roles:', error);
        }
      }
      setLoading(false);
    }
    extractRoles();
  }, [state.isAuthenticated, getDecodedIDPIDToken, getBasicUserInfo]);

  if (state.isLoading || loading) {
    return <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>Verifying Identity & Roles...</div>;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check for Dev / Demo Mode Override
  const demoRole = sessionStorage.getItem('carebridge_demo_role');
  const isDemoAllowed = demoRole === 'All' || (demoRole && demoRole.toLowerCase() === allowedRole.toLowerCase());

  // Check actual token roles
  const targetLower = allowedRole.toLowerCase();
  const hasTokenRole = userRoles.some(role => {
    const r = role.toLowerCase();
    return (
      r === targetLower ||
      r === `${targetLower}s` || // e.g. "doctors" / "patients"
      r.includes(`/${targetLower}`) || // e.g. "/Doctor"
      r.includes(`internal/${targetLower}`) ||
      r.includes(`primary/${targetLower}`) ||
      r.includes(targetLower)
    );
  });

  if (!hasTokenRole && !isDemoAllowed) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{
          requiredRole: allowedRole,
          userRoles,
          username: state.username || state.email || 'Authenticated User',
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}