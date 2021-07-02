import { getRepository, ObjectType, UpdateResult } from 'typeorm';

abstract class BaseRepository<T> {
    public model: ObjectType<T>;

    constructor(model: ObjectType<T>) {
        this.model = model;
    }

    save(entity: T): Promise<T> {
        return getRepository(this.model).save(entity);
    }

    findOne(id: number): Promise<T> {
        return getRepository(this.model).findOne(id);
    }

    findAll(): Promise<T[]> {
        return getRepository(this.model).find();
    }

    updateOne(id: number, entity: T): Promise<UpdateResult> {
        return getRepository(this.model).update(id, entity);
    }
}

export default BaseRepository;
