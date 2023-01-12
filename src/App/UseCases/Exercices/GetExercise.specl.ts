import { describe, expect, it } from "vitest";
import Exercise from "../../../Domain/Entities/Exercise";
import MysqlExerciseRepository from "../../../Infra/Database/Mysql/ExerciseRepository";
import GetExerciseUseCase from "./GetExercise";

describe('Get Exercise use case', () => {
    const exercicioRepo = new MysqlExerciseRepository;

    it('Should get exercise', async () => {
        const useCase = new GetExerciseUseCase(
            exercicioRepo, 882
        )

        const queryResult = await useCase.main()
        
        expect(queryResult).toBeTruthy()
    })

    it('Should  throw error Exercise not found', async () => {
        const useCase = new GetExerciseUseCase(
            exercicioRepo, 82
        )

        const queryResult = useCase.main()
        
        await expect(queryResult).rejects.toThrow('Exercise not found!')
    })
})