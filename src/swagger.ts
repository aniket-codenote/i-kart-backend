import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const createSwaggerDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('IKart API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);
};
