import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Request,
  UseGuards
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import { NotificationService } from './notification.service'
import {
  CreateNotificationGlobalDto,
  UpdateNotificationGlobalDto
} from '@models/notification'
import { AuthenticationGuard, Roles, RolesGuard } from '@models/auth'
import { UserRole } from '@constants'
import { PageOptionsDto } from '@common/pagination'
import { AuthRequest } from '@common/interface'

@ApiTags('notification')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({
    summary: 'Create Notification Global',
    description: 'Admin Only'
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createNotificationDto: CreateNotificationGlobalDto) {
    return this.notificationService.createGlobal(createNotificationDto)
  }

  @ApiOperation({
    summary: 'Get List Notification Global',
    description: 'Admin Only'
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.notificationService.findAllGlobal(pageOptionsDto)
  }

  @ApiOperation({
    summary: 'Get List Notification By User'
  })
  @Get('me')
  findAllByUser(
    @Query() pageOptionsDto: PageOptionsDto,
    @Request() req: AuthRequest
  ) {
    return this.notificationService.findAllByUser(pageOptionsDto, req.user.id)
  }

  @ApiOperation({
    summary: 'Get Notification By User'
  })
  @Get('me/:id')
  findOneByUser() {}

  @ApiOperation({
    summary: 'Get Notification Global',
    description: 'Admin Only'
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id)
  }

  @ApiOperation({
    summary: 'Update Notification Global',
    description: 'Admin Only'
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationGlobalDto: UpdateNotificationGlobalDto
  ) {
    return this.notificationService.update(id, updateNotificationGlobalDto)
  }

  @ApiOperation({
    summary: 'Delete Notification Global',
    description: 'Admin Only'
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(id)
  }
}
