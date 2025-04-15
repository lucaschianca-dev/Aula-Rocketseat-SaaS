// app/api/user/role/route.ts
import { auth } from '@/app/lib/auth';
import { db } from '@/app/lib/firebase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ role: null });
    }

    const userDoc = await db
      .collection('users')
      .where('email', '==', session.user.email)
      .get();

    const userData = userDoc.docs[0]?.data();
    
    return NextResponse.json({ role: userData?.role || 'employee' });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ role: null }, { status: 500 });
  }
}