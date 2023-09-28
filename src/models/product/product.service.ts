import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateProductDto, Product, UpdateProductDto } from '@models/product'
import { ApiSuccessResponse } from '@common/api-response'
import { PageOptionsDto, PageMetaDto, PageDto } from '@common/pagination'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto)
    await this.productRepository.save(product)
    return product
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const query = this.productRepository
      .createQueryBuilder('group')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('group.created_at', pageOptionsDto.order)

    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: pageOptionsDto,
      itemCount: count
    })

    return new PageDto(list, pageMetaDto)
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) throw new NotFoundException('Product Not Found')
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id)
    const updateProduct = await this.productRepository.update(
      id,
      updateProductDto
    )
    return updateProduct
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
    return new ApiSuccessResponse()
  }
}
