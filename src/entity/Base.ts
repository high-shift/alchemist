import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
class BaseEntity {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date
}

export default BaseEntity;
