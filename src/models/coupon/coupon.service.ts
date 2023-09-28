import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ApiSuccessResponse } from '@common/api-response'
import { CreateCouponDto, Coupon, UpdateCouponDto } from '@models/coupon'
import { PageOptionsDto, PageMetaDto, PageDto } from '@common/pagination'

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private couponRepository: Repository<Coupon>
  ) {}
  async create(createCouponDto: CreateCouponDto) {
    const coupon = this.couponRepository.create(createCouponDto)
    await this.couponRepository.save(createCouponDto)
    return coupon
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const query = this.couponRepository
      .createQueryBuilder('coupon')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .orderBy('coupon.created_at', pageOptionsDto.order)

    const [list, count] = await query.getManyAndCount()
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: pageOptionsDto,
      itemCount: count
    })

    return new PageDto(list, pageMetaDto)
  }

  async findOne(id: string) {
    const coupon = await this.couponRepository.findOneBy({ id })
    if (!coupon) throw new NotFoundException('Coupon Not Found')
    return coupon
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    await this.findOne(id)
    const updateCoupon = await this.couponRepository.update(id, updateCouponDto)
    return updateCoupon
  }

  async remove(id: string) {
    const coupon = await this.findOne(id)
    await this.couponRepository.remove(coupon)
    return new ApiSuccessResponse()
  }
}
