import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerEntity } from '../../../../manufacturers/infrastructure/persistence/relational/entities/manufacturer.entity';
import { ManufacturerSeedService } from './manufacturer-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity])],
  providers: [ManufacturerSeedService],
  exports: [ManufacturerSeedService],
})
export class ManufacturerSeedModule {}
