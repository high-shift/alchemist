import { User } from '../entity/User';
import BaseRepository from './base-repository';
import { getRepository } from 'typeorm';

class UserRepository extends BaseRepository<User> {
    findOneByEmail(email: string) {
        return getRepository(this.model).findOne({
            email
        });
    }
}

export default new UserRepository(User);
