
import { describe, expect, it } from "vitest";
import PrismaExercicioRepository from "../../../Infra/Database/Prisma/PrismaExercicioRepository";
import GetExercisesUseCase from "./GetExercises";
import PrismaExercicioMapper from "../../../Infra/Database/Prisma/Mappers/exercicios";
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

    it('Should get Exercises mapped in useCase', async () => {
        const useCase = new GetExercisesUseCase(
            prismaRepo,
            {
                select : {
                    id:true,
                    name:true,
                    force:true,
                    link:true,
                    muscles: {
                        select: {
                            muscle: {
                                select: {
                                    name:true, id:true, image:true
                                } as Prisma.musclesSelect
                            } as Prisma.musclesArgs
                        } as Prisma.exercise_muscleSelect
                    } as Prisma.exercicios$musclesArgs
                } as Prisma.exerciciosSelect
            } as Prisma.exerciciosFindManyArgs,
            PrismaExercicioMapper.toArrayGraphQL
        );

        const result = await useCase.main()
        expect(result).toBeTruthy()
    })
})