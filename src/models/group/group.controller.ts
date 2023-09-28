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

import { AuthenticationGuard, Roles, RolesGuard } from '@models/auth'
import { PageOptionsDto } from '@common/pagination'
import { UserRole } from '@constants'
import { GroupService } from './group.service'
import { AddUserDto, CreateGroupDto, UpdateGroupDto } from '@models/group'

@ApiTags('group')
@ApiBearerAuth()
@Roles(UserRole.Admin)
@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: 'Create Group', description: 'Admin Only' })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto)
  }

  @ApiOperation({ summary: 'Get List Group', description: 'Admin Only' })
  @Get()
  findAll(@Param() pageOptionsDto: PageOptionsDto) {
    return this.groupService.findAll(pageOptionsDto)
  }

  @ApiOperation({ summary: 'Get Group', description: 'Admin Only' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id)
  }

  @ApiOperation({ summary: 'Update Group', description: 'Admin Only' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto)
  }

  @ApiOperation({
    summary: 'Remove User From Group',
    description: 'Admin Only'
  })
  @Delete('user')
  removeUser(@Body() removeUserDto: AddUserDto) {
    return this.groupService.removeUser(removeUserDto)
  }

  @ApiOperation({
    summary: 'Delete Group',
    description: 'Admin Only'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id)
  }

  @ApiOperation({
    summary: 'Add User To Group',
    description: 'Admin Only'
  })
  @Post('user')
  addUser(@Body() addUserDto: AddUserDto) {
    return this.groupService.addUser(addUserDto)
  }
}
