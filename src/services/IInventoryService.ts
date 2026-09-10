import { Product } from '../models/Product.js';

export interface IInventoryService {
  addProduct(name: string, price: number, stock: number): Promise<Product>;
  listInventory(): Promise<Product[]>;
  adjustStock(productId: string, amount: number): Promise<Product>;
}