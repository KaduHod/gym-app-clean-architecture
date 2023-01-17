import { describe, expect, it } from "vitest";
import PrismaAlunoRepository from "../../../Infra/Database/Prisma/PrismaAlunoRepository";
import GetAlunoUseCase from "./getAluno";

describe('Test get Aluno use case', () => {
    const repo = new PrismaAlunoRepository();
    it('Should get aluno by id', async () => {
        const useCase = new GetAlunoUseCase(repo, {where:{id:23}})
        const result = await useCase.execute()
        expect(result).toBeTruthy()
    })
    it('Should get aluno by id and user profile', async () => {
        const useCase = new GetAlunoUseCase(repo, {
            select:{
                user: {
                    select: {
                        name:true
                    }
                }
            },
            where:{id:23}
        })

        const result = await useCase.execute()
        expect(result).toBeTruthy()
        expect(result.user).toBeTruthy()
    })
})