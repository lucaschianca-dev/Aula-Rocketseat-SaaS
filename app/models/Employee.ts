// app/models/Employee.ts
import { BaseUser, BaseUserData } from './BaseUser';

export interface EmployeeData extends BaseUserData {
  department?: string;
  hireDate?: Date;
}

export class Employee extends BaseUser {
  protected declare data: EmployeeData;

  constructor(data: EmployeeData) {
    super(data);
  }

  getRole(): string {
    return 'employee';
  }

  getDepartment(): string {
    return this.data.department || 'Geral';
  }

  getHireDate(): Date | undefined {
    return this.data.hireDate;
  }
}