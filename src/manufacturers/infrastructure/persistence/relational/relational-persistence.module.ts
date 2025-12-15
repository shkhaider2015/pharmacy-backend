import { Module } from '@nestjs/common';
import { ManufacturerRepository } from '../manufacturer.repository';
import { ManufacturerRelationalRepository } from './repositories/manufacturer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerEntity } from './entities/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity])],
  providers: [
    {
      provide: ManufacturerRepository,
      useClass: ManufacturerRelationalRepository,
    },
  ],
  exports: [ManufacturerRepository],
})
export class RelationalManufacturerPersistenceModule {}
