import { Batch } from '../../../../domain/batch';

import { BatchEntity } from '../entities/batch.entity';

export class BatchMapper {
  static toDomain(raw: BatchEntity): Batch {
    const domainEntity = new Batch();
    domainEntity.currentQuantity = raw.currentQuantity;

    domainEntity.initialQuantity = raw.initialQuantity;

    domainEntity.expiryDate = raw.expiryDate;

    domainEntity.manufacturerDate = raw.manufacturerDate;

    domainEntity.batchNumber = raw.batchNumber;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Batch): BatchEntity {
    const persistenceEntity = new BatchEntity();
    persistenceEntity.currentQuantity = domainEntity.currentQuantity;

    persistenceEntity.initialQuantity = domainEntity.initialQuantity;

    persistenceEntity.expiryDate = domainEntity.expiryDate;

    persistenceEntity.manufacturerDate = domainEntity.manufacturerDate;

    persistenceEntity.batchNumber = domainEntity.batchNumber;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
