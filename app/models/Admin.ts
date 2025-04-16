// app/models/Admin.ts
import { BaseUser, BaseUserData } from './BaseUser';

export interface AdminData extends BaseUserData {
  permissions?: string[];
}

export class Admin extends BaseUser {
  protected declare data: AdminData;

  constructor(data: AdminData) {
    super(data);
  }

  getRole(): string {
    return 'admin';
  }

  hasPermission(permission: string): boolean {
    return this.data.permissions?.includes(permission) || false;
  }

  canManageUsers(): boolean {
    return true;
  }

  static isAdmin(user: BaseUser): user is Admin {
    return user.getRole() === 'admin';
  }
}