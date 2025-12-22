import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PaymentStatus } from '../../domain/payment-status';

export abstract class PaymentStatusRepository {
  abstract create(
    data: Omit<PaymentStatus, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PaymentStatus>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PaymentStatus[]>;

  abstract findById(
    id: PaymentStatus['id'],
  ): Promise<NullableType<PaymentStatus>>;

  abstract findByIds(ids: PaymentStatus['id'][]): Promise<PaymentStatus[]>;

  abstract update(
    id: PaymentStatus['id'],
    payload: DeepPartial<PaymentStatus>,
  ): Promise<PaymentStatus | null>;

  abstract remove(id: PaymentStatus['id']): Promise<void>;
}
