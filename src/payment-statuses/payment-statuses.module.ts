import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { PaymentStatusesService } from './payment-statuses.service';
import { PaymentStatusesController } from './payment-statuses.controller';
import { RelationalPaymentStatusPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalPaymentStatusPersistenceModule,
  ],
  controllers: [PaymentStatusesController],
  providers: [PaymentStatusesService],
  exports: [PaymentStatusesService, RelationalPaymentStatusPersistenceModule],
})
export class PaymentStatusesModule {}
