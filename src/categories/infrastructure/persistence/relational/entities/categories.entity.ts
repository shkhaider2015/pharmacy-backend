import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { productsEntity } from 'src/products/infrastructure/persistence/relational/entities/products.entity';

@Entity({
  name: 'categories',
})
export class CategoriesEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  code?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @ManyToMany(() => productsEntity, (product) => product.categories)
  products: productsEntity[];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
