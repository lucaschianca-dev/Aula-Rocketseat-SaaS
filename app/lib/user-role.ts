import { db } from '@/app/lib/firebase';

export type UserRole = 'admin' | 'employee';

export async function setUserRole(userId: string, role: UserRole) {
  await db.collection('users').doc(userId).update({
    role: role,
    updatedAt: new Date()
  });
}