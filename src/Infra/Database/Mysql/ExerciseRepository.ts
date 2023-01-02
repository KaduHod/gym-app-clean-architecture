import { TExercicio, TExerciseMuscle, TExerciseMuscleRole, TMuscle } from "../../../Domain/Entities/Entities";
import MysqlRepository from "./MysqlRepository";
import Exercise from "../../../Domain/Entities/Exercise";
import { ExerciseRepository, PK, Repository } from "../../../App/Repositories/Repository";

export type MusclesFromExerciseOptions = string[]
export default 
    class MysqlExerciseRepository
    extends MysqlRepository<Exercise, TExercicio>
    implements ExerciseRepository
{
    constructor()
    {
        super('exercicios')
    }

    public async musclesFromExercise(
        exercise_id:PK, 
        fields: MusclesFromExerciseOptions | null,
        roles: TExerciseMuscleRole[] | null
    ): Promise<any>
    {
        if(!fields){
            fields = [
                'muscles.name', 
                'exercise_muscle.role', 
                'muscles.image'
            ]
        } else {
            fields = fields.map((field:string) => {
                if(field === 'role') return `exercise_muscle.${field}`
                return `muscles.${field}`
            })
        }
        
        return await this
                        .conn('muscles')
                        .select(...fields)
                        .innerJoin(
                            'exercise_muscle',
                            'exercise_muscle.muscle_id',
                            '=',
                            'muscles.id',
                        )
                        .innerJoin(
                            "exercicios",
                            "exercicios.id",
                            "=",
                            "exercise_muscle.exercise_id"
                        )
                        .where({
                            "exercicios.id": exercise_id,
                            'exercise_muscle.role': roles
                        })
    }
}