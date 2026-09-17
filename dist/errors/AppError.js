"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientStockError = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    message;
    statusCode;
    constructor(message, statusCode = 400) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(entity, id) {
        super(`${entity} with ID ${id} was not found.`, 404);
    }
}
exports.NotFoundError = NotFoundError;
class InsufficientStockError extends AppError {
    constructor(productName) {
        super(`Insufficient stock available for product: ${productName}`, 400);
    }
}
exports.InsufficientStockError = InsufficientStockError;
