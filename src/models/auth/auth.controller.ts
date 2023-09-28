import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Request,
  UseGuards,
  ForbiddenException
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

import {
  LoginDto,
  ChangePasswordDto,
  ForgetPasswordDto,
  RefreshTokenDto,
  LoginSocialDto
} from '@src/models/auth'
import { AuthService } from './auth.service'
import { CreateUserDto } from '@models/user'
import {
  RefreshAuthenticationGuard,
  AuthenticationGuard
} from '@src/models/auth'
import { UserRole } from '@constants'
import { AuthRequest } from '@common/interface'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto)
  }

  @ApiOperation({ summary: 'Login With Apple' })
  @Post('login/apple')
  loginWithApple(@Body() loginSocialDto: LoginSocialDto) {
    return this.authService.loginWithApple(loginSocialDto)
  }

  @ApiOperation({ summary: 'Login With Naver' })
  @Post('login/naver')
  loginWithNaver(@Body() loginSocialDto: LoginSocialDto) {
    return this.authService.loginWithNaver(loginSocialDto)
  }

  @ApiOperation({ summary: 'Login With Kakao' })
  @Post('login/kakao')
  loginWithKakao(@Body() loginSocialDto: LoginSocialDto) {
    return this.authService.loginWithKakao(loginSocialDto)
  }

  @ApiOperation({ summary: 'Register' })
  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body)
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @ApiBearerAuth()
  @UseGuards(RefreshAuthenticationGuard)
  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenDto, @Request() req: AuthRequest) {
    const { user } = req
    const { refresh_token } = body
    return this.authService.refreshToken(refresh_token, user)
  }

  @ApiOperation({ summary: 'Forget Password' })
  @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPasswordByPhoneNumber(forgetPasswordDto)
  }

  @ApiOperation({ summary: 'Change Password' })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Put('change-password/:id')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Param('id') id: string,
    @Request() req: AuthRequest
  ) {
    const { user } = req
    if (user.role !== UserRole.Admin) {
      if (user.id !== id) throw new ForbiddenException('Access Denied')
    }
    return this.authService.changePassword(id, changePasswordDto)
  }
}
