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
    const id = `PROD-${Date.now()}`;
    const product = new Product(id, name, price, stock);
    await this.repo.save(product);
    return product;
  }

  async listInventory(): Promise<Product[]> {
    return this.repo.findAll();
  }

  async adjustStock(productId: string, amount: number): Promise<Product> {
    const product = await this.repo.findById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    product.updateStock(amount);
    await this.repo.save(product);
    return product;
  }
}