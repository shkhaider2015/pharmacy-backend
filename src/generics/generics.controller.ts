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
import { GenericsService } from './generics.service';
import { CreateGenericsDto } from './dto/create-generics.dto';
import { UpdateGenericsDto } from './dto/update-generics.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Generics } from './domain/generics';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllGenericsDto } from './dto/find-all-generics.dto';

@ApiTags('Generics')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'generics',
  version: '1',
})
export class GenericsController {
  constructor(private readonly genericsService: GenericsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Generics,
  })
  create(@Body() createGenericsDto: CreateGenericsDto) {
    return this.genericsService.create(createGenericsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Generics),
  })
  async findAll(
    @Query() query: FindAllGenericsDto,
  ): Promise<InfinityPaginationResponseDto<Generics>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.genericsService.findAllWithPagination({
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
    type: Generics,
  })
  findById(@Param('id') id: string) {
    return this.genericsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Generics,
  })
  update(
    @Param('id') id: string,
    @Body() updateGenericsDto: UpdateGenericsDto,
  ) {
    return this.genericsService.update(id, updateGenericsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.genericsService.remove(id);
  }
}
