import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import config from '@config'
import { User } from '@models/user'
import { JwtStrategy, RefreshToken, RefreshStrategy } from '@src/models/auth'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '@models/user/user.module'
import { UserService } from '@models/user/user.service'
import { FirebaseService } from '@models/firebase/firebase.service'

@Module({
  imports: [
    JwtModule.register({
      secret: config.server.secret
    }),
    TypeOrmModule.forFeature([User, RefreshToken]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    RefreshStrategy,
    FirebaseService
  ]
})
export class AuthModule {}
