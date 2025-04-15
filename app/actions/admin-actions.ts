'use server'

import { checkUserRole } from '@/app/lib/check-role';

export async function adminOnlyAction() {
  const isAdmin = await checkUserRole(['admin']);
  
  if (!isAdmin) {
    throw new Error('Unauthorized');
  }
  
  // Realizar ação administrativa
}