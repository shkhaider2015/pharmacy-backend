import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderItemEntity } from '../../../../purchase-order-items/infrastructure/persistence/relational/entities/purchase-order-item.entity';
import { PurchaseOrderItemSeedService } from './purchase-order-item-seed.service';
import { productsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { PurchaseOrderEntity } from '../../../../purchase-orders/infrastructure/persistence/relational/entities/purchase-order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrderItemEntity,
      PurchaseOrderEntity,
      productsEntity,
    ]),
  ],
  providers: [PurchaseOrderItemSeedService],
  exports: [PurchaseOrderItemSeedService],
})
export class PurchaseOrderItemSeedModule {}
