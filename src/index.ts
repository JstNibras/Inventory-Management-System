import 'reflect-metadata';
import { container } from 'tsyringe';
import { ProductRepository } from './repositories/ProductRepository';
import { OrderRepository } from './repositories/OrderRepository';
import { OrderService } from './services/OrderService';
import { Product } from './models/Product';
import { AdminUser } from './models/User';

// 1. Register Singletons into DI Container
container.registerSingleton('ProductRepository', ProductRepository);
container.registerSingleton('OrderRepository', OrderRepository);
container.registerSingleton(OrderService);

async function bootstrap() {
  console.log('--- SYSTEM INITIALIZING ---');

  const productRepo = container.resolve<ProductRepository>('ProductRepository');
  const orderService = container.resolve(OrderService);

  // 2. Seed Master Data
  const prod1 = new Product('PROD-1', 'Mechanical Keyboard', 120, 'CAT-1', 10);
  const prod2 = new Product('PROD-2', 'Gaming Mouse', 60, 'CAT-1', 15);

  await productRepo.save(prod1);
  await productRepo.save(prod2);

  // 3. Instantiate Actor User
  const admin = new AdminUser('USR-101', 'Ahmad Nibras', 'nibras@example.com');
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