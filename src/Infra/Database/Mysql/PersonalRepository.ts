import { PK, Repository } from "../../../App/Repositories/Repository";
import { TPersonal } from "../../../Domain/Entities/Entities";
import Personal from "../../../Domain/Entities/Personal";
import MysqlRepository from "./MysqlRepository";


export default 
    class PersonalFactory 
    extends MysqlRepository<Personal, TPersonal>
{
    constructor()
    {
        super('personais')
    }
}

