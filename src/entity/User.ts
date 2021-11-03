import { Entity, Column } from 'typeorm';
import BaseEntity from './Base';

enum UserStatus {
    active = 'active',
    inactive = 'inactive'
}

export interface UserJson {
    id?: string;
    email: string;
    name: string;
    password?: string;
    phone_number: string;
    created_at?: Date;
    updated_at?: Date;
    status?: UserStatus;
}

@Entity()
export class User extends BaseEntity {
    constructor(params: UserJson) {
        super();
        Object.assign(this, params);
    }

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({ default: 'active' })
    status: UserStatus;

    @Column({ name: 'accepted_terms', nullable: true })
    acceptedTerms: boolean

    getJsonBody(): UserJson {
        return {
            email: this.email,
            name: this.name,
            phone_number: this.phoneNumber,
            status: this.status
        };
    }
}
