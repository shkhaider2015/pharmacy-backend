import { Generics } from '../../../../domain/generics';

import { GenericsEntity } from '../entities/generics.entity';

export class GenericsMapper {
  static toDomain(raw: GenericsEntity): Generics {
    const domainEntity = new Generics();
    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.strength = raw.strength;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Generics): GenericsEntity {
    const persistenceEntity = new GenericsEntity();
    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.strength = domainEntity.strength;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
