import { inject, injectable } from 'tsyringe';
import type { IInventoryService } from '../services/IInventoryService.js';
import { User } from '../models/User.js';

@injectable()
export class TerminalController {
  constructor(
    @inject('IInventoryService') private inventoryService: IInventoryService
  ) {}

  async renderDashboard(currentUser: User): Promise<void> {
    console.clear();
    console.log(` TERMINAL INVENTORY SYSTEM - User: ${currentUser.name} [${currentUser.role}]`);
    console.log(`Permissions: ${currentUser.getPermissions().join(', ')}\n`);

    const items = await this.inventoryService.listInventory();

    console.log('CURRENT INVENTORY:');
    console.table(
      items.map(item => ({
        ID: item.id,
        Name: item.name,
        Price: `$${item.price}`,
        Stock: item.stock
      }))
    );
  }
}