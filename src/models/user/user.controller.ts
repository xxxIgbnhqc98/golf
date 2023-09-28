import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  ForbiddenException
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import {
  CreateUserDto,
  UpdateProfileDto,
  GroupUserDto,
  CreateCoachDto,
  CoachUserDto
} from '@models/user'
import { UserService } from './user.service'
import { AuthenticationGuard, Roles, RolesGuard } from '@models/auth'
import { UserRole } from '@constants'
import { AuthRequest } from '@common/interface'

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: 'Create Coach', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Post('coach')
  createCoach(@Body() createCoachDto: CreateCoachDto) {
    return this.userService.create(createCoachDto)
  }

  @ApiOperation({ summary: 'Get List User', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Get()
  findAllByGroup(@Query() pageOptionsDto: GroupUserDto) {
    return this.userService.findAllUser(pageOptionsDto)
  }

  @ApiOperation({ summary: 'Get List Coach', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Get('coach')
  findAllCoach(@Query() pageOptionsDto: CoachUserDto) {
    return this.userService.findAllCoach(pageOptionsDto)
  }

  @ApiOperation({ summary: 'Get User' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @ApiOperation({ summary: 'Update Profile' })
  @Put()
  update(@Body() updateUserDto: UpdateProfileDto, @Request() req: AuthRequest) {
    const { id } = req.user
    return this.userService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: 'Delete User', description: 'Admin Only' })
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
