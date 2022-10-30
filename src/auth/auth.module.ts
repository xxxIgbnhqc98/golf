import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import config from '@config'
import { User } from '@models/user'
import { JwtStrategy, RefreshToken } from '@auth'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '@models/user/user.module'
import { UserService } from '@models/user/user.service'

@Module({
  imports: [
    JwtModule.register({
      secret: config.server.secret,
      signOptions: { expiresIn: config.server.expires_in }
    }),
    TypeOrmModule.forFeature([User, RefreshToken]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule {}
