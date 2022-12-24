import { TPersonal } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";
import Personal from "../../../Domain/Entities/Personal";
import { PersonalFactory } from "../../../Domain/Factory/PersonalFactory";


export default class RegisterPersonal
{
    constructor(
        public personalRepository:Repository<Personal, TPersonal>,
        public personal: TPersonal
    ){}

    public createPersonal()
    {
        this.personal = PersonalFactory.create(this.personal)
    }

    public async main()
    {
        this.createPersonal()
        return await this.personalRepository.save(this.personal)
    }
}