import { Customer } from 'mercadopago';
import { Admin } from './Admin';
import { Employee } from './Employee';

// app/models/index.ts
export * from './BaseUser';
export * from './Admin';
export * from './Employee';
export * from './Customer';

export type User = Admin | Employee | Customer;

// Função factory para criar o tipo correto de usuário com base no role
export function createUser(data: any): User {
  switch(data.role) {
    case 'admin':
      return new Admin(data);
    case 'employee':
      return new Employee(data);
    case 'customer':
      return new Customer(data);
    default:
      // Padrão para Employee ou outra lógica que faça sentido
      return new Employee(data);
  }
}