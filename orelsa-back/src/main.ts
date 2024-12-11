import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:"https://orelsa-fe.vercel.app",
    methods: 'GET,POST,PUT,PATCH,DELETE', 
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('ORELSA.AZ')
    .setDescription(
      'Orelsa - İran və digər ölkələrdən olan kosmetik məhsulların satışı',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(9089);
}
bootstrap();
