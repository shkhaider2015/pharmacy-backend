import { Module } from '@nestjs/common';
import { PurchaseOrderItemRepository } from '../purchase-order-item.repository';
import { PurchaseOrderItemRelationalRepository } from './repositories/purchase-order-item.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderItemEntity } from './entities/purchase-order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrderItemEntity])],
  providers: [
    {
      provide: PurchaseOrderItemRepository,
      useClass: PurchaseOrderItemRelationalRepository,
    },
  ],
  exports: [PurchaseOrderItemRepository],
})
export class RelationalPurchaseOrderItemPersistenceModule {}
