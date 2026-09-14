import { injectable } from 'tsyringe';
import { IEntity } from '../interfaces/IEntity.js';
import { IRepository } from '../interfaces/IRepository.js';

@injectable()
export abstract class InMemoryRepository<T extends IEntity> implements IRepository<T> {
  protected storage: Map<string, T> = new Map();

  async findAll(): Promise<T[]> {
    return Array.from(this.storage.values());
  }

  async findById(id: string): Promise<T | undefined> {
    return this.storage.get(id);
  }

  async save(entity: T): Promise<void> {
    this.storage.set(entity.id, entity);
  }

  async delete(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }
}