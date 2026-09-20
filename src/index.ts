import 'reflect-metadata';
import { container } from 'tsyringe';
import { ProductRepository } from './repositories/ProductRepository';
import { OrderRepository } from './repositories/OrderRepository';
import { OrderService } from './services/OrderService';
import { Product } from './models/Product';
import { AdminUser, CustomerUser } from './models/User';

container.registerSingleton('ProductRepository', ProductRepository);
container.registerSingleton('OrderRepository', OrderRepository);
container.registerSingleton(OrderService);

async function terminal() {
  console.log('--- SYSTEM INITIALIZING ---');

  const productRepo = container.resolve(ProductRepository);
  const orderRepo = container.resolve(OrderRepository);
  const orderService = container.resolve(OrderService);

  const admin = new AdminUser('USR-001', 'Ahmad Nibras', 'nibras@example.com');
  const customer = new CustomerUser('USR-002', 'John Doe', 'john@example.com');

  console.log(`Admin Permissions (${admin.name}):`, admin.getPermissions().join(', '));

  const keyboard = new Product('PROD-1', 'Mechanical Keyboard', 120, 'CAT-ELEC', 10);
  const mouse = new Product('PROD-2', 'Wireless Mouse', 50, 'CAT-ELEC', 25);
  const monitor = new Product('PROD-3', '4K Monitor', 350, 'CAT-ELEC', 5);

  await productRepo.save(keyboard);
  await productRepo.save(mouse);
  await productRepo.save(monitor);

  const allProducts = await productRepo.findAll();
  console.log(`Total Products in Database: ${allProducts.length}`);

  keyboard.updateStock(5); 
}

terminal().catch((err) => console.error('Application Execution Error:', err.message));