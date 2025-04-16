// app/pagamentos/page.tsx (componente de servidor)

import PaymentClient from '@/app/components/PaymentClient';
import { auth } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export default async function PagamentosPage() {
  const session = await auth();

  // Se não houver usuário logado, redireciona para a tela de login
  if (!session?.user) {
    redirect('/login');
  }

  // Renderiza o componente client-side que contém as funcionalidades de pagamento
  return <PaymentClient />;
}