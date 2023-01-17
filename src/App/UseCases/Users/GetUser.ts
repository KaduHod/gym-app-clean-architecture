import User from "../../../Domain/Entities/User";
import { Repository } from "../../Repositories/Repository";

export default class GetUserUseCase 
{
    constructor(
        public userRepository: Repository,
        public options: any,
        public mapper?: Function
    ){}

    public async main(): Promise<any>
    {
        let user:User = await this.userRepository.findBy(this.options, true)
        if(this.mapper && user) return this.mapper(user)
        return user
    }
}