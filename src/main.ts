import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createSwaggerDocument(app);
  const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? '').split(',');
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
