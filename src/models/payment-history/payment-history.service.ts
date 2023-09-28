import { Injectable } from '@nestjs/common'
import { CreatePaymentHistoryDto } from './dto/create-payment-history.dto'
import { UpdatePaymentHistoryDto } from './dto/update-payment-history.dto'

@Injectable()
export class PaymentHistoryService {
  create(createPaymentHistoryDto: CreatePaymentHistoryDto) {
    return 'This action adds a new paymentHistory'
  }

  findAll() {
    return `This action returns all paymentHistory`
  }

  findOne(id: string) {
    return `This action returns a #${id} paymentHistory`
  }

  update(id: string, updatePaymentHistoryDto: UpdatePaymentHistoryDto) {
    return `This action updates a #${id} paymentHistory`
  }

  remove(id: string) {
    return `This action removes a #${id} paymentHistory`
  }
}
