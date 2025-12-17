import { productsEntity } from '../../../../../products/infrastructure/persistence/relational/entities/products.entity';

import { CustomerEntity } from '../../../../../customers/infrastructure/persistence/relational/entities/customer.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'sell_order',
})
export class SellOrderEntity extends EntityRelationalHelper {
  @ManyToMany(() => productsEntity, { eager: true, nullable: false })
  @JoinTable()
  products: productsEntity[];

  @ManyToOne(() => CustomerEntity, { eager: true, nullable: false })
  customer: CustomerEntity;

  @Column({
    nullable: false,
    type: Number,
  })
  netPrice?: number;

  @Column({
    nullable: false,
    type: Number,
  })
  discountPrice?: number;

  @Column({
    nullable: false,
    type: Number,
  })
  totalPrice: number;

  @Column({
    nullable: false,
    type: String,
  })
  paymentStatus?: string;

  @Column({
    nullable: false,
    type: String,
  })
  paymentMethod: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
