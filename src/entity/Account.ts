import { Entity, Column } from 'typeorm';
import BaseEntity from './Base';

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
    name: string;
    created_at?: Date;
    updated_at?: Date;
    status?: AccountStatus;
    type?: AccountType
}

@Entity()
export class Account extends BaseEntity {
    constructor(params: AccountJson) {
        super();
        Object.assign(this, params);
    }

    @Column({ unique: true })
    name: string;

    @Column({ default: 'active' })
    status: AccountStatus;

    @Column({ default: 'basic' })
    type: AccountType;

    getJsonBody(): AccountJson {
        return {
            name: this.name,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            status: this.status,
            type: this.type
        };
    }
}
