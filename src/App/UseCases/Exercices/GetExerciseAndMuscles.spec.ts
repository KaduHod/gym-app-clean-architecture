import { describe, expect, it } from "vitest";
import { TMuscle } from "../../../Domain/Entities/Entities";
import Exercise from "../../../Domain/Entities/Exercise";
import MysqlExerciseRepository from "../../../Infra/Database/Knex/KnexExerciseRepository";
import PrismaExercicioRepository from "../../../Infra/Database/Prisma/PrismaExercicioRepository";
import GetExercisesAndHisMuscles from './GetExerciseAndMuscles'

describe('Exercise and his muscles use case', () => {
    const exerciseRepo = new PrismaExercicioRepository;

    it('Should get exercise and his muscles', async () => {
        const useCase = new GetExercisesAndHisMuscles(
            exerciseRepo,
            {
                where:{id:885},
                include: {
                    muscles : {
                        include : {
                            muscle : true
                        }
                    }
                }
            },
        )

        const exercise = await useCase.main()

        expect(exercise).toBeInstanceOf(Exercise)
        expect(exercise?.muscles).toBeTruthy()
    })

    // it('Should get exercise and his agonists', async () => {
        // const useCase = new GetExercisesAndHisMuscles(
            // exerciseRepo,
            // 885,
            // ['name','role'],
            // ['agonist']
        // )
// 
        // const exercise = await useCase.main()
        // const check = exercise
                        // .muscles
                        // ?.find((muscle:TMuscle) => muscle.role !== "agonist")
// 
        // expect(exercise).toBeInstanceOf(Exercise)
        // expect(check).toBeFalsy()
    // })
    // it('Should get exercise and his synergists', async () => {
        // const useCase = new GetExercisesAndHisMuscles(
            // exerciseRepo,
            // 885,
            // ['name','role'],
            // ['synergist']
        // )
// 
        // const exercise = await useCase.main()
        // const check = exercise
                        // .muscles
                        // ?.find((muscle:TMuscle) => muscle.role !== "synergist")
// 
        // expect(exercise).toBeInstanceOf(Exercise)
        // expect(check).toBeFalsy()
    // })
})