import { writeFile } from "fs/promises";
import { Entity, TExercicio } from "../../../Domain/Entities/Entities";
import Exercise from "../../../Domain/Entities/Exercise";
import MysqlExerciseRepository from "../../../Infra/Database/Knex/KnexExerciseRepository";
import { ExerciseRepository, PK } from "../../Repositories/Repository";
import ExerciseNotFound from "../Errors/ExerciseNotFound";

export default 
    class GetExerciseUseCase
{
    constructor(
        public exerciseRepository: ExerciseRepository,
        public options: any,
        public mapper?: Function
    ){}

    public async main():Promise<any>
    {
        const exercise = await this.getExercise()
        if(exercise) return null
        if(this.mapper) return this.mapper(exercise)

        await writeFile('result.json', JSON.stringify(exercise))
        
        return exercise
    }

    public async getExercise():Promise<Exercise>
    {
        return await this.exerciseRepository.findBy(this.options, true)
    }
}