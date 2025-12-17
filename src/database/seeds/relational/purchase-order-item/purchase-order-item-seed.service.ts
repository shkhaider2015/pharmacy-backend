import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrderItemEntity } from '../../../../purchase-order-items/infrastructure/persistence/relational/entities/purchase-order-item.entity';
import { Repository } from 'typeorm';
import { productsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { PurchaseOrderEntity } from '../../../../purchase-orders/infrastructure/persistence/relational/entities/purchase-order.entity';

@Injectable()
export class PurchaseOrderItemSeedService {
  constructor(
    @InjectRepository(PurchaseOrderItemEntity)
    private repository: Repository<PurchaseOrderItemEntity>,
    @InjectRepository(productsEntity)
    private productsRepository: Repository<productsEntity>,
    @InjectRepository(PurchaseOrderEntity)
    private purchaseOrderRepository: Repository<PurchaseOrderEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const product1 = await this.productsRepository.findOne({
        where: { id: '4f6c7b9a-1e0d-4c3f-9876-2a1b0c9d8e7f' },
      });
      const product2 = await this.productsRepository.findOne({
        where: { id: 'b8e5a7d3-f0c9-4b1a-8e7d-6c5b4a3f2e1d' },
      });

      if (!product1 || !product2) {
        throw new Error('Products for seeding PurchaseOrderItems not found');
      }

      const purchaseOrders = await this.purchaseOrderRepository.find();

      if (purchaseOrders.length < 2) {
        throw new Error(
          'At least two PurchaseOrders must be seeded before seeding PurchaseOrderItems.',
        );
      }

      await this.repository.save(
        this.repository.create({
          orderQuantity: 10,
          RecievedQuantity: 0,
          unitCost: 100,
          total: 1000,
          product: product1,
          purchaseOrder: purchaseOrders[0],
        }),
      );
      await this.repository.save(
        this.repository.create({
          orderQuantity: 5,
          RecievedQuantity: 5,
          unitCost: 200,
          total: 1000,
          product: product2,
          purchaseOrder: purchaseOrders[1],
        }),
      );
    }
  }
}
