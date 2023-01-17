import { Entity, TExercicio } from "../../../Domain/Entities/Entities";
import Exercise from "../../../Domain/Entities/Exercise";
import MysqlExerciseRepository from "../../../Infra/Database/Knex/KnexExerciseRepository";
import { ExerciseRepository, PK } from "../../Repositories/Repository";
import ExerciseNotFound from "../Errors/ExerciseNotFound";

export default 
    class GetExerciseUseCase<RepositoryQueryOptions>
{
    constructor(
        public exerciseRepository: ExerciseRepository,
        public options: any
    )
    {}

    public async main():Promise<any>
    {
        const exercise = await this.getExercise()
        if(!exercise) throw new ExerciseNotFound()
        return exercise
    }

    public async getExercise():Promise<Exercise>
    {
        return await this.exerciseRepository.findBy(this.options, true)
    }
}