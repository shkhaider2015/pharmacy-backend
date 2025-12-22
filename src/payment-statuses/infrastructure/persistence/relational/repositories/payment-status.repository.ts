import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PaymentStatusEntity } from '../entities/payment-status.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { PaymentStatus } from '../../../../domain/payment-status';
import { PaymentStatusRepository } from '../../payment-status.repository';
import { PaymentStatusMapper } from '../mappers/payment-status.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PaymentStatusRelationalRepository
  implements PaymentStatusRepository
{
  constructor(
    @InjectRepository(PaymentStatusEntity)
    private readonly paymentStatusRepository: Repository<PaymentStatusEntity>,
  ) {}

  async create(data: PaymentStatus): Promise<PaymentStatus> {
    const persistenceModel = PaymentStatusMapper.toPersistence(data);
    const newEntity = await this.paymentStatusRepository.save(
      this.paymentStatusRepository.create(persistenceModel),
    );
    return PaymentStatusMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PaymentStatus[]> {
    const entities = await this.paymentStatusRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PaymentStatusMapper.toDomain(entity));
  }

  async findById(
    id: PaymentStatus['id'],
  ): Promise<NullableType<PaymentStatus>> {
    const entity = await this.paymentStatusRepository.findOne({
      where: { id },
    });

    return entity ? PaymentStatusMapper.toDomain(entity) : null;
  }

  async findByIds(ids: PaymentStatus['id'][]): Promise<PaymentStatus[]> {
    const entities = await this.paymentStatusRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PaymentStatusMapper.toDomain(entity));
  }

  async update(
    id: PaymentStatus['id'],
    payload: Partial<PaymentStatus>,
  ): Promise<PaymentStatus> {
    const entity = await this.paymentStatusRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.paymentStatusRepository.save(
      this.paymentStatusRepository.create(
        PaymentStatusMapper.toPersistence({
          ...PaymentStatusMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PaymentStatusMapper.toDomain(updatedEntity);
  }

  async remove(id: PaymentStatus['id']): Promise<void> {
    await this.paymentStatusRepository.delete(id);
  }
}
