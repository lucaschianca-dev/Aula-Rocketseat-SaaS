// app/lib/userHelpers.ts
import { db } from "./firebase"; // ajuste o caminho conforme sua estrutura

/**
 * Retorna o papel (role) do usuário baseado no email.
 * Se não encontrar o papel no banco, retorna o papel padrão.
 *
 * @param email - E-mail do usuário
 * @param defaultRole - Papel padrão se não encontrado (default: "employee")
 * @returns Papel do usuário
 */
export async function getUserRole(email: string, defaultRole: string = "employee"): Promise<string> {
  const userDoc = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  if (!userDoc.empty) {
    const userData = userDoc.docs[0]?.data();
    if (userData?.role) {
      return userData.role;
    }
  }
  return defaultRole;
}

/**
 * Retorna todos os usuários cadastrados no sistema.
 * Cada objeto do array inclui o ID do documento e os dados do usuário.
 *
 * @returns Array de usuários
 */
export async function getAllUsers(): Promise<any[]> {
  const usersSnapshot = await db.collection("users").get();

  // Mapeia cada documento para um objeto contendo seu id e demais dados
  const users = usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return users;
}