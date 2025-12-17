import { PurchaseOrderItemEntity } from '../../../../../purchase-order-items/infrastructure/persistence/relational/entities/purchase-order-item.entity';

import { SupplierEntity } from '../../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'purchase_order',
})
export class PurchaseOrderEntity extends EntityRelationalHelper {
  @OneToMany(
    () => PurchaseOrderItemEntity,
    (childEntity) => childEntity.purchaseOrder,
    { eager: true, nullable: false },
  )
  purchaseOrderItems: PurchaseOrderItemEntity[];

  @ManyToOne(() => SupplierEntity, { eager: true, nullable: true })
  supplierId?: SupplierEntity | null;

  @Column({
    nullable: false,
    type: Number,
  })
  totalAmount: number;

  @Column({
    nullable: true,
    type: String,
  })
  status?: string | null;

  @Column({
    nullable: true,
    type: Date,
  })
  actualDeliveryDate?: Date | null;

  @Column({
    nullable: true,
    type: Date,
  })
  expectedDeliveryDate?: Date | null;

  @Column({
    nullable: true,
    type: Date,
  })
  orderDate?: Date | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
