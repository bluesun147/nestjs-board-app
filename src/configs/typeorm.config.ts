// typeorm 설정 파일

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db'); // default.yaml에서 db 가져옴

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    // aws같은 곳에서 host값 정해져 있으면 그 값으로 하고, 로컬에서는 localhost
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
     // 엔티티 이용해서 db의 테이블 생성. 그래서 엔티티 파일이 어디있는지 설정해줌
    entities: [__dirname + '/../**/*.entity.{js, ts}'],
    synchronize: dbConfig.synchronize
    // type: 'postgres',
    // host: 'localhost',
    // port: 5432,
    // username: 'postgres',
    // password: 'bluesun',
    // database: 'board-app',
    //  // 엔티티 이용해서 db의 테이블 생성. 그래서 엔티티 파일이 어디있는지 설정해줌
    // entities: [__dirname + '/../**/*.entity.{js, ts}'],
    // synchronize: true
}