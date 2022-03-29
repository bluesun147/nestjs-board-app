import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid'; // v1을 uuid란 이름으로.
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { number } from 'joi';

@Injectable()
export class BoardsService {
    constructor (
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository, // 서비스에 Repository 주입.
    ) {

    }

    // 게시물 생성하기
    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto); // repository에서 불러옴.
    }

    // id 이용해 특정 게시물 가져오기
    async getBoardById(id: number): Promise<Board> { // 리턴값은 entity(Board). entity에 다 정의해뒀기 때문
        const found = await this.boardRepository.findOne(id); // https://www.inflearn.com/questions/482960 네스트는 typeorm v0.2 사용.

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

     // id로 게시물 삭제
    async deleteBoardById(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

            if (result.affected === 0) {
                throw new NotFoundException(`Can't find Board with id ${id}`);
            }

            console.log(result); // DeleteResult { raw: [], affected: 1 } // 성공 시. 없으면 0
    }

    // 게시물 상태 업데이트
    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}


// @Injectable()
// export class BoardsService {
//     boards: Board[] = []; // 게시글 배열

//     // 모든 게시글 읽기. board controller에서 사용
//     getAllBoards(): Board[] { // :Board[] 는 리턴값의 타입
//         return this.boards;
//     }

//     // createBoard(title: string, description: string) { // 게시물 생성
//     createBoard(CreateBoardDto: CreateBoardDto) { // 게시물 생성
//         const {title, description} = CreateBoardDto; // const title = CreateBoardDto.title;
//         const board: Board = {
//             id: uuid(), // 임의로 유니크한 값
//             title, // title: title. es6 문법. 이름 같을 때
//             description,
//             status: BoardStatus.PUBLIC,
//         }

//         this.boards.push(board);
//         return board;
//     }

//     getBoardById(id: string): Board{ // id로 게시물 읽기
//         const found =  this.boards.find((board) => board.id === id);

//         if (!found) {
//             throw new NotFoundException(`Can't find Board with id ${id}`);
//         }

//         return found;
//     }

//     deleteBoard(id: string): void{ // id로 게시물 삭제
//         const found = this.getBoardById(id);
//         this.boards = this.boards.filter((board) => board.id !== found.id); // id 다른것만 남김.
//     }

//     updateBoardStatus(id: string, status: BoardStatus): Board {
//         const board = this.getBoardById(id);
//         board.status = status;
//         return board;
//     }
// }