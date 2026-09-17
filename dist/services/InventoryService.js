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
exports.InventoryService = void 0;
const tsyringe_1 = require("tsyringe");
const Product_js_1 = require("../models/Product.js");
let InventoryService = class InventoryService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async addProduct(name, price, stock) {
        const id = `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const product = new Product_js_1.Product(id, name, price, stock);
        await this.repo.save(product);
        return product;
    }
    async listInventory() {
        return this.repo.findAll();
    }
    async getProductById(id) {
        const product = await this.repo.findById(id);
        if (!product)
            throw new Error(`Product with ID ${id} not found.`);
        return product;
    }
    async adjustStock(productId, amount) {
        const product = await this.getProductById(productId);
        product.updateStock(amount);
        await this.repo.save(product);
        return product;
    }
    async deleteProduct(productId) {
        await this.getProductById(productId);
        return this.repo.delete(productId);
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IProductRepository')),
    __metadata("design:paramtypes", [Object])
], InventoryService);
