import Exercise from "../../../Domain/Entities/Exercise";;
import { ExerciseRepository, MusclesFromExerciseOptions, PK } from "../../Repositories/Repository";
import { ExerciseFactory } from "../../../Domain/Factory/ExerciseFactory";
import ExerciseNotFound from "../Errors/ExerciseNotFound";
import { TExercicio, TExerciseMuscle, TExerciseMuscleRole } from "../../../Domain/Entities/Entities";

export default class GetExerciseAndHisMuscles
{
    constructor(
        public exerciseRepository: ExerciseRepository,
        public options: any | {fillds :MusclesFromExerciseOptions, roles:TExerciseMuscleRole[] | null, exerciseId:PK}
    ){}

    public async main(): Promise<Exercise>
    {
        const exercise:any = await this.exerciseRepository.findByPK(this.options)
        if(!exercise) throw new ExerciseNotFound()
        return this.mountExercise(exercise)
    }

    public mountExercise(exercise:any): Exercise
    {
        return ExerciseFactory.create(
            exercise as TExercicio, 
            exercise.muscles as TExerciseMuscle[]
        )
    }
}