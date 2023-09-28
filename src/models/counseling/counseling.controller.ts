import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { CounselingService } from './counseling.service'
import { CreateCounselingDto } from '@models/counseling'
import { PageOptionsDto } from '@common/pagination'
import { AuthenticationGuard, Roles, RolesGuard } from '@models/auth'
import { UserRole } from '@constants'

@ApiTags('counseling')
@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {}

  @ApiOperation({ summary: 'Create Counseling' })
  @Post()
  create(@Body() createCounselingDto: CreateCounselingDto) {
    return this.counselingService.create(createCounselingDto)
  }

  @ApiOperation({ summary: 'Get List Counseling', description: 'Admin Only' })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.counselingService.findAll(pageOptionsDto)
  }

  @ApiOperation({ summary: 'Get Counseling', description: 'Admin Only' })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.counselingService.findOne(id)
  }

  @ApiOperation({ summary: 'Delete Counseling', description: 'Admin Only' })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.counselingService.remove(id)
  }
}
