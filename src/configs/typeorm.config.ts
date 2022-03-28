// typeorm 설정 파일

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: 'bluesun',
    database: 'board-app',
     // 엔티티 이용해서 db의 테이블 생성. 그래서 엔티티 파일이 어디있는지 설정해줌
    entities: [__dirname + '/../**/*.entity.{js, ts}'],
    synchronize: true
}