import { Generics } from '../../generics/domain/generics';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/domain/categories';

export class products {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  isPrescriptionRequired: boolean;

  @ApiProperty()
  stock: number;

  @ApiProperty({
    type: () => [Generics],
    nullable: true,
  })
  generics?: Generics[] | null;

  @ApiProperty({
    type: () => [Category],
    isArray: true,
  })
  categories: Category[];

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  expiryDate?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  manufactureDate?: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
