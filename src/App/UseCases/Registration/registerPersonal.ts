import { TPersonal, TUser } from "../../../Domain/Entities/Entities";
import { PK, Repository } from "../../Repositories/Repository";
import Personal from "../../../Domain/Entities/Personal";
import { PersonalFactory } from "../../../Domain/Factory/PersonalFactory";
import UserNotFoundError from "../Errors/UserNotFound";
import User from "../../../Domain/Entities/User";


export default class RegisterPersonal
{
    constructor(
        public personalRepository: Repository<Personal, TPersonal>,
        public userRepository: Repository<User, TUser>,
        public personal: TPersonal,
    ){}

    public async createPersonal()
    {
        this.personal = PersonalFactory.create(this.personal)
    }

    public async main()
    {
        const userExists = await this.userExists()
        if(!userExists) throw new UserNotFoundError()

        this.createPersonal()
        return await this
                        .personalRepository
                        .save(this.personal)
    }

    public async userExists(): Promise<boolean>
    {
        return await this
                        .userRepository
                        .exists(this.personal.user_id)
    }
}