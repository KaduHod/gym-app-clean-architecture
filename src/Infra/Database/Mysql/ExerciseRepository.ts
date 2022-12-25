import { Exercicio, TExercicio } from "../../../Domain/Entities/Entities";
import MysqlRepository from "./MysqlRepository";

export default 
    class MysqlExerciseRepository
    extends MysqlRepository<Exercicio, TExercicio>
{
    constructor()
    {
        super('exercicios')
    }
}