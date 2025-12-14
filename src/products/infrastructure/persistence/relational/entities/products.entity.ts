import { GenericsEntity } from '../../../../../generics/infrastructure/persistence/relational/entities/generics.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { CategoriesEntity } from 'src/categories/infrastructure/persistence/relational/entities/categories.entity';

@Entity({
  name: 'products',
})
export class productsEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @Column()
  isPrescriptionRequired: boolean;

  @Column()
  stock: number;

  @ManyToMany(() => CategoriesEntity, (category) => category.products)
  @JoinTable()
  categories: CategoriesEntity[];

  @ManyToMany(() => GenericsEntity, { eager: false, nullable: true })
  @JoinTable()
  generics?: GenericsEntity[] | null;

  @Column({
    nullable: true,
    type: Date,
  })
  expiryDate?: Date | null;

  @Column({
    nullable: true,
    type: Date,
  })
  manufactureDate?: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
