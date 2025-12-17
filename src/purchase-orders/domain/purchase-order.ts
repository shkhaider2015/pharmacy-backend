import { PurchaseOrderItem } from '../../purchase-order-items/domain/purchase-order-item';
import { Supplier } from '../../suppliers/domain/supplier';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseOrder {
  @ApiProperty({
    type: () => [PurchaseOrderItem],
    nullable: false,
  })
  purchaseOrderItems: PurchaseOrderItem[];

  @ApiProperty({
    type: () => Supplier,
    nullable: true,
  })
  supplierId?: Supplier | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  totalAmount: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  actualDeliveryDate?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  expectedDeliveryDate?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  orderDate?: Date | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
