"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const ProductRepository_1 = require("./repositories/ProductRepository");
const OrderRepository_1 = require("./repositories/OrderRepository");
const OrderService_1 = require("./services/OrderService");
const Product_1 = require("./models/Product");
const User_1 = require("./models/User");
// 1. Register Singletons into DI Container
tsyringe_1.container.registerSingleton('ProductRepository', ProductRepository_1.ProductRepository);
tsyringe_1.container.registerSingleton('OrderRepository', OrderRepository_1.OrderRepository);
tsyringe_1.container.registerSingleton(OrderService_1.OrderService);
async function bootstrap() {
    console.log('--- SYSTEM INITIALIZING ---');
    const productRepo = tsyringe_1.container.resolve('ProductRepository');
    const orderService = tsyringe_1.container.resolve(OrderService_1.OrderService);
    // 2. Seed Master Data
    const prod1 = new Product_1.Product('PROD-1', 'Mechanical Keyboard', 120, 'CAT-1', 10);
    const prod2 = new Product_1.Product('PROD-2', 'Gaming Mouse', 60, 'CAT-1', 15);
    await productRepo.save(prod1);
    await productRepo.save(prod2);
    // 3. Instantiate Actor User
    const admin = new User_1.AdminUser('USR-101', 'Ahmad Nibras', 'nibras@example.com');
    console.log(`User Logged In: ${admin.name} | Permissions: ${admin.getPermissions().join(', ')}`);
    // 4. Execute Transaction via Business Service Layer
    const newOrder = await orderService.createOrder(admin.id, [
        { productId: prod1.id, quantity: 2 },
        { productId: prod2.id, quantity: 1 }
    ]);
    console.log('\n--- ORDER PLACED SUCCESSFULLY ---');
    console.log(`Order ID: ${newOrder.id}`);
    console.log(`Total Amount: $${newOrder.totalAmount}`);
    console.log(`Remaining ${prod1.name} Stock: ${prod1.stock}`);
}
bootstrap().catch((err) => console.error('Application Execution Error:', err.message));
