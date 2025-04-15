import { ReactNode } from 'react';
import { useUserRole } from '@/app/hooks/useUserRole';
import { redirect } from 'next/navigation';

export function AdminGuard({ children }: { children: ReactNode }) {
  const { role, loading } = useUserRole();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (role !== 'admin') {
    redirect('/unauthorized');
  }

  return <>{children}</>;
}