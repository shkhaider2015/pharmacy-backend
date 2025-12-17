import { Module } from '@nestjs/common';
import { SellOrderRepository } from '../sell-order.repository';
import { SellOrderRelationalRepository } from './repositories/sell-order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellOrderEntity } from './entities/sell-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellOrderEntity])],
  providers: [
    {
      provide: SellOrderRepository,
      useClass: SellOrderRelationalRepository,
    },
  ],
  exports: [SellOrderRepository],
})
export class RelationalSellOrderPersistenceModule {}
