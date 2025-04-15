import { auth } from './auth';
import { db } from './firebase';

export async function checkUserRole(allowedRoles: string[]) {
  const session = await auth();
  
  if (!session?.user?.email) {
    return false;
  }

  const userDoc = await db
    .collection('users')
    .where('email', '==', session.user.email)
    .get();

  const userData = userDoc.docs[0]?.data();
  return allowedRoles.includes(userData?.role);
}