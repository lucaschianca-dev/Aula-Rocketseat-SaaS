// app/components/AdminOnly.tsx
'use client';

import { ReactNode } from 'react';
import { useUserRole } from '@/app/hooks/useUserRole';

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const { role, loading } = useUserRole();

  if (loading) return null;
  if (role !== 'admin') return fallback;

  return <>{children}</>;
}