import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderEntity } from '../../../../purchase-orders/infrastructure/persistence/relational/entities/purchase-order.entity';
import { PurchaseOrderSeedService } from './purchase-order-seed.service';
import { SupplierEntity } from '../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrderEntity, SupplierEntity])],
  providers: [PurchaseOrderSeedService],
  exports: [PurchaseOrderSeedService],
})
export class PurchaseOrderSeedModule {}
