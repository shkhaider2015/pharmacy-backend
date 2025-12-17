import { products } from '../../products/domain/products';
import { Customer } from '../../customers/domain/customer';
import { ApiProperty } from '@nestjs/swagger';

export class SellOrder {
  @ApiProperty({
    type: () => [products],
    nullable: false,
  })
  products: products[];

  @ApiProperty({
    type: () => Customer,
    nullable: false,
  })
  customer: Customer;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  netPrice?: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  discountPrice?: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  totalPrice: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  paymentStatus?: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  paymentMethod: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
