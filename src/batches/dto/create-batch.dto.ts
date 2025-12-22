import {
  // decorators here

  IsString,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here

  Transform,
} from 'class-transformer';

export class CreateBatchDto {
  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  currentQuantity?: number;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  initialQuantity?: number;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  expiryDate: Date;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  manufacturerDate?: Date | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  batchNumber: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
