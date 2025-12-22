import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchEntity } from '../../../../batches/infrastructure/persistence/relational/entities/batch.entity';
import { BatchSeedService } from './batch-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([BatchEntity])],
  providers: [BatchSeedService],
  exports: [BatchSeedService],
})
export class BatchSeedModule {}
