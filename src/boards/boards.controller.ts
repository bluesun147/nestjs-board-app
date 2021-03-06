import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards') // boards 라는 경로
@UseGuards(AuthGuard()) // 컨트롤러 레벨로 주면 모든 핸들러가 다 영향 받음.
export class BoardsController {
    private logger = new Logger('BoardController'); // 로거 객체
    constructor(private boardsService: BoardsService) { // 컨트롤러 안에 서비스 주입 (inject)

    }

    @Post()
    @UsePipes(ValidationPipe)// 핸들러 레벨. 유효성 체크
    createBoard(@Body() createBoardDto: CreateBoardDto, // 게시물 생성
    @GetUser() user: User): Promise<Board> { // 커스텀 데코레이터 이용, 유저 객체 가져오기 위해
        this.logger.verbose(`User ${user.username} creating a new board. Payload: ${JSON.stringify(createBoardDto)}`);
        return this.boardsService.createBoard(createBoardDto, user); // user 정보 같이 넣어줌.
    }

    // @Get()
    // getAllBoards(): Promise <Board[]> { // 모든 게시물 가져오기
    //     return this.boardsService.getAllBoards();
    // }

    @Get()
    getAllBoards(
        @GetUser() user: User
    ): Promise <Board[]> { // 헤당 유저 게시물만 가져오기
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise <Board> { // id 이용해 특정 게시물 가져오기
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
    ): Promise <void> { // ParseIntPipe: nest built-in pipe. integer만.
        return this.boardsService.deleteBoardById(id, user);
    }

    @Patch('/:id/status')
    updateBoardStatus (// 게시물 상태 업데이트
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}

// @Controller('boards') // /boards 라는 경로
// export class BoardsController {
//     // boardService: BoardsService; // 타입을 BoardsService로;

//     // constructor(boardService: BoardsService) {
//     //     this.boardService = boardService; // typescript에서는 프로퍼티 사용하려면 위에서 선언 필요
//     // }
//     constructor(private boardService: BoardsService) { // 접근제한자 붙이면 파라미터에서 자동으로 프로퍼티로 선언됨

//     }
    
//     @Get('/') // http 메서드가 get 일때. 주소: /boards/
//     getAllBoard(): Board[] { // 모든 게시글 가져오는 핸들러. // : 리턴 타입 정의
//         return this.boardService.getAllBoards(); // 리퀘스트 핸들은 서비스에서 하고 처리한 값은 컨트롤러에 보내고, 컨트롤러에서 처리한 값 클라이언트에 보냄.
//     }

//     @Post()
//     @UsePipes(ValidationPipe)
//     createBoard( // 게시물 생성
//         // @Body('title') title: string,
//         // @Body('description') description: string
//         @Body() CreateBoardDto: CreateBoardDto
//     ): Board {
//         // return this.boardService.createBoard(title, description); // boardService의 createBoard 메서드
//         return this.boardService.createBoard(CreateBoardDto);
//     }

//     // localhost:3000/boards/123123
//     @Get('/:id')
//     getBoardById(@Param('id') id: string): Board { // 게시물 하나 리턴
//         return this.boardService.getBoardById(id);
//         // 파라미터 여러개 있는 경우 다 가져올 때는 
//         // @Param() params: string[]
//     }

//     @Delete('/:id')
//     deleteBoardById(@Param('id') id: string): void { // 게시물 하나 삭제
//         this.boardService.deleteBoard(id);
//     }

//     @Patch('/:id/status')
//     updateBoardStatus( // 게시물 상태 업데이트
//         @Param('id') id:string,
//         @Body('status', BoardStatusValidationPipe) status: BoardStatus // status 값만 유효성 체크. 파라미터 레벨
//     ) {
//         return this.boardService.updateBoardStatus(id, status);
//     }
// }