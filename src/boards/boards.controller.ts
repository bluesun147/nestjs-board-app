import { Controller, Get } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards') // /boards 라는 경로
export class BoardsController {
    // boardService: BoardsService; // 타입을 BoardsService로;

    // constructor(boardService: BoardsService) {
    //     this.boardService = boardService; // typescript에서는 프로퍼티 사용하려면 위에서 선언 필요
    // }
    constructor(private boardService: BoardsService) { // 접근제한자 붙이면 파라미터에서 자동으로 프로퍼티로 선언됨

    }
    
    @Get('/') // http 메서드가 get 일때. 주소: /boards/
    getAllBoard(): Board[] { // 모든 게시글 가져오는 핸들러. // : 리턴 타입 정의
        return this.boardService.getAllBoards(); // 리퀘스트 핸들은 서비스에서 하고 처리한 값은 컨트롤러에 보내고, 컨트롤러에서 처리한 값 클라이언트에 보냄.
    }
}