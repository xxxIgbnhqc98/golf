import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import axios from 'axios'
import appleSignin from 'apple-signin-auth'
import * as moment from 'moment'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '@models/user'
import { UserService } from '@models/user/user.service'
import { LoginDto, AuthPayload, RefreshToken } from '@src/models/auth'
import {
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginSocialDto
} from '@models/auth'
import { ApiSuccessResponse } from '@common/api-response'
import { FirebaseService } from '@models/firebase/firebase.service'
import config from '@config'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private firebaseService: FirebaseService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>
  ) {}
  async login(body: LoginDto) {
    const user = await this.userService.findByUsername(body.username)
    const validatePassword = await this.comparePassword(
      body.password,
      user.password
    )
    if (!validatePassword) {
      throw new UnauthorizedException('Password Is Not Correct')
    }
    delete user.password
    const payload: AuthPayload = {
      id: user.id,
      role: user.role
    }
    const access_token = this.jwtService.sign(payload, {
      // expiresIn: config.server.expires_in
    })
    let refresh_token = await this.refreshTokenRepository.findOne({
      where: { user_id: user.id }
    })
    if (!refresh_token) {
      const refresh_access_token = this.jwtService.sign(payload)
      refresh_token = await this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          refresh_token: refresh_access_token
        })
      )
    }
    return {
      user,
      access_token,
      refresh_access_token: refresh_token.refresh_token,
      expires_in: moment().add(10, 'minutes')
    }
  }

  async register(body: CreateUserDto) {
    return this.userService.create(body)
  }

  async refreshToken(refresh_token: string, user: AuthPayload) {
    const decoded = await this.jwtService.verify(refresh_token)
    if (decoded.id !== user.id) {
      throw new ForbiddenException('Access Denied')
    }
    const payload: AuthPayload = {
      id: user.id,
      role: user.role
    }
    const access_token = this.jwtService.sign(payload, {
      expiresIn: config.server.expires_in
    })
    return { access_token }
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userService.findOne(id)
    const compare = await this.comparePassword(
      changePasswordDto.password,
      user.password
    )
    if (!compare) {
      throw new UnauthorizedException('Password Is Not Correct')
    }
    await this.userService.changePassword(changePasswordDto.new_password, id)
    return new ApiSuccessResponse()
  }

  async forgetPasswordByPhoneNumber(forgetPasswordDto: ForgetPasswordDto) {
    const { phone_number, firebase_token, password } = forgetPasswordDto
    const verified = await this.firebaseService.verifyPhoneNumber(
      phone_number,
      firebase_token
    )
    if (!verified)
      throw new BadRequestException('Token And Phone Number Are Not Match')

    const user = await this.userService.findUserByPhoneNumber(phone_number)
    await this.userService.changePassword(password, user.id)
    return new ApiSuccessResponse()
  }

  async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword)
  }

  async loginWithApple(loginWithAppleDto: LoginSocialDto) {
    try {
      const { sub } = await appleSignin.verifyIdToken(loginWithAppleDto.token)
      let user = await this.userService.findByUsername(sub, false)
      if (!user) {
        user = await this.userService.create({
          username: sub,
          password: sub,
          phone_number: sub,
          nickname: sub
        })
      }
      return user
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async loginWithNaver(loginSocialDto: LoginSocialDto) {
    const NAVER_API = 'https://openapi.naver.com/v1/nid/me'
    const { token } = loginSocialDto
    const naver_token = `Bearer ${token}`
    try {
      const res = await axios.get(NAVER_API, {
        headers: { Authorization: naver_token }
      })
      const data = res.data.response
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async loginWithKakao(loginSocialDto: LoginSocialDto) {
    const KAKAO_URL = 'https://kapi.kakao.com/v1/user/access_token_info'
    const kakao_token = `Bearer ${loginSocialDto.token}`
    try {
      const res = await axios.get(KAKAO_URL, {
        headers: { Authorization: kakao_token }
      })
      const data = { res }
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }
}
