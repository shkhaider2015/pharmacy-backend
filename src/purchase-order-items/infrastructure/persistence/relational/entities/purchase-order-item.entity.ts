import { PurchaseOrderEntity } from '../../../../../purchase-orders/infrastructure/persistence/relational/entities/purchase-order.entity';

import { productsEntity } from '../../../../../products/infrastructure/persistence/relational/entities/products.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'purchase_order_item',
})
export class PurchaseOrderItemEntity extends EntityRelationalHelper {
  @ManyToOne(
    () => PurchaseOrderEntity,
    (parentEntity) => parentEntity.purchaseOrderItems,
    { eager: false, nullable: false },
  )
  purchaseOrder: PurchaseOrderEntity;

  @ManyToOne(() => productsEntity, { eager: true, nullable: false })
  product: productsEntity;

  @Column({
    nullable: false,
    type: Number,
  })
  total: number;

  @Column({
    nullable: false,
    type: Number,
  })
  unitCost: number;

  @Column({
    nullable: false,
    type: Number,
  })
  RecievedQuantity: number;

  @Column({
    nullable: false,
    type: Number,
  })
  orderQuantity: number;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
