// app/hooks/useUserRole.ts
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useUserRole() {
  const { data: session, status } = useSession();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/user/role');
          const data = await response.json();
          setRole(data.role);
        } catch (error) {
          console.error('Error fetching role:', error);
          setRole(null);
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setRole(null);
        setLoading(false);
      }
    }

    fetchRole();
  }, [status]);

  return {
    role,
    loading,
    isAdmin: role === 'admin'
  };
}