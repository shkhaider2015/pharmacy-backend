// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSellOrderDto } from './create-sell-order.dto';

export class UpdateSellOrderDto extends PartialType(CreateSellOrderDto) {}
