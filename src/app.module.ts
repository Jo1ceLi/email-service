import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   SENDGRID_API_KEY: Joi.required(),
      //   RABBITMQ_URL: Joi.required(),
      //   RABBITMQ_EMAIL_QUEUE: Joi.required(),
      // }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
