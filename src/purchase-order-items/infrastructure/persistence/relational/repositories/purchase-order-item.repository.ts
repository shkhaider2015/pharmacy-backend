import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PurchaseOrderItemEntity } from '../entities/purchase-order-item.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { PurchaseOrderItem } from '../../../../domain/purchase-order-item';
import { PurchaseOrderItemRepository } from '../../purchase-order-item.repository';
import { PurchaseOrderItemMapper } from '../mappers/purchase-order-item.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PurchaseOrderItemRelationalRepository
  implements PurchaseOrderItemRepository
{
  constructor(
    @InjectRepository(PurchaseOrderItemEntity)
    private readonly purchaseOrderItemRepository: Repository<PurchaseOrderItemEntity>,
  ) {}

  async create(data: PurchaseOrderItem): Promise<PurchaseOrderItem> {
    const persistenceModel = PurchaseOrderItemMapper.toPersistence(data);
    const newEntity = await this.purchaseOrderItemRepository.save(
      this.purchaseOrderItemRepository.create(persistenceModel),
    );
    return PurchaseOrderItemMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PurchaseOrderItem[]> {
    const entities = await this.purchaseOrderItemRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PurchaseOrderItemMapper.toDomain(entity));
  }

  async findById(
    id: PurchaseOrderItem['id'],
  ): Promise<NullableType<PurchaseOrderItem>> {
    const entity = await this.purchaseOrderItemRepository.findOne({
      where: { id },
    });

    return entity ? PurchaseOrderItemMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: PurchaseOrderItem['id'][],
  ): Promise<PurchaseOrderItem[]> {
    const entities = await this.purchaseOrderItemRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PurchaseOrderItemMapper.toDomain(entity));
  }

  async update(
    id: PurchaseOrderItem['id'],
    payload: Partial<PurchaseOrderItem>,
  ): Promise<PurchaseOrderItem> {
    const entity = await this.purchaseOrderItemRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.purchaseOrderItemRepository.save(
      this.purchaseOrderItemRepository.create(
        PurchaseOrderItemMapper.toPersistence({
          ...PurchaseOrderItemMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PurchaseOrderItemMapper.toDomain(updatedEntity);
  }

  async remove(id: PurchaseOrderItem['id']): Promise<void> {
    await this.purchaseOrderItemRepository.delete(id);
  }
}
