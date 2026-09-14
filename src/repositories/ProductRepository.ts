import { injectable } from 'tsyringe';
import { Product } from '../models/Product.js';
import { InMemoryRepository } from './InMemoryRepository.js';

@injectable()
export class ProductRepository extends InMemoryRepository<Product> {}