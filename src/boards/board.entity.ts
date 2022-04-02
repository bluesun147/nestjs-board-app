// 엔티티 파일
// 자동적으로 이러한 컬럼들 가진 보드 테이블 생성 (자동으로 테이블로 변환)

import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";

@Entity() // @Entity() 데코레이터 클래스는 Board 클래스가 엔티티임을 나타냄.
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() // id열이 Board 엔티티의 기본 키 열임 나타냄
    id: number;

    @Column() // 보통 칼럼
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    // 관계 형성 위해서는 엔티티에 서로간의 필드 넣어줘야 함
    // 타입, 유저에서 보드에 어떻게 접근하는지, 보드 정보 가져올 때 유저 정보는 가져오지 않는다는 뜻
    @ManyToOne(type => User, user => user.boards, {eager: false}) // N:1 relationship
    user: User; // 유저 컬럼
}

