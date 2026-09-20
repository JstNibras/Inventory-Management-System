import { injectable } from 'tsyringe';
import { Product } from '../models/Product';
import { InMemoryRepository } from './InMemoryRepository';

@injectable()
export class ProductRepository extends InMemoryRepository<Product> {}