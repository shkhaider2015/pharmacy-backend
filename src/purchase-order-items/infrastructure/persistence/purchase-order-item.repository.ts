import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PurchaseOrderItem } from '../../domain/purchase-order-item';

export abstract class PurchaseOrderItemRepository {
  abstract create(
    data: Omit<PurchaseOrderItem, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PurchaseOrderItem>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PurchaseOrderItem[]>;

  abstract findById(
    id: PurchaseOrderItem['id'],
  ): Promise<NullableType<PurchaseOrderItem>>;

  abstract findByIds(
    ids: PurchaseOrderItem['id'][],
  ): Promise<PurchaseOrderItem[]>;

  abstract update(
    id: PurchaseOrderItem['id'],
    payload: DeepPartial<PurchaseOrderItem>,
  ): Promise<PurchaseOrderItem | null>;

  abstract remove(id: PurchaseOrderItem['id']): Promise<void>;
}
