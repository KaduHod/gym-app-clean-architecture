import { TUser } from "../../../Domain/Entities/Entities";
import User from "../../../Domain/Entities/User";
import { Repository } from "../../Repositories/Repository";

export default class GetUsersUseCase 
{
    constructor(
        public userRepository: Repository<TUser, User>,
        public fields?:string[]
    ){}

    public async main(): Promise< User[] | TUser[]>
    {
        if(this.fields) return await this.userRepository.findAll(this.fields);
        return await this.userRepository.findAll();
    }
}