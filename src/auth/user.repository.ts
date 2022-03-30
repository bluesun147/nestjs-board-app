// user entity를 db와 관련된 로직 처리하는 곳. 

import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}

