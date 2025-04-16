// app/components/AdminGuard.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { requireAuth } from "@/app/lib/authHelpers";
import { getUserRole } from "@/app/lib/userHelpers";

interface AdminGuardProps {
  children: ReactNode;
}

/**
 * Um componente wrapper que, no lado do servidor, garante que:
 * - O usuário esteja autenticado (senão redireciona para /login).
 * - O papel do usuário seja 'admin' (senão redireciona para /unauthorized).
 *
 * Por ser um componente server-side (sem "use client"),
 * a verificação acontece antes do conteúdo ser enviado ao navegador.
 */
export default async function AdminGuard({ children }: AdminGuardProps) {
  // Assegura que o usuário está autenticado
  const session = await requireAuth();

  // Busca o papel do usuário
  let userRole = "employee";
  if (session?.user?.email) {
    userRole = await getUserRole(session.user.email);
  }

  // Se o papel não for 'admin', redireciona para uma página de acesso negado
  if (userRole !== "admin") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}