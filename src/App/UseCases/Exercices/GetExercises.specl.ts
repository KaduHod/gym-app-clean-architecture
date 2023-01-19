
import { describe, expect, it } from "vitest";
import PrismaExercicioRepository from "../../../Infra/Database/Prisma/PrismaExercicioRepository";
import GetExercisesUseCase from "./GetExercises";
import PrismaMapper from "../../../Infra/Database/Prisma/Mappers/prisma";
import { Exercicio } from "../../../Domain/Entities/Entities";
import { Prisma } from "@prisma/client";

describe('Test use case get exercises', () => {
    const prismaRepo = new PrismaExercicioRepository()
    it('Should get exercises', async () => {
        const result = await prismaRepo.findAll()
        expect(result.length).toBeTruthy()
    })
    it('Should get exercise by his id', async () => {
        const result = await prismaRepo.findAll({where:{id:1000}})
        expect(result.length).toEqual(1)
        expect(result).toBeTruthy()
    })

    it('Should get Exercises mapped in useCAse', async () => {
        const useCase = new GetExercisesUseCase(
            prismaRepo,
            {
                select : {
                    id:true,
                    name:true,
                    force:true,
                    link:true,
                    exercise_muscle : {
                        select : {
                            role:true,
                            muscles : true
                        } as Prisma.exercise_muscleSelect
                    } as Prisma.exercicios$exercise_muscleArgs
                } as Prisma.exerciciosSelect
            } as Prisma.exerciciosFindManyArgs,
            PrismaMapper.exercicios.PrismaExercisesWithMusclesToGraphQl
        );

        const result = await useCase.main()
        let check = result.filter((exercicio) => exercicio.constructor.name !== 'Exercise')

        expect(check.length).toBeFalsy()

    })
})