import { inject, injectable } from 'tsyringe';
import { Product } from '../models/Product.js';
import type { IProductRepository } from '../repositories/IProductRepository.js';
import { IInventoryService } from './IInventoryService.js';

@injectable()
export class InventoryService implements IInventoryService {
  constructor(
    @inject('IProductRepository') private repo: IProductRepository
  ) {}

  async addProduct(name: string, price: number, stock: number): Promise<Product> {
    const id = `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const product = new Product(id, name, price, stock);
    await this.repo.save(product);
    return product;
  }

  async listInventory(): Promise<Product[]> {
    return this.repo.findAll();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.repo.findById(id);
    if (!product) throw new Error(`Product with ID ${id} not found.`);
    return product;
  }

  async adjustStock(productId: string, amount: number): Promise<Product> {
    const product = await this.getProductById(productId);
    product.updateStock(amount);
    await this.repo.save(product);
    return product;
  }

  async deleteProduct(productId: string): Promise<boolean> {
    await this.getProductById(productId); 
    return this.repo.delete(productId);
  }
}