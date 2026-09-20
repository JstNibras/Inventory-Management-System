import { IEntity } from '../interfaces/IEntity';
import { InsufficientStockError } from '../errors/AppError.js';

export class Product implements IEntity {
  private _stock: number;

  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public categoryId: string,
    initialStock: number
  ) {
    this._stock = Math.max(0, initialStock);
  }

  get stock(): number {
    return this._stock;
  }

  public updateStock(quantityChange: number): void {
    if (this._stock + quantityChange < 0) {
      throw new InsufficientStockError(this.name);
    }
    this._stock += quantityChange;
  }
}