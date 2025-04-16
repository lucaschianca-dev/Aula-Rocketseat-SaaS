// app/lib/userHelpers.ts
import { db } from "./firebase";
import { type User, type UserData, createUser } from "../models";

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
 * Busca e retorna todos os usuários cadastrados no sistema.
 * Converte os documentos do Firebase em instâncias dos modelos apropriados
 * usando a função factory createUser.
 * 
 * @returns Lista de usuários tipados (Admin, Employee, Customer)
 */
export async function getAllUsers(): Promise<User[]> {
  const usersSnapshot = await db.collection("users").get();

  // Mapeia cada documento para a instância de usuário apropriada
  const users = usersSnapshot.docs.map(doc => {
    const userData = {
      id: doc.id,
      ...doc.data(),
    } as UserData;
    
    return createUser(userData);
  });

  return users;
}

/**
 * Busca um usuário específico pelo ID
 * 
 * @param userId - ID do usuário
 * @returns O usuário encontrado ou null se não existir
 */
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    
    if (!userDoc.exists) {
      return null;
    }
    
    const userData = {
      id: userDoc.id,
      ...userDoc.data(),
    } as UserData;
    
    return createUser(userData);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

/**
 * Atualiza os dados de um usuário no banco de dados
 * 
 * @param userId - ID do usuário
 * @param userData - Dados parciais para atualização
 * @returns true se atualizado com sucesso, false caso contrário
 */
export async function updateUser(userId: string, userData: Partial<UserData>): Promise<boolean> {
  try {
    await db.collection("users").doc(userId).update(userData);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return false;
  }
}