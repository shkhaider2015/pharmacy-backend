import { productsModule } from '../products/products.module';
import { CustomersModule } from '../customers/customers.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SellOrdersService } from './sell-orders.service';
import { SellOrdersController } from './sell-orders.controller';
import { RelationalSellOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    productsModule,

    CustomersModule,

    // do not remove this comment
    RelationalSellOrderPersistenceModule,
  ],
  controllers: [SellOrdersController],
  providers: [SellOrdersService],
  exports: [SellOrdersService, RelationalSellOrderPersistenceModule],
})
export class SellOrdersModule {}
