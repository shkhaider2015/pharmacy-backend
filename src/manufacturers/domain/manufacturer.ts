import { ApiProperty } from '@nestjs/swagger';

export class Manufacturer {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  short?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  origin?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  address?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  license?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
