import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(3000);
  Logger.log(`App running on port ${port}`); // 앱 시작 시 로그
}
bootstrap();
