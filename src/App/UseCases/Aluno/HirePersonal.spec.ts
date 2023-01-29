import { beforeAll, describe, expect, it } from "vitest";
import PrismaAlunoRepository from "../../../Infra/Database/Prisma/PrismaAlunoRepository";
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import HirePersonalUseCase from "./HirePersonal";
import RegisterAlunoUseCase from "../Registration/registerAluno";
import { UserFactory } from "../../../Domain/Factory/UserFactory";
import RegisterPersonalUseCase from "../Registration/registerPersonal";
import GetAlunoUseCase from "./GetAluno";
import GetPersonalUseCase from "../Personal/GetPersonal";
import Aluno from "../../../Domain/Entities/Aluno";
import Personal from "../../../Domain/Entities/Personal";

describe('Teste hire personal use case', async () => {
    const personalRepo = new PrismaPersonalRepository;
    const alunoRepo = new PrismaAlunoRepository;
    const personalRegister = await (
        new RegisterPersonalUseCase(
            personalRepo,
            {...UserFactory.createRandom(), password:'219834361'}
        ).main()
    )

    const alunoRegister = await (
        new RegisterAlunoUseCase(
            alunoRepo,
            {...UserFactory.createRandom(), password:'2198321'}
        ).main()
    );

    let aluno:Aluno;
    let personal:Personal;    

    beforeAll(async () => {
        aluno = await (
            new GetAlunoUseCase(
                alunoRepo,
                {where : {id:alunoRegister.id}}
            ).execute()
        ) as Aluno;

        personal = await (
            new GetPersonalUseCase(
                personalRepo,
                {where:{id:personalRegister.id}}
            ).main()
        ) as Personal;
    })   

    it('Should hire personal without erros', async () => {
        if(!aluno.id) throw new Error('Aluno not created for test hire personal');
        if(!personal.id) throw new Error('Personal not created for test hire personal');

        const useCase = new HirePersonalUseCase(
            personalRepo,
            alunoRepo,
            aluno.id,
            personal.id
        );

        const result = await useCase.main()

        expect(result).toBeTruthy()
        expect(result.personal_id).toEqual(personal.id)
        expect(result.aluno_id).toEqual(aluno.id)
    })

    it('Should throw error when aluno already has personal', async () => {
        const alunoIdWithPersonal = 101;

        const useCase = new HirePersonalUseCase(
            personalRepo,
            alunoRepo,
            alunoIdWithPersonal, 
            3
        )

        const result = useCase.main()

        await expect(result).rejects.toThrow('Aluno already has personal!')
    })
})