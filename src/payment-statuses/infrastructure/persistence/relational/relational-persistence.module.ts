import { Module } from '@nestjs/common';
import { PaymentStatusRepository } from '../payment-status.repository';
import { PaymentStatusRelationalRepository } from './repositories/payment-status.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatusEntity } from './entities/payment-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatusEntity])],
  providers: [
    {
      provide: PaymentStatusRepository,
      useClass: PaymentStatusRelationalRepository,
    },
  ],
  exports: [PaymentStatusRepository],
})
export class RelationalPaymentStatusPersistenceModule {}
