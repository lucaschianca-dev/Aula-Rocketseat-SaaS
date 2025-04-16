// app/lib/userHelpers.ts
import { db } from "./firebase";
import { Admin, Customer, Employee, BaseUserData } from "../models";

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

export async function getAllUsers() {
  const usersSnapshot = await db.collection("users").get();

  return usersSnapshot.docs.map(doc => {
    const userData = {
      id: doc.id,
      ...doc.data()
    } as BaseUserData & { role?: string };
    
    // Criar a instância apropriada baseada no papel do usuário
    switch(userData.role) {
      case 'admin':
        return new Admin(userData);
      case 'customer':
        return new Customer(userData);
      default:
        return new Employee(userData);
    }
  });
}