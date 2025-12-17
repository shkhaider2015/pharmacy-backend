import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellOrderEntity } from '../../../../sell-orders/infrastructure/persistence/relational/entities/sell-order.entity';
import { SellOrderSeedService } from './sell-order-seed.service';
import { productsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { CustomerEntity } from '../../../../customers/infrastructure/persistence/relational/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellOrderEntity, productsEntity, CustomerEntity]),
  ],
  providers: [SellOrderSeedService],
  exports: [SellOrderSeedService],
})
export class SellOrderSeedModule {}
