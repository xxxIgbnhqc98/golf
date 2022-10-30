import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import {
  LoginDto,
  ChangePasswordDto,
  ForgetPasswordDto,
  RefreshTokenDto
} from '@auth'
import { AuthService } from './auth.service'
import { CreateUserDto } from '@models/user'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto)
  }

  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body)
  }

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDto) {}

  @Post('forget-password')
  forgetPassword(@Body() body: ForgetPasswordDto) {}

  @Put('change-password')
  changePassword(@Body() body: ChangePasswordDto, @Param('id') id: string) {}
}
