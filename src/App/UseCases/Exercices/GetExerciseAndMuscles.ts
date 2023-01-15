import Exercise from "../../../Domain/Entities/Exercise";;
import { ExerciseRepository, MusclesFromExerciseOptions, PK } from "../../Repositories/Repository";
import { ExerciseFactory } from "../../../Domain/Factory/ExerciseFactory";
import ExerciseNotFound from "../Errors/ExerciseNotFound";
import { TExercicio, TExerciseMuscle, TExerciseMuscleRole } from "../../../Domain/Entities/Entities";

export default class GetExerciseAndHisMuscles<RepositoryQueryOptions>
{
    constructor(
        public exerciseRepository: ExerciseRepository,
        public options: RepositoryQueryOptions 
    ){}

    public async main(): Promise<Exercise>
    {
        let exerciseDB:any = await this.exerciseRepository.findByPK(this.options)
        if(!exerciseDB) throw new ExerciseNotFound()
        return this.mountExercise(exerciseDB);
    }

    public mountExercise(exercise:any): Exercise
    {
        if(!exercise.muscles) return ExerciseFactory.create(exercise);

        return ExerciseFactory.create(
            exercise as TExercicio, 
            exercise.muscles as TExerciseMuscle[]
        )
    }
}