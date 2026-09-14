import { injectable } from 'tsyringe';
import { Order } from '../models/Order.js';
import { InMemoryRepository } from './InMemoryRepository.js';

@injectable()
export class OrderRepository extends InMemoryRepository<Order> {}