import { TExercicio, TExerciseMuscle } from "../Entities/Entities";
import Exercise from "../Entities/Exercise";

export const ExerciseFactory = {
    create(attrs:TExercicio, muscles?:TExerciseMuscle[] | null){
        if(muscles) {
            return new Exercise(
                attrs, muscles
            )  
        }
        return new Exercise(attrs)
    }
}