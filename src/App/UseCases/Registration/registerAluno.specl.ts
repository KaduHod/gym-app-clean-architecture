import { describe, expect, it } from "vitest";
import RegisterAlunoUseCase from './registerAluno'
import PrismaAlunoRepository from "../../../Infra/Database/Prisma/PrismaAlunoRepository";
import { UserFactory } from "../../../Domain/Factory/UserFactory";


describe('Register Aluno', () => {
    const alunoRepo = new PrismaAlunoRepository;

    it('Should save instance of user without personal', async () => {
        const aluno = UserFactory.createRandom()
        
        const useCase = new RegisterAlunoUseCase(
            alunoRepo,
            aluno
        )
        
        const registrationResult = await useCase.main()
        expect(registrationResult).toBeTruthy()
        expect(registrationResult?.personal_id).toBeFalsy()
    })
})