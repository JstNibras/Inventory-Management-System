import { injectable } from 'tsyringe';
import { Order } from '../models/Order';
import { InMemoryRepository } from './InMemoryRepository'; 

@injectable()
export class OrderRepository extends InMemoryRepository<Order> {}