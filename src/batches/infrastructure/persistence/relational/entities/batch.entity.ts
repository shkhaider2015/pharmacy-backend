import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'batch',
})
export class BatchEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Number,
  })
  currentQuantity?: number;

  @Column({
    nullable: false,
    type: Number,
  })
  initialQuantity?: number;

  @Column({
    nullable: false,
    type: Date,
  })
  expiryDate: Date;

  @Column({
    nullable: true,
    type: Date,
  })
  manufacturerDate?: Date | null;

  @Column({
    nullable: false,
    type: String,
  })
  batchNumber: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
