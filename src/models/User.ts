import { IEntity } from "../interfaces/IEntity";

export abstract class User implements IEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public readonly role: 'ADMIN' | 'CUSTOMER'
  ) {}

  abstract getPermissions(): string[];
}

export class AdminUser extends User {
  constructor(id: string, name: string, email: string) {
    super(id, name, email, 'ADMIN');
  }
  getPermissions(): string[] {
    return ['CREATE_PRODUCT', 'MANAGE_ORDERS', 'VIEW_REPORTS'];
  }
}

export class CustomerUser extends User {
  constructor(id: string, name: string, email: string) {
    super(id, name, email, 'CUSTOMER');
  }
  getPermissions(): string[] {
    return ['CREATE_ORDER', 'VIEW_OWN_ORDERS'];
  }
}