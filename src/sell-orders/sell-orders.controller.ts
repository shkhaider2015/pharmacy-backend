import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SellOrdersService } from './sell-orders.service';
import { CreateSellOrderDto } from './dto/create-sell-order.dto';
import { UpdateSellOrderDto } from './dto/update-sell-order.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SellOrder } from './domain/sell-order';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSellOrdersDto } from './dto/find-all-sell-orders.dto';

@ApiTags('Sellorders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'sell-orders',
  version: '1',
})
export class SellOrdersController {
  constructor(private readonly sellOrdersService: SellOrdersService) {}

  @Post()
  @ApiCreatedResponse({
    type: SellOrder,
  })
  create(@Body() createSellOrderDto: CreateSellOrderDto) {
    return this.sellOrdersService.create(createSellOrderDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SellOrder),
  })
  async findAll(
    @Query() query: FindAllSellOrdersDto,
  ): Promise<InfinityPaginationResponseDto<SellOrder>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.sellOrdersService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SellOrder,
  })
  findById(@Param('id') id: string) {
    return this.sellOrdersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SellOrder,
  })
  update(
    @Param('id') id: string,
    @Body() updateSellOrderDto: UpdateSellOrderDto,
  ) {
    return this.sellOrdersService.update(id, updateSellOrderDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.sellOrdersService.remove(id);
  }
}
