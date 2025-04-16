// app/models/index.ts
import { BaseUser, type BaseUserData } from './BaseUser';
import { Admin, type AdminData } from './Admin';
import { Customer, type CustomerData } from './Customer';
import { Employee, type EmployeeData } from './Employee';

// Re-exporta as classes (valores)
export { BaseUser, Admin, Customer, Employee };

// Re-exporta os tipos explicitamente com 'export type'
export type { BaseUserData, AdminData, CustomerData, EmployeeData };

// Define o tipo união para User
export type User = Admin | Employee | Customer;

// Tipo para os dados de usuário
export type UserData = AdminData | CustomerData | EmployeeData;

/**
 * Função factory para criar o tipo correto de usuário com base no role
 */
export function createUser(data: UserData): User {
  // Verifica o role para determinar qual classe instanciar
  if (data.role === 'admin') {
    return new Admin(data as AdminData);
  } else if (data.role === 'customer') {
    return new Customer(data as CustomerData);
  } else {
    // Default para Employee
    return new Employee(data as EmployeeData);
  }
}