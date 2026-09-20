"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const tsyringe_1 = require("tsyringe");
const Order_1 = require("../models/Order");
const ProductRepository_1 = require("../repositories/ProductRepository");
const OrderRepository_1 = require("../repositories/OrderRepository");
const AppError_1 = require("../errors/AppError");
let OrderService = class OrderService {
    productRepo;
    orderRepo;
    constructor(productRepo, orderRepo) {
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }
    async createOrder(userId, itemRequests) {
        let total = 0;
        const orderItems = [];
        for (const req of itemRequests) {
            const product = await this.productRepo.findById(req.productId);
            if (!product)
                throw new AppError_1.NotFoundError('Product', req.productId);
            product.updateStock(-req.quantity);
            await this.productRepo.save(product);
            orderItems.push({
                productId: product.id,
                quantity: req.quantity,
                unitPrice: product.price
            });
            total += product.price * req.quantity;
        }
        const orderId = `ORD-${Date.now()}`;
        const order = new Order_1.Order(orderId, userId, orderItems, total);
        await this.orderRepo.save(order);
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ProductRepository')),
    __param(1, (0, tsyringe_1.inject)('OrderRepository')),
    __metadata("design:paramtypes", [ProductRepository_1.ProductRepository, OrderRepository_1.OrderRepository])
], OrderService);
