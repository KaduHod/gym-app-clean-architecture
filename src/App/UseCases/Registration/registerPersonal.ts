import { TPersonal, TUser } from "../../../Domain/Entities/Entities";
import { PersonalRepository, PK, Repository } from "../../Repositories/Repository";
import Personal from "../../../Domain/Entities/Personal";
import { PersonalFactory } from "../../../Domain/Factory/PersonalFactory";
import UserNotFoundError from "../Errors/UserNotFound";
import User from "../../../Domain/Entities/User";


export default class RegisterPersonalUseCase<RepositoryQueryOptions>
{
    constructor(
        public personalRepository: PersonalRepository,
        public userRepository: Repository,
        public personal: TPersonal | Personal,
    ){}

    public async createPersonal()
    {
        this.personal = PersonalFactory.create(this.personal) as Personal
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