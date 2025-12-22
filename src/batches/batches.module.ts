import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { BatchesService } from './batches.service';
import { BatchesController } from './batches.controller';
import { RelationalBatchPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalBatchPersistenceModule,
  ],
  controllers: [BatchesController],
  providers: [BatchesService],
  exports: [BatchesService, RelationalBatchPersistenceModule],
})
export class BatchesModule {}
