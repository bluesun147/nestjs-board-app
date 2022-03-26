import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
    private boards: Board[] = []; // 게시글 배열

    // 모든 게시글 읽기. board controller에서 사용
    getAllBoards(): Board[] { // :Board[] 는 리턴값의 타입
        return this.boards;
    }
}
