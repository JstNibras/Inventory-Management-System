import { IEntity } from "./IEntity";

export interface IRepository<T extends IEntity> {
    findAll: Promise<T[]>;
    findById(id: string): Promise<T | undefined>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<boolean>;
}