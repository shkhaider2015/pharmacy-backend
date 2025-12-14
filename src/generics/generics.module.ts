import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { GenericsService } from './generics.service';
import { GenericsController } from './generics.controller';
import { RelationalGenericsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalGenericsPersistenceModule,
  ],
  controllers: [GenericsController],
  providers: [GenericsService],
  exports: [GenericsService, RelationalGenericsPersistenceModule],
})
export class GenericsModule {}
