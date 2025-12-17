import { productsDto } from '../../products/dto/products.dto';

import { CustomerDto } from '../../customers/dto/customer.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
  IsArray,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateSellOrderDto {
  @ApiProperty({
    required: true,
    type: () => [productsDto],
  })
  @ValidateNested()
  @Type(() => productsDto)
  @IsArray()
  products: productsDto[];

  @ApiProperty({
    required: true,
    type: () => CustomerDto,
  })
  @ValidateNested()
  @Type(() => CustomerDto)
  @IsNotEmptyObject()
  customer: CustomerDto;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  netPrice?: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsNumber()
  discountPrice?: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  paymentMethod: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
