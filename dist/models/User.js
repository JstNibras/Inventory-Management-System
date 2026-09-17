"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerUser = exports.AdminUser = exports.User = void 0;
class User {
    id;
    name;
    email;
    role;
    constructor(id, name, email, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
exports.User = User;
class AdminUser extends User {
    constructor(id, name, email) {
        super(id, name, email, 'ADMIN');
    }
    getPermissions() {
        return ['CREATE_PRODUCT', 'MANAGE_ORDERS', 'VIEW_REPORTS'];
    }
}
exports.AdminUser = AdminUser;
class CustomerUser extends User {
    constructor(id, name, email) {
        super(id, name, email, 'CUSTOMER');
    }
    getPermissions() {
        return ['CREATE_ORDER', 'VIEW_OWN_ORDERS'];
    }
}
exports.CustomerUser = CustomerUser;
