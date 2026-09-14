import { injectable } from 'tsyringe';
import { Product } from '../models/Product.js';
import { IProductRepository } from './IProductRepository.js';

@injectable()
export class InMemoryProductRepository implements IProductRepository {
  private products: Map<string, Product> = new Map();

  async findAll(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async findById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async save(product: Product): Promise<void> {
    this.products.set(product.id, product);
  }

  async delete(id: string): Promise<boolean> {
    return this.products.delete(id);
  }
}