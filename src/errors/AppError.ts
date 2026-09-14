export class AppError extends Error {
    constructor(
        public override message : string,
        public statusCode: number = 400
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundError extends AppError {
  constructor(entity: string, id: string) {
    super(`${entity} with ID ${id} was not found.`, 404);
  }
}

export class InsufficientStockError extends AppError {
  constructor(productName: string) {
    super(`Insufficient stock available for product: ${productName}`, 400);
  }
}