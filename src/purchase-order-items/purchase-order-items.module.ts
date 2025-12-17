import { PurchaseOrdersModule } from '../purchase-orders/purchase-orders.module';
import { productsModule } from '../products/products.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { PurchaseOrderItemsService } from './purchase-order-items.service';
import { PurchaseOrderItemsController } from './purchase-order-items.controller';
import { RelationalPurchaseOrderItemPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => PurchaseOrdersModule),

    productsModule,

    // do not remove this comment
    RelationalPurchaseOrderItemPersistenceModule,
  ],
  controllers: [PurchaseOrderItemsController],
  providers: [PurchaseOrderItemsService],
  exports: [
    PurchaseOrderItemsService,
    RelationalPurchaseOrderItemPersistenceModule,
  ],
})
export class PurchaseOrderItemsModule {}
