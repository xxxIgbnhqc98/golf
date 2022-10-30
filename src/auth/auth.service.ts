import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as moment from 'moment'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from '@models/user'
import { UserService } from '@models/user/user.service'
import { LoginDto, AuthPayload, RefreshToken } from '@auth'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
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
      username: user.username,
      nickname: user.nickname,
      phone_number: user.phone_number
    }
    const access_token = this.jwtService.sign(payload)
    const refresh_access_token = this.jwtService.sign(payload, {
      expiresIn: undefined
    })
    const refresh_token = this.refreshTokenRepository.create({
      user_id: user.id,
      refresh_token: refresh_access_token
    })
    await this.refreshTokenRepository.save(refresh_token)
    return {
      user,
      access_token,
      refresh_access_token,
      expires_in: moment().add(1, 'days')
    }
  }

  async register(body: CreateUserDto) {
    return this.userService.create(body)
  }

  async changePassword(id: string, body: any) {}

  async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword)
  }
}
