import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    // boardService: BoardsService; // 타입을 BoardsService로;

    // constructor(boardService: BoardsService) {
    //     this.boardService = boardService; // typescript에서는 프로퍼티 사용하려면 위에서 선언 필요
    // }
    constructor(private boardService: BoardsService) { // 접근제한자 붙이면 파라미터에서 자동으로 프로퍼티로 선언됨
        this.boardService.getAllBoards();
    }
}

