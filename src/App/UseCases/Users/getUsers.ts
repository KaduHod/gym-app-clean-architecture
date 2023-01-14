import { TUser } from "../../../Domain/Entities/Entities";
import User from "../../../Domain/Entities/User";
import { Repository } from "../../Repositories/Repository";

export default class GetUsersUseCase 
{
    constructor(
        public userRepository: Repository,
        public options?:any
    ){}

    public async main(): Promise< User[] | TUser[]>
    {
        if(this.options) return await this.userRepository.findAll(this.options);
        return await this.userRepository.findAll();
    }
}