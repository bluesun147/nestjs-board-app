import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

// 클래스를 사용자 정의(custom) 저장소로 선언하는데 사용됨.
// repository 클래스를 엔티티 관리하는 저장소로 선언.
@EntityRepository(Board) // 이 클래스가 Board 컨트롤하는 리포지토리임을 선언
export class BoardRepository extends Repository<Board> {
    
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.create({ // 새로운 객체 생성. typeorm 메소드
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.save(board); // db에 저장. typeorm 메소드
        return board;
    }
}

