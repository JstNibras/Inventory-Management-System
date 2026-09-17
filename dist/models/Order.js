"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    id;
    userId;
    items;
    totalAmount;
    status = 'PENDING';
    createdAt = new Date();
    constructor(id, userId, items, totalAmount) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.totalAmount = totalAmount;
    }
}
exports.Order = Order;
