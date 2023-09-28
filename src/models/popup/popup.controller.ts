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
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'

import { AuthenticationGuard, RolesGuard, Roles } from '@models/auth'
import { PopupService } from './popup.service'
import { CreatePopupDto } from '@models/popup'
import { UserRole } from '@constants'
import { PageOptionsDto } from '@common/pagination'

@ApiTags('popup')
@Controller('popup')
export class PopupController {
  constructor(private readonly popupService: PopupService) {}

  @ApiOperation({
    summary: 'Create Popup',
    description: 'Admin Only'
  })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Post()
  create(@Body() createPopupDto: CreatePopupDto) {
    return this.popupService.create(createPopupDto)
  }

  @ApiOperation({
    summary: 'Get List Popup'
  })
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.popupService.findAll(pageOptionsDto)
  }

  @ApiOperation({
    summary: 'Get Popup'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.popupService.findOne(id)
  }

  @ApiOperation({
    summary: 'Update Popup',
    description: 'Admin Only'
  })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePopupDto: CreatePopupDto) {
    return this.popupService.update(id, updatePopupDto)
  }

  @ApiOperation({
    summary: 'Delete Popup',
    description: 'Admin Only'
  })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.popupService.remove(id)
  }
}
