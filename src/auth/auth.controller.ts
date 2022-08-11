import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth') // auth 라는 경로
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup') // auth/signup. 회원가입
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> { // username, pw 입력받음
        return this.authService.signUp(authCredentialsDto);
    }

    @Get('/users') // 유저 정보 읽기
    readUsers(): Promise<User[]> {
        return this.authService.readUsers();
    }

    @Post('signin') // 로그인
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Delete('/:id')
    deleteUserById(@Param('id') id: number): Promise<void> {
        return this.authService.deleteUserById(id);
    }

    @Post('/test')
    @UseGuards(AuthGuard()) // req안에 유저 객체 넣기 위해 추가해야 함.
    test(@GetUser() user: User) { // 커스텀 데코레이터
        console.log(user);
        return user;
    }
}