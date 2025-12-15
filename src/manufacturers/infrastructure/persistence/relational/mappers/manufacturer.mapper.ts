import { Manufacturer } from '../../../../domain/manufacturer';

import { ManufacturerEntity } from '../entities/manufacturer.entity';

export class ManufacturerMapper {
  static toDomain(raw: ManufacturerEntity): Manufacturer {
    const domainEntity = new Manufacturer();
    domainEntity.short = raw.short;

    domainEntity.origin = raw.origin;

    domainEntity.address = raw.address;

    domainEntity.license = raw.license;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Manufacturer): ManufacturerEntity {
    const persistenceEntity = new ManufacturerEntity();
    persistenceEntity.short = domainEntity.short;

    persistenceEntity.origin = domainEntity.origin;

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.license = domainEntity.license;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
