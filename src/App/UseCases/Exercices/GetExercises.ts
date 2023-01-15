import { writeFile } from "fs/promises";
import { Exercicio, TExercicio } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class GetExercisesUseCase<RepositoryQueryOptions>
{
    constructor(
        public exerciseRepository: Repository,
        public options?: any,
        public mapper?: Function
    ){}

    async main(): Promise<Exercicio[]>
    {
        let queryResult = this.options ? this.exerciseRepository.findAll(this.options) : this.exerciseRepository.findAll();
        if(this.mapper) return this.mapper(await queryResult)
        
        return await queryResult
    }
}