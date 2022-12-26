import { TExercicio, TExerciseMuscle } from "../Entities/Entities";
import Exercise from "../Entities/Exercise";

export const ExerciseFactory = {
    create(attrs:TExercicio, muscles:TExerciseMuscle[] | null){
        return new Exercise(
            attrs, muscles
        )  
    }
}