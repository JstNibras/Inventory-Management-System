export interface IProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export type ProductUpdateDTO = Partial<Omit<IProduct, 'id'>>;

export class Product implements IProduct {
  private _stock: number;

  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    initialStock: number
  ) {
    this._stock = Math.max(0, initialStock);
  }

  get stock(): number {
    return this._stock;
  }

  public updateStock(quantity: number): void {
    if (this._stock + quantity < 0) {
      throw new Error(`Insufficient stock for product: ${this.name}`);
    }
    this._stock += quantity;
  }
}