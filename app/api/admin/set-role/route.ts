import { NextResponse } from 'next/server';
import { auth } from '@/app/lib/auth';
import { db } from '@/app/lib/firebase';

// Permite alternar a função de um usuário
export async function GET(request: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const role = searchParams.get('role');
    
    if (!session?.user?.email) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Verifica se o usuário atual é admin
    const adminUser = await db
      .collection('users')
      .where('email', '==', session.user.email)
      .where('role', '==', 'admin')
      .get();

    if (adminUser.empty) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Verifica se os parâmetros são válidos
    if (!userId || !role || (role !== 'admin' && role !== 'employee')) {
      return NextResponse.json({ 
        error: 'Parâmetros inválidos. Use /api/admin/set-role?userId=XYZ&role=admin|employee' 
      }, { status: 400 });
    }
    
    // Atualiza o papel do usuário
    await db.collection('users').doc(userId).update({
      role: role,
      updatedAt: new Date()
    });
    
    // Redireciona de volta para a página de usuários
    return NextResponse.redirect(new URL('/admin/users', request.url));
  } catch (error) {
    console.error('Erro ao atualizar papel do usuário:', error);
    return NextResponse.json({ error: 'Erro ao processar requisição' }, { status: 500 });
  }
}

// Permite alternar a função de um usuário via POST
export async function POST(req: Request) {
  const session = await auth();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const role = searchParams.get('role');
  
  // Verifica se o usuário atual é admin
  const adminUser = await db
    .collection('users')
    .where('email', '==', session?.user?.email)
    .where('role', '==', 'admin')
    .get();

  if (adminUser.empty) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Verifica se os parâmetros são válidos
  if (!userId || !role || (role !== 'admin' && role !== 'employee')) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 });
  }
  
  // Atualiza o papel do usuário
  await db.collection('users').doc(userId).update({
    role: role,
    updatedAt: new Date()
  });
  
  // Redireciona de volta para a página de usuários
  return NextResponse.redirect(new URL('/admin/users', req.url));
}