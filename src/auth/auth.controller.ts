import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup') // 회원가입
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> { // username, pw 입력받음
        return this.authService.signUp(authCredentialsDto);
    }

}

