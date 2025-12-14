import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Generics } from '../../domain/generics';

export abstract class GenericsRepository {
  abstract create(
    data: Omit<Generics, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Generics>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Generics[]>;

  abstract findById(id: Generics['id']): Promise<NullableType<Generics>>;

  abstract findByIds(ids: Generics['id'][]): Promise<Generics[]>;

  abstract update(
    id: Generics['id'],
    payload: DeepPartial<Generics>,
  ): Promise<Generics | null>;

  abstract remove(id: Generics['id']): Promise<void>;
}
