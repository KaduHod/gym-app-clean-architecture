import { TUser } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";
import User from "../../../Domain/Entities/User";
import { UserFactory } from "../../../Domain/Factory/UserFactory";

export default class RegisterUser
{
    constructor(
        public userRepository:Repository<User, TUser>,
        public user: TUser
    ){}

    public async main():Promise<any>
    {
        this.createUser()
        return await this.userRepository.save(this.user)
    }

    public createUser()
    {
        this.user = UserFactory.create(this.user)
    }
}