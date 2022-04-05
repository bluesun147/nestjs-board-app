import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server'); // default.yaml 의 server 가져옴

  const port = serverConfig.port; // server에서 정의한 port 사용
  await app.listen(port);
  Logger.log(`App running on port ${port}`); // 앱 시작 시 로그
}
bootstrap();
