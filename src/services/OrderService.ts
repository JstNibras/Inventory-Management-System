import { inject, injectable } from 'tsyringe';
import { Order, OrderItem } from '../models/Order';
import { ProductRepository } from '../repositories/ProductRepository';
import { OrderRepository } from '../repositories/OrderRepository';
import { NotFoundError } from '../errors/AppError';

@injectable()
export class OrderService {
    constructor(
        @inject('ProductRepository') private productRepo: ProductRepository,
        @inject('OrderRepository') private orderRepo: OrderRepository
    ) {}

    async createOrder(userId: string, itemRequests: { productId: string; quantity: number }[]): Promise<Order> {
        let total = 0;
        const orderItems: OrderItem[] = [];

        for (const req of itemRequests) {
            const product = await this.productRepo.findById(req.productId);
            if (!product) throw new NotFoundError('Product', req.productId);

            product.updateStock(-req.quantity);
            await this.productRepo.save(product);

            orderItems.push({
                productId: product.id,
                quantity: req.quantity,
                unitPrice: product.price
            });

            total += product.price * req.quantity
        }

        const orderId = `ORD-${Date.now()}`;
        const order = new Order(orderId, userId, orderItems, total);
        await this.orderRepo.save(order);

        return order;
    }
}