import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]) // repository 임포트
  ],
  controllers: [BoardsController], // 컨트롤러 생성하면 모듈에 자동으로 등록됨.
  providers: [BoardsService]
})
export class BoardsModule {}

