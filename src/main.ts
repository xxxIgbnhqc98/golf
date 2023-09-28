import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as compression from 'compression'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '@src/app.module'

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configSwagger = new DocumentBuilder()
    .setTitle('Golf project')
    .setDescription('API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('api', app, document)

  // app.setGlobalPrefix('api/', { exclude: ['danal'] })
  app.enableVersioning()
  app.enableCors()
  app.use(compression())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
}
bootstrap()
