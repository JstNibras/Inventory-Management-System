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
exports.TerminalController = void 0;
const tsyringe_1 = require("tsyringe");
let TerminalController = class TerminalController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async renderDashboard(currentUser) {
        console.clear();
        console.log(` TERMINAL INVENTORY SYSTEM - User: ${currentUser.name} [${currentUser.role}]`);
        console.log(`Permissions: ${currentUser.getPermissions().join(', ')}\n`);
        const items = await this.inventoryService.listInventory();
        console.log('CURRENT INVENTORY:');
        console.table(items.map(item => ({
            ID: item.id,
            Name: item.name,
            Price: `$${item.price}`,
            Stock: item.stock
        })));
    }
};
exports.TerminalController = TerminalController;
exports.TerminalController = TerminalController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IInventoryService')),
    __metadata("design:paramtypes", [Object])
], TerminalController);
