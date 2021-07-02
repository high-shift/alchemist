import { User } from '../entity/User';
import { UpdateResult } from 'typeorm';

export interface Repository<T> {
    save(entity: T): Promise<T>;
    findOne(id: number): Promise<T>;
    findAll(): Promise<T[]>;
    updateOne(id: number, entity: T): Promise<UpdateResult>;
}

export interface UserRepository extends Repository<User> {
    findOneByEmail(email: string): Promise<User>
}
