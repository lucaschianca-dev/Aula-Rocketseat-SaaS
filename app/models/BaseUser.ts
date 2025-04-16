// app/models/BaseUser.ts
export interface BaseUserData {
    id: string;
    name?: string;
    email: string;
    image?: string;
    role?: string; // Propriedade role incluída na base
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export abstract class BaseUser {
    protected data: BaseUserData;
  
    constructor(data: BaseUserData) {
      this.data = data;
    }
  
    getId(): string {
      return this.data.id;
    }
  
    getEmail(): string {
      return this.data.email;
    }
  
    getName(): string {
      return this.data.name || 'Usuário';
    }
  
    getProfileImage(): string {
      return this.data.image || '/default-avatar.png';
    }
  
    abstract getRole(): string;
  }