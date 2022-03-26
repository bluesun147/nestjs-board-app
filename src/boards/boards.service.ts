import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid'; // v1을 uuid란 이름으로.
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = []; // 게시글 배열

    // 모든 게시글 읽기. board controller에서 사용
    getAllBoards(): Board[] { // :Board[] 는 리턴값의 타입
        return this.boards;
    }

    // createBoard(title: string, description: string) { // 게시물 생성
    createBoard(CreateBoardDto: CreateBoardDto) { // 게시물 생성
        const {title, description} = CreateBoardDto; // const title = CreateBoardDto.title;
        const board: Board = {
            id: uuid(), // 임의로 유니크한 값
            title, // title: title. es6 문법. 이름 같을 때
            description,
            status: BoardStatus.PUBLIC,
        }

        this.boards.push(board);
        return board;
    }
}
