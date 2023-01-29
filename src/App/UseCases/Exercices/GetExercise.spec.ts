import { describe, expect, it } from "vitest";
import Exercise from "../../../Domain/Entities/Exercise";
import MysqlExerciseRepository from "../../../Infra/Database/Knex/KnexExerciseRepository";
import PrismaExercicioRepository from "../../../Infra/Database/Prisma/PrismaExercicioRepository";
import GetExerciseUseCase from "./GetExercise";
import { TMuscle } from "../../../Domain/Entities/Entities";

describe('Get Exercise use case', () => {
    const exercicioRepo = new PrismaExercicioRepository;

    it('Should get exercise', async () => {
        const useCase = new GetExerciseUseCase(
            exercicioRepo, {where:{id:882}}
        )
        const queryResult = await useCase.main()
            
        expect(queryResult).toBeTruthy()
    })

    it('Should  throw error Exercise not found', async () => {
        const useCase = new GetExerciseUseCase(
            exercicioRepo, {
                where:{id:38743894}
            }
        )

        const queryResult = await useCase.main()
        
        expect(queryResult).toBeFalsy()
    })
})