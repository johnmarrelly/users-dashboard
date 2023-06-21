import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT || 3000);
  console.log(`Server is listening on port: ${process.env.SERVER_PORT}`);
}
bootstrap();
