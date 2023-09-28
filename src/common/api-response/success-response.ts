import { ApiProperty } from '@nestjs/swagger'

export class ApiSuccessResponse {
  @ApiProperty()
  readonly success: boolean = true
}
