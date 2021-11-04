import { getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import BaseRepository from './base-repository';

class AccountRepository extends BaseRepository<Account> {
    findOneByUserEmail(email: string) {
        return getRepository(this.model)
            .createQueryBuilder('account')
            .leftJoinAndSelect('account.users', 'user')
            .where('user.email = :email', { email })
            .getOne();

    }
}

export default new AccountRepository(Account);
