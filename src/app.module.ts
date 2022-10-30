import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import config from '@config'
import { GatewayModule } from '@gateway/gateway.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from '@models/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: config.database.type,
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      entities: ['dist/models/**/entities/*{.entity.ts,entity.js}'],
      synchronize: true
    }),
    GatewayModule,
    AuthModule,
    UserModule
  ],
  providers: [JwtModule]
})
export class AppModule {}
