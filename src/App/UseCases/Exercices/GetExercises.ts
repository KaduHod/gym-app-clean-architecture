import { Exercicio, TExercicio } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class GetExercisesUseCase 
{
    constructor(
        public exerciseRepository: Repository,
        public options?: any
    ){}

    main(): Promise<Exercicio[]>
    {
        return this.options ? this.exerciseRepository.findAll(this.options) : this.exerciseRepository.findAll();
    }
}