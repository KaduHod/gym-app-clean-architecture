import { TMuscle } from "../../../Domain/Entities/Entities";
import MysqlRepository from "./MysqlRepository";
import Muscle from "../../../Domain/Entities/Muscle";

export default 
        class MysqlMuscleRepository
        extends MysqlRepository<Muscle, TMuscle>
{
    constructor()
    {
        super('muscles')
    }
}