import { beforeAll, describe, expect, it } from "vitest";
import Aluno from "../../../Domain/Entities/Aluno";
import { UserFactory } from "../../../Domain/Factory/UserFactory";
import PrismaAlunoRepository from "../../../Infra/Database/Prisma/PrismaAlunoRepository";
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import PrismaUserRepository from "../../../Infra/Database/Prisma/PrismaUserRepository";
import RegisterAlunoUseCase from "../Registration/registerAluno";
import RegisterUserUseCase from "../Registration/resgiterUser";
import HirePersonalUseCase from "./HirePersonal";
import { Prisma } from "@prisma/client";

describe('Teste hire personal use case', async () => {
    let user:any;
    let aluno:any;
    const personalRepo = new PrismaPersonalRepository;
    const alunoRepo = new PrismaAlunoRepository;
    const userRepo = new PrismaUserRepository;
    beforeAll(async () => {
        user = await (new RegisterUserUseCase(
            userRepo,
            UserFactory.createRandom()
        )).main();
        aluno = await (new RegisterAlunoUseCase(
            alunoRepo,
            {user_id:user.id}
        )).main()
    })   

    it('Should hire personal without erros', async () => {
        if(!aluno.id) throw new Error('User not created for test hire personal');

        const useCase = new HirePersonalUseCase(
            personalRepo,
            alunoRepo,
            aluno.id,
            1
        );

        const result = await useCase.main()

        expect(result.personal_id).toBeTruthy()
    })
})