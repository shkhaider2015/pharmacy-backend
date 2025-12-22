// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePaymentStatusDto } from './create-payment-status.dto';

export class UpdatePaymentStatusDto extends PartialType(
  CreatePaymentStatusDto,
) {}
