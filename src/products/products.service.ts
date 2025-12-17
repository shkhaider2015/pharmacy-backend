import { ManufacturersService } from '../manufacturers/manufacturers.service';
import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateproductsDto } from './dto/create-products.dto';
import { UpdateproductsDto } from './dto/update-products.dto';
import { productsRepository } from './infrastructure/persistence/products.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { products } from './domain/products';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/domain/categories';
import { GenericsService } from '../generics/generics.service';
import { Generics } from '../generics/domain/generics';

@Injectable()
export class productsService {
  constructor(
    private readonly manufacturerService: ManufacturersService,

    private readonly genericsService: GenericsService,
    private readonly categoriesService: CategoriesService,
    private readonly productsRepository: productsRepository,
  ) {}

  async create(createproductsDto: CreateproductsDto): Promise<products> {
    const {
      categories: categoryIds,
      generics: genericIds,
      manufacturer,
      ...rest
    } = createproductsDto;

    const product = new products();

    if (manufacturer) {
      const manufacturerObject = await this.manufacturerService.findById(
        manufacturer.id,
      );
      if (!manufacturerObject) {
        product.manufacturer = null;
      } else {
        product.manufacturer = manufacturerObject;
      }
    } else if (manufacturer === null) {
      product.manufacturer = null;
    }

    if (categoryIds) {
      const categories =
        categoryIds && (await this.validateCategories(categoryIds));
      product.categories = categories;
    }
    if (genericIds) {
      const generics = genericIds && (await this.validateGenerics(genericIds));
      product.generics = generics;
    }

    Object.assign(product, rest);

    return this.productsRepository.create(product);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<products[]> {
    return this.productsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findAllWithRelations({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<products[]> {
    return this.productsRepository.findAllWithRelations({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: products['id']): Promise<products | null> {
    return this.productsRepository.findById(id);
  }

  findByIds(ids: products['id'][]): Promise<products[]> {
    return this.productsRepository.findByIds(ids);
  }

  async update(
    id: products['id'],
    updateproductsDto: UpdateproductsDto,
  ): Promise<products | null> {
    const {
      categories: categoryIds,
      generics: genericIds,
      manufacturer,
      ...rest
    } = updateproductsDto;

    const product = new products();
    if (categoryIds) {
      const categories =
        categoryIds && (await this.validateCategories(categoryIds));
      product.categories = categories;
    }
    if (genericIds) {
      const generics = genericIds && (await this.validateGenerics(genericIds));
      product.generics = generics;
    }

    if (manufacturer) {
      const manufacturerObject = await this.manufacturerService.findById(
        manufacturer.id,
      );
      if (!manufacturerObject) {
        product.manufacturer = null;
      } else {
        product.manufacturer = manufacturerObject;
      }
    } else if (manufacturer === null) {
      product.manufacturer = null;
    }

    Object.assign(product, rest);

    return this.productsRepository.update(id, product);
  }

  remove(id: products['id']): Promise<void> {
    return this.productsRepository.remove(id);
  }

  private async validateCategories(categoryIds: string[]): Promise<Category[]> {
    const categories = await this.categoriesService.findByIds(categoryIds);
    if (categories.length !== categoryIds.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          categories: 'notExists',
        },
      });
    }
    return categories;
  }

  private async validateGenerics(genericIds: string[]): Promise<Generics[]> {
    const generics = await this.genericsService.findByIds(genericIds);
    if (generics.length !== genericIds.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          generics: 'notExists',
        },
      });
    }
    return generics;
  }
}
