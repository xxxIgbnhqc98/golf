import { PageOptionsDto } from '@common/pagination'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class GroupUserDto extends PageOptionsDto {
  @ApiPropertyOptional()
  readonly group_id?: string

  @ApiPropertyOptional()
  readonly keyword?: string
}
