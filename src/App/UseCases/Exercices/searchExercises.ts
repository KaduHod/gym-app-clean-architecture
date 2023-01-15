import { Exercicio, TExercicio } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class SearchExercises<RepositoryQueryOptions>
{
    constructor(
        public exercisesRepository:Repository
    ){}
} 