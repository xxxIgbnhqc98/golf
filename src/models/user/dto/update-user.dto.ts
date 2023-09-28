import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  thumbnail?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nickname?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone_number?: string
}
