import { PageOptionsDto } from '@common/pagination'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'

import { Gender } from '@constants'

export class CoachUserDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: Gender })
  @IsEnum(Gender)
  @IsOptional()
  readonly gender?: Gender

  @ApiPropertyOptional()
  readonly technique?: string

  @ApiPropertyOptional()
  readonly keyword?: string
}
