import { IEntity } from "../interfaces/IEntity";

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export class Order implements IEntity {
  public status: OrderStatus = 'PENDING';
  public readonly createdAt: Date = new Date();

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly items: OrderItem[],
    public readonly totalAmount: number
  ) {}
}