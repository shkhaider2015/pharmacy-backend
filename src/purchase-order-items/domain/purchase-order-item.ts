import { PurchaseOrder } from '../../purchase-orders/domain/purchase-order';
import { products } from '../../products/domain/products';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseOrderItem {
  @ApiProperty({
    type: () => PurchaseOrder,
    nullable: false,
  })
  purchaseOrder: PurchaseOrder;

  @ApiProperty({
    type: () => products,
    nullable: false,
  })
  product: products;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  total: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  unitCost: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  RecievedQuantity: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  orderQuantity: number;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
