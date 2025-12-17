import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellOrderEntity } from '../../../../sell-orders/infrastructure/persistence/relational/entities/sell-order.entity';
import { Repository } from 'typeorm';
import { productsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { CustomerEntity } from '../../../../customers/infrastructure/persistence/relational/entities/customer.entity';

@Injectable()
export class SellOrderSeedService {
  constructor(
    @InjectRepository(SellOrderEntity)
    private repository: Repository<SellOrderEntity>,

    @InjectRepository(productsEntity)
    private productsRepository: Repository<productsEntity>,

    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const products = await this.productsRepository.find();
      const customers = await this.customerRepository.find();

      if (products.length === 0 || customers.length === 0) {
        throw new Error(
          'Products or Customers not found. Please seed them before seeding Sell Orders.',
        );
      }

      await this.repository.save(
        this.repository.create({
          products: [products[0], products[1]],
          customer: customers[0],
          paymentMethod: 'Credit Card',
          paymentStatus: 'Paid',
          netPrice: 1000,
          discountPrice: 100,
          totalPrice: 900,
        }),
      );
      await this.repository.save(
        this.repository.create({
          products: [products[2]],
          customer: customers[1],
          paymentMethod: 'Cash',
          paymentStatus: 'Pending',
          netPrice: 500,
          discountPrice: 50,
          totalPrice: 450,
        }),
      );
    }
  }
}
