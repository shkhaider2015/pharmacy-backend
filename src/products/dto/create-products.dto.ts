import { ManufacturerDto } from '../../manufacturers/dto/manufacturer.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  IsUUID,
  IsDate,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  Transform,
  Type,
} from 'class-transformer';

export class CreateproductsDto {
  @ApiProperty({
    required: false,
    type: () => ManufacturerDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ManufacturerDto)
  @IsNotEmptyObject()
  manufacturer?: ManufacturerDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.

  // Do not remove comment below.
  // <creating-property-dto />

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isPrescriptionRequired: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsUUID('all', { each: true })
  categories: string[];

  @ApiProperty({
    required: false,
    type: () => [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  generics?: string[] | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  expiryDate?: Date | null;

  @ApiProperty({
    required: false,
    type: () => Date,
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  manufactureDate?: Date | null;
}
