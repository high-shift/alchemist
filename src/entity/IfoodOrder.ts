import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "./Base";
import { Integration } from "./Integration";

@Entity()
export class IfoodOrder extends BaseEntity {
    constructor() {
        super()
    }

    @Column({default: 'ifood'})
    origin: string;

    @OneToOne(() => Integration)
    @JoinColumn()
    integration: Integration;

    @Column()
    orderId: string;

    @Column()
    merchantId: string;

    @Column()
    customerId: string;

    @Column()
    customerName: string;

    @Column()
    customerPhone: string;

    @Column({ type: 'text'})
    items: string;

    @Column({ type: 'text'})
    payments: string;
}