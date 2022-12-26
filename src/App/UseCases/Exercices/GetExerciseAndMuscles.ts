import Exercise from "../../../Domain/Entities/Exercise";
import MysqlExerciseRepository, { MusclesFromExerciseOptions } from "../../../Infra/Database/Mysql/ExerciseRepository";
import { PK } from "../../Repositories/Repository";
import ExerciseNotFound from "../Errors/ExerciseNotFound";
import { ExerciseFactory } from "../../../Domain/Factory/ExerciseFactory";
import { TExercicio, TExerciseMuscle, TExerciseMuscleRole, TMuscle } from "../../../Domain/Entities/Entities";

export default class GetExerciseAndHisMuscles
{
   
    constructor(
        public exerciseRepository:MysqlExerciseRepository,
        public exerciseId:PK, 
        public fields: MusclesFromExerciseOptions | null,
        public roles: TExerciseMuscleRole[]| null
    )
    {}

    public async main(): Promise<Exercise>
    {
        const exerciseExists = await this.exerciseExists()
        if(!exerciseExists) throw new ExerciseNotFound()

        const [exercise, muscles] = await Promise.all([
            this.getExercise(),
            this.getMuscles()
        ])

        return this.mountExercicio(exercise, muscles)
    }

    public async exerciseExists(): Promise<boolean>
    {
        return await this.exerciseRepository.exists(this.exerciseId)
    }

    public async getMuscles(): Promise<TExerciseMuscle[]>
    {
        return await this.exerciseRepository.musclesFromExercise(
            this.exerciseId, 
            this.fields ?? null, 
            this.roles
        )
    }

    public async getExercise(): Promise<TExercicio>
    {
        return await this.exerciseRepository.findByPK(this.exerciseId)
    }

    public mountExercicio(
        exercise: TExercicio, 
        muscles: TExerciseMuscle[]
    ): Exercise
    {
        return ExerciseFactory.create(exercise, muscles)
    }

}