import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentStatusDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
