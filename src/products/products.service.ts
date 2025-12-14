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
    private readonly genericsService: GenericsService,
    private readonly categoriesService: CategoriesService,
    private readonly productsRepository: productsRepository,
  ) {}

  async create(createproductsDto: CreateproductsDto): Promise<products> {
    const { categories: categoryIds, ...rest } = createproductsDto;
    const categories = await this.validateCategories(categoryIds);

    const product = new products();
    Object.assign(product, rest);
    product.categories = categories;

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
    const { categories: categoryIds, generics: genericIds, ...rest } = updateproductsDto;
    
    const product = new products();
    Object.assign(product, rest);
    if (categoryIds) {
      const categories = categoryIds && (await this.validateCategories(categoryIds));
      product.categories = categories;
    }
    if(genericIds){
      const generics = genericIds && (await this.validateGenerics(genericIds));
      product.generics = generics;
    }

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
