import { Request, Response } from "express";
import GetExerciseAndHisMuscles from "../../App/UseCases/Exercices/GetExerciseAndMuscles";
import GetExerciseUseCase from "../../App/UseCases/Exercices/GetExercise";
import MysqlExerciseRepository from "../Database/Mysql/ExerciseRepository";
import { ExerciseRepository, Repository } from "../../App/Repositories/Repository";
import { Exercicio, TExercicio } from "../../Domain/Entities/Entities";
import Exercise from "../../Domain/Entities/Exercise";

class ExerciseController
{
    constructor(
        public exerciseRepository: ExerciseRepository
    ){}
    index = async (req:Request, res:Response): Promise<any> =>
    {
        const {id} = req.params
        const getExerciseUseCase = new GetExerciseUseCase(
            this.exerciseRepository,
            id
        )

        const exercise = await getExerciseUseCase.main()
        res.send({exercise})
    }
}

export default new ExerciseController(
    new MysqlExerciseRepository
)