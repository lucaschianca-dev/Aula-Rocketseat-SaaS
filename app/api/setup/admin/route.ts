// Rota para configuração inicial de administrador
// IMPORTANTE: Use apenas em ambiente de desenvolvimento
// Remova ou proteja adequadamente em produção

import { NextResponse } from 'next/server';
import { db } from '@/app/lib/firebase';
import { auth } from '@/app/lib/auth';

// Esta rota permite visualizar usuários e configurar um admin
export async function GET(request: Request) {
  // Verifica se está em ambiente de desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Esta rota só está disponível em ambiente de desenvolvimento' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const email = searchParams.get('email');

  // Obtém sessão atual
  const session = await auth();
  const currentUserEmail = session?.user?.email;

  // Listar todos os usuários
  if (action === 'list') {
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        name: data.name,
        role: data.role || 'employee',
        createdAt: data.createdAt?.toDate() || null,
      };
    });
    
    return NextResponse.json({ users, currentUser: currentUserEmail });
  }
  
  // Definir um usuário como admin
  if (action === 'setadmin' && email) {
    const userQuery = await db.collection('users')
      .where('email', '==', email)
      .get();
    
    if (userQuery.empty) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    
    const userDoc = userQuery.docs[0];
    
    // Atualiza o usuário para admin
    await db.collection('users').doc(userDoc.id).update({
      role: 'admin',
      updatedAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      message: `Usuário ${email} configurado como admin`,
      userId: userDoc.id
    });
  }
  
  return NextResponse.json({
    message: 'API de configuração de admin',
    usage: {
      listUsers: '/api/setup/admin?action=list',
      setAdmin: '/api/setup/admin?action=setadmin&email=seuemail@example.com'
    },
    currentUser: currentUserEmail
  });
} 