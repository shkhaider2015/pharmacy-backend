import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  code?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
