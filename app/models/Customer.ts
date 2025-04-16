// app/models/Customer.ts
import { BaseUser, BaseUserData } from './BaseUser';

export interface CustomerData extends BaseUserData {
  phone?: string;
  lastVisit?: Date;
  visits?: number;
}

export class Customer extends BaseUser {
  protected declare data: CustomerData;

  constructor(data: CustomerData) {
    super(data);
  }

  getRole(): string {
    return 'customer';
  }

  getPhone(): string | undefined {
    return this.data.phone;
  }

  getVisitCount(): number {
    return this.data.visits || 0;
  }

  getLastVisit(): Date | undefined {
    return this.data.lastVisit;
  }
}