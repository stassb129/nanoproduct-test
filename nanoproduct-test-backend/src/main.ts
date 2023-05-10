import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT || 8080
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
      .setTitle('JS interns')
      .setDescription('docs for app')
      .setVersion('0.0.1')
      .addTag('Locations')
      .build()

  app.setGlobalPrefix('/api');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(PORT);

  console.log("Server has been started...")
}
bootstrap();
