export interface IUser {
    id : string;
    name: string;
    role: 'ADMIN' | 'CUSTOMER';
}

export type UserCreateDTO = Pick<IUser, 'name' | 'role'>;

export abstract class User implements IUser {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly role: 'ADMIN' | 'CUSTOMER'
  ) {}

  abstract getPermissions(): string[];
}

export class AdminUser extends User {
  constructor(id: string, name: string) {
    super(id, name, 'ADMIN');
  }

  getPermissions(): string[] {
    return ['CREATE_PRODUCT', 'READ_PRODUCT', 'UPDATE_STOCK', 'DELETE_PRODUCT'];
  }
}

export class CustomerUser extends User {
  constructor(id: string, name: string) {
    super(id, name, 'CUSTOMER');
  }

  getPermissions(): string[] {
    return ['READ_PRODUCT'];
  }
}