import { TMuscle, Muscle } from "../../../Domain/Entities/Entities";
import MysqlRepository from "./MysqlRepository";

export default 
        class MysqlMuscleRepository
        extends MysqlRepository<Muscle, TMuscle>
{
    constructor()
    {
        super('muscles')
    }
}