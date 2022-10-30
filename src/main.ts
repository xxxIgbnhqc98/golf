import { NestFactory } from '@nestjs/core'
import { AppModule } from '@src/app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configSwagger = new DocumentBuilder()
    .setTitle('Admin')
    .setDescription('The Admin page API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('api', app, document)

  // app.setGlobalPrefix('api/', { exclude: ['danal'] })
  app.enableVersioning()
  app.enableCors()
  await app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
}
bootstrap()
