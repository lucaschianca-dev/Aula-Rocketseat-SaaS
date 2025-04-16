// lib/authHelpers.ts
import { redirect } from "next/navigation";
import { auth } from "./auth"; // sua função que busca a sessão

/**
 * Garante que o usuário esteja autenticado.
 * Se não estiver, redireciona para a página de login.
 */
export async function requireAuth() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return session;
}

/**
 * Garantir que o usuário não esteja autenticado
 * (por exemplo, em páginas de login).
 */
export async function requireNoAuth() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return session;
}