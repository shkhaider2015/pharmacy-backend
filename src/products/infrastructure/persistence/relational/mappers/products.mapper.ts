import { products } from '../../../../domain/products';
import { ManufacturerMapper } from '../../../../../manufacturers/infrastructure/persistence/relational/mappers/manufacturer.mapper';

import { GenericsMapper } from '../../../../../generics/infrastructure/persistence/relational/mappers/generics.mapper';

import { CategoryMapper } from 'src/categories/infrastructure/persistence/relational/mappers/categories.mapper';
import { productsEntity } from '../entities/products.entity';

export class productsMapper {
  static toDomain(raw: productsEntity): products {
    const domainEntity = new products();
    if (raw.manufacturer) {
      domainEntity.manufacturer = ManufacturerMapper.toDomain(raw.manufacturer);
    } else if (raw.manufacturer === null) {
      domainEntity.manufacturer = null;
    }

    domainEntity.expiryDate = raw.expiryDate;

    domainEntity.manufactureDate = raw.manufactureDate;

    if (raw.generics) {
      domainEntity.generics = raw.generics.map((item) =>
        GenericsMapper.toDomain(item),
      );
    } else if (raw.generics === null) {
      domainEntity.generics = null;
    }

    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.isPrescriptionRequired = raw.isPrescriptionRequired;
    domainEntity.stock = raw.stock;
    if (raw.categories) {
      domainEntity.categories = raw.categories.map((category) =>
        CategoryMapper.toDomain(category),
      );
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: products): productsEntity {
    const persistenceEntity = new productsEntity();
    if (domainEntity.manufacturer) {
      persistenceEntity.manufacturer = ManufacturerMapper.toPersistence(
        domainEntity.manufacturer,
      );
    } else if (domainEntity.manufacturer === null) {
      persistenceEntity.manufacturer = null;
    }

    persistenceEntity.expiryDate = domainEntity.expiryDate;

    persistenceEntity.manufactureDate = domainEntity.manufactureDate;

    if (domainEntity.generics) {
      persistenceEntity.generics = domainEntity.generics.map((item) =>
        GenericsMapper.toPersistence(item),
      );
    } else if (domainEntity.generics === null) {
      persistenceEntity.generics = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.isPrescriptionRequired =
      domainEntity.isPrescriptionRequired;
    persistenceEntity.stock = domainEntity.stock;
    if (domainEntity.categories) {
      persistenceEntity.categories = domainEntity.categories.map((category) =>
        CategoryMapper.toPersistence(category),
      );
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
