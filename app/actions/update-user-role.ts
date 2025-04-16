// app/actions/update-user-role.ts
'use server';

import { db } from "@/app/lib/firebase";
import { revalidatePath } from "next/cache";

type Role = 'admin' | 'employee';

/**
 * Atualiza o papel (role) de um usuário no banco de dados
 */
export async function updateUserRole(formData: FormData): Promise<void> {
  const userId = formData.get('userId') as string;
  const newRole = formData.get('newRole') as Role;
  
  if (!userId || !newRole) {
    console.error("Dados inválidos para atualização de papel.");
    return;
  }

  try {
    // Atualiza o papel do usuário no banco de dados
    await db.collection("users").doc(userId).update({
      role: newRole
    });
    
    // Revalida a página para refletir as mudanças
    revalidatePath('/admin/users');
  } catch (error) {
    console.error("Erro ao atualizar papel do usuário:", error);
  }
}