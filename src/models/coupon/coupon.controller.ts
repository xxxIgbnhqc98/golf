import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import { CouponService } from './coupon.service'
import { CreateCouponDto, UpdateCouponDto } from '@models/coupon'
import { AuthenticationGuard, Roles, RolesGuard } from '@models/auth'
import { UserRole } from '@constants'
import { PageOptionsDto } from '@common/pagination'

@ApiTags('coupon')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @ApiOperation({ summary: 'Create Coupon', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto)
  }

  @ApiOperation({ summary: 'Get List Coupon', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.couponService.findAll(pageOptionsDto)
  }

  @ApiOperation({ summary: 'Get Coupon' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(id)
  }

  @ApiOperation({ summary: 'Update Coupon', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto)
  }

  @ApiOperation({ summary: 'Delete Coupon', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(id)
  }
}
