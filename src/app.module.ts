import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ScheduleModule } from '@nestjs/schedule'

import config from '@config'
import { GatewayModule } from '@src/models/gateway/gateway.module'
import { AuthModule } from '@src/models/auth/auth.module'
import { UserModule } from '@models/user/user.module'
import { FileModule } from '@src/models/file/file.module'
import { GroupModule } from './models/group/group.module'
import { ProductModule } from './models/product/product.module'
import { LessonModule } from './models/lesson/lesson.module'
import { CouponModule } from './models/coupon/coupon.module'
import { PopupModule } from './models/popup/popup.module'
import { QuestionModule } from './models/question/question.module'
import { NotificationModule } from './models/notification/notification.module';
import { CounselingModule } from './models/counseling/counseling.module';
import { PaymentHistoryModule } from './models/payment-history/payment-history.module';
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
      entities: [
        'dist/models/**/entities/*.entity.js',
        'dist/auth/entities/*entity.js'
      ]
    }),
    ScheduleModule.forRoot(),
    GatewayModule,
    AuthModule,
    UserModule,
    FileModule,
    GroupModule,
    ProductModule,
    LessonModule,
    CouponModule,
    PopupModule,
    QuestionModule,
    NotificationModule,
    CounselingModule,
    PaymentHistoryModule
  ],
  providers: [JwtModule]
})
export class AppModule {}
