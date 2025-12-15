import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { ManufacturersController } from './manufacturers.controller';
import { RelationalManufacturerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalManufacturerPersistenceModule,
  ],
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
  exports: [ManufacturersService, RelationalManufacturerPersistenceModule],
})
export class ManufacturersModule {}
