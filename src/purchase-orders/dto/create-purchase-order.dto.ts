import { PurchaseOrderItemDto } from '../../purchase-order-items/dto/purchase-order-item.dto';

import { SupplierDto } from '../../suppliers/dto/supplier.dto';

import {
  // decorators here

  Transform,
  Type,
} from 'class-transformer';

import {
  // decorators here

  IsOptional,
  IsDate,
  IsString,
  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
  IsArray,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreatePurchaseOrderDto {
  @ApiProperty({
    required: true,
    type: () => [PurchaseOrderItemDto],
  })
  @ValidateNested()
  @Type(() => PurchaseOrderItemDto)
  @IsArray()
  purchaseOrderItems: PurchaseOrderItemDto[];

  @ApiProperty({
    required: false,
    type: () => SupplierDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupplierDto)
  @IsNotEmptyObject()
  supplierId?: SupplierDto | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  actualDeliveryDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  expectedDeliveryDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  orderDate?: Date | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
