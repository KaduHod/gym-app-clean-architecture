import { TPersonal } from "../../../Domain/Entities/Entities";
import { PersonalRepository } from "../../Repositories/Repository";
import Personal from "../../../Domain/Entities/Personal";
import { PersonalFactory } from "../../../Domain/Factory/PersonalFactory";
import { UserFactory } from "../../../Domain/Factory/UserFactory";
import User from "../../../Domain/Entities/User";

export default class RegisterPersonalUseCase
{
    constructor(
        public personalRepository: PersonalRepository,
        public personal: TPersonal | Personal,
    ){}

    public async createPersonal()
    {
        this.personal = UserFactory.create(this.personal as TPersonal) as User
    }

    public async main()
    {
        this.createPersonal()
        return await this
                        .personalRepository
                        .save(this.personal)
    }

   
}