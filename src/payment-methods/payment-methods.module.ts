import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import { RelationalPaymentMethodPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalPaymentMethodPersistenceModule,
  ],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService],
  exports: [PaymentMethodsService, RelationalPaymentMethodPersistenceModule],
})
export class PaymentMethodsModule {}
