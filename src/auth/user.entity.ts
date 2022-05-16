// 유저 엔티티

import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username']) // 유일한 값
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // 관계 형성 위해서는 엔티티에 서로간의 필드 넣어줘야 함
    // 타입, 보드에서 유저에 어떻게 접근하는지, 유저 정보 가져올 때 보드정보도 같이 가져온다는 뜻
    @OneToMany(type => Board, board => board.user, {eager: true}) // 1:N relationship
    boards: Board[] // 유저에 보드라는 컬럼 넣음. 여러개 넣을 수 있으니까 배열로
}

