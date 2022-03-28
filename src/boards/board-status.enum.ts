// 보드 모델
// 모델 정의는 class 나 interface 이용.

// // entity 사용할 것이기 때문에 필요 없음.
// export interface Board { // 인터페이스는 타입만 지정
//     id: string;
//     title: string;
//     description: string;
//     status: BoardStatus; // 공개글인지 비공개글인지
// }

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE' // status는 이 두 값만 올 수 있음
}