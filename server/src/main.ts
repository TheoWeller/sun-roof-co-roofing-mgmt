import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://localhost:3001'],
    methods: 'GET,PUT,PATCH,POST,DELETE',
  })

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  )

  const config = new DocumentBuilder()
    .setTitle('Sun Roof Co API')
    .setVersion('0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
