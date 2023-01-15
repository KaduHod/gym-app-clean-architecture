import { writeFile } from "fs/promises";
import { Exercicio, TExercicio } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class GetExercisesUseCase<RepositoryQueryOptions>
{
    constructor(
        public exerciseRepository: Repository,
        public options?: any
    ){}

    async main(): Promise<Exercicio[]>
    {
        let queryResult = this.options ? this.exerciseRepository.findAll(this.options) : this.exerciseRepository.findAll();
        
        return this.mount(await queryResult)
    }

    mount(queryResult:any)
    {
        return queryResult.map((item:any) => {
            return {...item, muscles: item.muscles.map((item:any) => item.muscle)}
        })
    }
}