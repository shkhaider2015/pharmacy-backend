import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { RelationalCustomerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalCustomerPersistenceModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService, RelationalCustomerPersistenceModule],
})
export class CustomersModule {}
