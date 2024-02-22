import * as momentTimezone from 'moment-timezone';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { config as AWSConfig } from 'aws-sdk';

const port = process.env.PORT || 8080;

const startServer = async (app: any, port: number | string) => {
  try {
    await app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    startServer(app, Number(port) + 1);
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  AWSConfig.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = function () {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss');
  };

  await startServer(app, port);
}

bootstrap();
