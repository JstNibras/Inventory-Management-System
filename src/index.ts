import 'reflect-metadata';
import { container } from 'tsyringe';
import { InMemoryProductRepository } from './repositories/InMemoryProductRepository.js';
import { InventoryService } from './services/InventoryService.js';
import { TerminalController } from './controllers/TerminalController.js';
import { AdminUser } from './models/User.js';

container.registerSingleton('IProductRepository', InMemoryProductRepository);
container.registerSingleton('IInventoryService', InventoryService);

async function main() {
  // 2. Resolve Controllers and Services via Container
  const controller = container.resolve(TerminalController);
  const inventoryService = container.resolve(InventoryService);

  // 3. Seed Initial Inventory Data
  const prod1 = await inventoryService.addProduct('Mechanical Keyboard', 120, 15);
  await inventoryService.addProduct('Wireless Mouse', 45, 30);
  await inventoryService.addProduct('USB-C Dock', 85, 10);

  // 4. Demonstrate Business Logic (Stock Adjustment)
  await inventoryService.adjustStock(prod1.id, -2);

  // 5. Render Output in Terminal as an Admin User
  const admin = new AdminUser('USR-101', 'Ahmad Nibras');
  await controller.renderDashboard(admin);
}

main().catch(err => console.error('Application Error:', err));