import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

enum UserStatus {
    active = 'active',
    inactive = 'inactive'
}

export interface UserJson {
    id?: number;
    email: string;
    name: string;
    password?: string;
    phone_number: string;
    created_at?: Date;
    updated_at?: Date;
    status?: UserStatus;
}

@Entity()
export class User {
    constructor(params: UserJson) {
        Object.assign(this, params);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'uuid',
        type: 'varchar',
        length: 150,
        unique: true
    })
    uuid: string;

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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date

    @Column({ name: 'accepted_terms', nullable: true })
    acceptedTerms: boolean

    getJsonBody(): UserJson {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            phone_number: this.phoneNumber,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            status: this.status
        };
    }
}
