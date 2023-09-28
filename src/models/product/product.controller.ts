import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { UseGuards } from '@nestjs/common'

import { AuthenticationGuard, RolesGuard, Roles } from '@models/auth'
import { ProductService } from './product.service'
import { CreateProductDto, UpdateProductDto } from '@models/product'
import { UserRole } from '@constants'
import { PageOptionsDto } from '@common/pagination'

@ApiTags('product')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create Production', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @ApiOperation({ summary: 'Get List Product' })
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.productService.findAll(pageOptionsDto)
  }

  @ApiOperation({ summary: 'Get Product' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id)
  }

  @ApiOperation({ summary: 'Update Production', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto)
  }

  @ApiOperation({ summary: 'Delete Production', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id)
  }
}
