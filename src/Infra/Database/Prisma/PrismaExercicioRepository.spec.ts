import { Prisma } from "@prisma/client";
import { describe, expect, it } from "vitest";
import PrismaExercicioRepository from "./PrismaExercicioRepository";

describe('Teste Prisma Exercise Repository prisma', () => {
    const repo = new PrismaExercicioRepository()
    it('Should get all exercises', async () => {
        const result = await repo.findAll()
        expect(result.length).toBeTruthy()
    })
    it('Should select Exercise fields', async () => {
        const result = await repo.findAll({
            select: {
                id:true, name:true, force:true
            }
        })
        expect(result.length).toBeTruthy()
    })
    it('Should filter one exercise by his id ', async () => {
        const result = await repo.findAll({
            where:{id:918}
        })
        expect(result.length).toEqual(1)
    })
    it('Should get one exercise em all of his muscles', async () => {
        const result = await repo.findAll({
            where: {
                id:1017
            } as Prisma.exerciciosWhereInput , 
            select: {
                muscles: {
                    select: {
                        muscle: {
                            select : {
                                name:true
                            } as Prisma.musclesSelect
                        } as Prisma.musclesArgs
                    } as Prisma.exercise_muscleSelect
                } as Prisma.exercicios$musclesArgs
            } as Prisma.exerciciosSelect
            
        } as Prisma.exerciciosFindManyArgs)

        expect(result).toBeTruthy();
    })
})