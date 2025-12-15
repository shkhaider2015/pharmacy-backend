import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Manufacturer } from '../../domain/manufacturer';

export abstract class ManufacturerRepository {
  abstract create(
    data: Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Manufacturer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Manufacturer[]>;

  abstract findById(
    id: Manufacturer['id'],
  ): Promise<NullableType<Manufacturer>>;

  abstract findByIds(ids: Manufacturer['id'][]): Promise<Manufacturer[]>;

  abstract update(
    id: Manufacturer['id'],
    payload: DeepPartial<Manufacturer>,
  ): Promise<Manufacturer | null>;

  abstract remove(id: Manufacturer['id']): Promise<void>;
}
