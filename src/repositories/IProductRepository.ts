import { Product } from '../models/Product.js';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  save(product: Product): Promise<void>;
  delete(id: string): Promise<boolean>;
}