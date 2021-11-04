import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntity from './Base';
import { User } from './User';

enum AccountStatus {
    active = 'active',
    inactive = 'inactive'
}

enum AccountType {
    standart = 'standart',
    basic = 'basic',
    premium = 'premium'
}
export interface AccountJson {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    status?: AccountStatus;
    type?: AccountType
}

@Entity()
export class Account extends BaseEntity {
    constructor() {
        super();
        // Object.assign(this, params);
    }

    @Column({ default: 'active' })
    status: AccountStatus;

    @Column({ default: 'basic' })
    type: AccountType;

    @OneToMany(() => User, user => user.account)
    users: User[];

    getJsonBody(): AccountJson {
        return {
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            status: this.status,
            type: this.type
        };
    }
}
