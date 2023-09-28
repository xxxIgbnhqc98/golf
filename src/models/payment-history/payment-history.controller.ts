import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import { PaymentHistoryService } from './payment-history.service'
import {
  CreatePaymentHistoryDto,
  UpdatePaymentHistoryDto
} from '@models/payment-history'
import { AuthenticationGuard, Roles, RolesGuard } from '@models/auth'

@ApiTags('payment-history')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('payment-history')
export class PaymentHistoryController {
  constructor(private readonly paymentHistoryService: PaymentHistoryService) {}

  @Post()
  create(@Body() createPaymentHistoryDto: CreatePaymentHistoryDto) {
    return this.paymentHistoryService.create(createPaymentHistoryDto)
  }

  @Get()
  findAll() {
    return this.paymentHistoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentHistoryService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentHistoryDto: UpdatePaymentHistoryDto
  ) {
    return this.paymentHistoryService.update(id, updatePaymentHistoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentHistoryService.remove(id)
  }
}
