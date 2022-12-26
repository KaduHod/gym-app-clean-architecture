import { Entity, TExercicio } from "../../../Domain/Entities/Entities";
import Exercise from "../../../Domain/Entities/Exercise";
import MysqlExerciseRepository from "../../../Infra/Database/Mysql/ExerciseRepository";
import { PK } from "../../Repositories/Repository";
import ExerciseNotFound from "../Errors/ExerciseNotFound";

export default 
    class GetExerciseUseCase
{
    constructor(
        public exerciseRepository: MysqlExerciseRepository,
        public exerciseId: PK
    )
    {}

    public async main():Promise<any>
    {
        const exerciseExists = await this.exerciseExists()
        if(!exerciseExists) throw new ExerciseNotFound()
        
        return await this.getExercise()
    }

    public async exerciseExists(): Promise<boolean>
    {
        return await this.exerciseRepository.exists(this.exerciseId)
    }

    public async getExercise():Promise<Exercise>
    {
        return await this.exerciseRepository.findByPK(this.exerciseId)
    }
}