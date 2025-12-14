import { Category } from '../../../../domain/categories';
import { CategoriesEntity } from '../entities/categories.entity';

export class CategoryMapper {
  static toDomain(raw: CategoriesEntity): Category {
    const domainEntity = new Category();
    domainEntity.code = raw.code;
    domainEntity.name = raw.name;
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: Category): CategoriesEntity {
    const persistenceEntity = new CategoriesEntity();
    persistenceEntity.code = domainEntity.code;
    persistenceEntity.name = domainEntity.name;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    return persistenceEntity;
  }
}
