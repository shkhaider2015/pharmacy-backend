import { ApiProperty } from '@nestjs/swagger';

export class Batch {
  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  currentQuantity?: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  initialQuantity?: number;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  expiryDate: Date;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  manufacturerDate?: Date | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  batchNumber: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
