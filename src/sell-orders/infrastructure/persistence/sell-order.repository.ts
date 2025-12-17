import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SellOrder } from '../../domain/sell-order';

export abstract class SellOrderRepository {
  abstract create(
    data: Omit<SellOrder, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SellOrder>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SellOrder[]>;

  abstract findById(id: SellOrder['id']): Promise<NullableType<SellOrder>>;

  abstract findByIds(ids: SellOrder['id'][]): Promise<SellOrder[]>;

  abstract update(
    id: SellOrder['id'],
    payload: DeepPartial<SellOrder>,
  ): Promise<SellOrder | null>;

  abstract remove(id: SellOrder['id']): Promise<void>;
}
