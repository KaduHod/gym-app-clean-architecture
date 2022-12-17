import { User } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class RegisterUser
{
    constructor(
        public userRepository:Repository<User>
    ){}
}