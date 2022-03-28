import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";
// 커스텀 파이프

// 게시물 업데이트 시 유효성 체크
export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]

    transform(value: any, metadata: ArgumentMetadata) {

        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options.`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1; // -1이 아니면 true 리턴. 0이면 PUBLIC.1이면 PRIVATE, -1이면 없는 값
    }
}

 