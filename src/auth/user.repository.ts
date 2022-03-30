// user entity를 db와 관련된 로직 처리하는 곳. 

import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const{username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt(); // salt 생성
        const hashedPassword = await bcrypt.hash(password, salt); // 해시된 비밀번호

        const user = this.create({ username, password: hashedPassword }); // 해시된 pw 저장

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    };
}

