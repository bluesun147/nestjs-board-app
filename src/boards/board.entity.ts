// 엔티티 파일
// 자동적으로 이러한 컬럼들 가진 보드 테이블 생성

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board.model";

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
}

