
import { describe, expect, it } from "vitest";
import PrismaExercicioRepository from "../../../Infra/Database/Prisma/PrismaExercicioRepository";

describe('Test use case get exercises', () => {
    const prismaRepo = new PrismaExercicioRepository()
    it('Should get exercises', async () => {
        const result = await prismaRepo.findAll()
        expect(result.length).toBeTruthy()
    })
    it('Should get exercise by his id', async () => {
        const result = await prismaRepo.findAll({where:{id:1000}})
        console.log(result)
        expect(result.length).toEqual(1)
        expect(result).toBeTruthy()
    })
})