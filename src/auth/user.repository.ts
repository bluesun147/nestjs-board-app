// user entity를 db와 관련된 로직 처리하는 곳. 

import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const{username, password} = authCredentialsDto;
        const user = this.create({ username, password });

        await this.save(user);
    }
}

