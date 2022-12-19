import { TUser } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";
import User from "../../../Domain/Entities/User";

export default class RegisterUser
{
    constructor(
        public userRepository:Repository<User, TUser>
    ){}
}