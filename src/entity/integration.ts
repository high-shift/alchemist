import { Column, Entity, ManyToOne } from 'typeorm';
import { Account } from './Account';
import BaseEntity from './Base';

enum IntegrationTypes {
    ifood = 'ifood',
    ubereats = 'ubereats'
}

enum IntegrationStatus {
    active = 'active',
    inactive = 'inactive'
}

interface IntegrationJson {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    status?: IntegrationStatus;
    type?: IntegrationTypes
}

@Entity()
export class Integration extends BaseEntity {
    constructor() {
        super();
    }

    @Column({ default: 'ifood' })
    type: IntegrationTypes;

    @ManyToOne(() => Account, account => account.integrations)
    account: Account;

    @Column({ default: 'active' })
    status: IntegrationStatus;

    getJsonBody(): IntegrationJson {
        return {
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            status: this.status,
            type: this.type
        };
    }
}
