import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { ProductsModule } from './products/products.module';
import { EmailModule } from './email/email.module';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { StoreModule } from './store/store.module';
import { StoreProductModule } from './store-product/store-product.module';
import { AuthModule } from './auth/auth.module';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
      }),
    }),
    PrismaModule,
    CatalogsModule,
    ProductsModule,
    EmailModule,
    StoreModule,
    StoreProductModule,
    AuthModule,
    ImageModule,
    UploadModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, ImageService],
})
export class AppModule {}
