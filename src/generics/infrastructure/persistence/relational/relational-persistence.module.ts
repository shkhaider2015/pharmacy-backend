import { Module } from '@nestjs/common';
import { GenericsRepository } from '../generics.repository';
import { GenericsRelationalRepository } from './repositories/generics.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericsEntity } from './entities/generics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenericsEntity])],
  providers: [
    {
      provide: GenericsRepository,
      useClass: GenericsRelationalRepository,
    },
  ],
  exports: [GenericsRepository],
})
export class RelationalGenericsPersistenceModule {}
