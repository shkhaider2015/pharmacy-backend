import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderEntity } from '../../../../purchase-orders/infrastructure/persistence/relational/entities/purchase-order.entity';
import { Repository } from 'typeorm';
import { SupplierEntity } from '../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

@Injectable()
export class PurchaseOrderSeedService {
  constructor(
    @InjectRepository(PurchaseOrderEntity)
    private repository: Repository<PurchaseOrderEntity>,

    @InjectRepository(SupplierEntity)
    private supplierRepository: Repository<SupplierEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const supplier = await this.supplierRepository.findOne({
        where: { email: 'some@email.com' },
      });
      const supplier2 = await this.supplierRepository.findOne({
        where: { email: 'some2@email.com' },
      });

      if (!supplier || !supplier2) {
        throw new Error('Suppliers for seeding PurchaseOrders not found');
      }

      await this.repository.save(
        this.repository.create({
          orderDate: new Date('2024-03-10'),
          expectedDeliveryDate: new Date('2024-03-20'),
          actualDeliveryDate: null,
          status: 'Pending',
          totalAmount: 1500,
          supplierId: supplier,
          purchaseOrderItems: [],
        }),
      );
      await this.repository.save(
        this.repository.create({
          orderDate: new Date('2024-04-05'),
          expectedDeliveryDate: new Date('2024-04-15'),
          actualDeliveryDate: new Date('2024-04-14'),
          status: 'Delivered',
          totalAmount: 2500,
          supplierId: supplier2,
          purchaseOrderItems: [],
        }),
      );
    }
  }
}
