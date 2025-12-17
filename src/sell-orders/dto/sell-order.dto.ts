import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SellOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
