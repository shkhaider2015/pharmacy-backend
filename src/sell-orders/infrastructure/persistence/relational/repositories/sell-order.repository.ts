import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SellOrderEntity } from '../entities/sell-order.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SellOrder } from '../../../../domain/sell-order';
import { SellOrderRepository } from '../../sell-order.repository';
import { SellOrderMapper } from '../mappers/sell-order.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SellOrderRelationalRepository implements SellOrderRepository {
  constructor(
    @InjectRepository(SellOrderEntity)
    private readonly sellOrderRepository: Repository<SellOrderEntity>,
  ) {}

  async create(data: SellOrder): Promise<SellOrder> {
    const persistenceModel = SellOrderMapper.toPersistence(data);
    const newEntity = await this.sellOrderRepository.save(
      this.sellOrderRepository.create(persistenceModel),
    );
    return SellOrderMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SellOrder[]> {
    const entities = await this.sellOrderRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SellOrderMapper.toDomain(entity));
  }

  async findById(id: SellOrder['id']): Promise<NullableType<SellOrder>> {
    const entity = await this.sellOrderRepository.findOne({
      where: { id },
    });

    return entity ? SellOrderMapper.toDomain(entity) : null;
  }

  async findByIds(ids: SellOrder['id'][]): Promise<SellOrder[]> {
    const entities = await this.sellOrderRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SellOrderMapper.toDomain(entity));
  }

  async update(
    id: SellOrder['id'],
    payload: Partial<SellOrder>,
  ): Promise<SellOrder> {
    const entity = await this.sellOrderRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.sellOrderRepository.save(
      this.sellOrderRepository.create(
        SellOrderMapper.toPersistence({
          ...SellOrderMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SellOrderMapper.toDomain(updatedEntity);
  }

  async remove(id: SellOrder['id']): Promise<void> {
    await this.sellOrderRepository.delete(id);
  }
}
