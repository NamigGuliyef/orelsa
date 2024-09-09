import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('ORELSA.AZ')
    .setDescription(
      'Orelsa - İran və digər ölkələrdən olan kosmetik məhsulların satışı',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000/api')
    .addBearerAuth()
    .build();

    console.log(process.env.BASE_URL);
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(9089);
}
bootstrap();
