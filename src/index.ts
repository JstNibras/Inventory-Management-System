import 'reflect-metadata';
import { container } from 'tsyringe';
import { InMemoryProductRepository } from './repositories/InMemoryProductRepository.js';
import { InventoryService } from './services/InventoryService.js';
import { TerminalController } from './controllers/TerminalController.js';
import { AdminUser } from './models/User.js';

container.registerSingleton('IProductRepository', InMemoryProductRepository);
container.registerSingleton('IInventoryService', InventoryService);

async function main() {
  const controller = container.resolve(TerminalController);
  const inventoryService = container.resolve(InventoryService);

  const keyboard = await inventoryService.addProduct('Mechanical Keyboard', 120, 15);
  const mouse = await inventoryService.addProduct('Wireless Mouse', 45, 30);
  const monitor = await inventoryService.addProduct('4K Monitor', 400, 8);

  const singleProduct = await inventoryService.getProductById(mouse.id);
  console.log(`Fetched Item: ${singleProduct.name} - Price: $${singleProduct.price}`);

  await inventoryService.adjustStock(keyboard.id, -3);
  await inventoryService.adjustStock(monitor.id, 2);

  await inventoryService.deleteProduct(mouse.id);

  const admin = new AdminUser('USR-101', 'Ahmad Nibras');
  await controller.renderDashboard(admin);
}

main().catch(err => console.error('Application Error:', err));