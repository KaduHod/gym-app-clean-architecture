import { Exercicio, TExercicio } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class SearchExercises
{
    constructor(
        public exercisesRepository:Repository<Exercicio, TExercicio>
    ){}
} 