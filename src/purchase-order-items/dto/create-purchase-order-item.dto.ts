import { PurchaseOrderDto } from '../../purchase-orders/dto/purchase-order.dto';

import { productsDto } from '../../products/dto/products.dto';

import {
  // decorators here

  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreatePurchaseOrderItemDto {
  @ApiProperty({
    required: true,
    type: () => PurchaseOrderDto,
  })
  @ValidateNested()
  @Type(() => PurchaseOrderDto)
  @IsNotEmptyObject()
  purchaseOrder: PurchaseOrderDto;

  @ApiProperty({
    required: true,
    type: () => productsDto,
  })
  @ValidateNested()
  @Type(() => productsDto)
  @IsNotEmptyObject()
  product: productsDto;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  total: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  unitCost: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  RecievedQuantity: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  orderQuantity: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
