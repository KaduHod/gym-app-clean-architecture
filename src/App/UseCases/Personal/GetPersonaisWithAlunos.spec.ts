import { describe, it } from "vitest";
import PrismaAlunoRepository from "../../../Infra/Database/Prisma/PrismaAlunoRepository";
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import GetPersonaisWithALunosUseCase from "./GetPersonaisWithAlunos";

describe('TEst get personais with alunos use case', () => {
    const personalRepository = new PrismaPersonalRepository;
    const alunoRepository = new PrismaAlunoRepository;

    it('Should get all personais and his alunos', async () => {
        const useCase = new GetPersonaisWithALunosUseCase(
            personalRepository,
            alunoRepository,
            {},
            {},
            () => true
        )

        await useCase.main()
    })
})