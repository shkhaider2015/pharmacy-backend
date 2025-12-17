import { PurchaseOrderItemsModule } from '../purchase-order-items/purchase-order-items.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { RelationalPurchaseOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => PurchaseOrderItemsModule),

    SuppliersModule,

    // do not remove this comment
    RelationalPurchaseOrderPersistenceModule,
  ],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
  exports: [PurchaseOrdersService, RelationalPurchaseOrderPersistenceModule],
})
export class PurchaseOrdersModule {}
