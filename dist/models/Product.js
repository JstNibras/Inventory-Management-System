"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const AppError_js_1 = require("../errors/AppError.js");
class Product {
    id;
    name;
    price;
    categoryId;
    _stock;
    constructor(id, name, price, categoryId, initialStock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this._stock = Math.max(0, initialStock);
    }
    get stock() {
        return this._stock;
    }
    updateStock(quantityChange) {
        if (this._stock + quantityChange < 0) {
            throw new AppError_js_1.InsufficientStockError(this.name);
        }
        this._stock += quantityChange;
    }
}
exports.Product = Product;
