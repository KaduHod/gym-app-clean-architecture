import { Prisma } from "@prisma/client";
import { describe, expect, it } from "vitest";
import PrismaAlunoRepository from "../../../Infra/Database/Prisma/PrismaAlunoRepository";
import GetAlunosUseCase from "./GetAlunos";

describe('Should teste get Alunos use case', () => {
    const alunoRepository = new PrismaAlunoRepository;
    it('Should get all alunos', async () => {
        const alunos = await (
            new GetAlunosUseCase(
                alunoRepository,
                {
                    include : {
                        users_permissions : {
                            include : {
                                permission : true
                            } as Prisma.users_permissionsInclude
                        } as Prisma.users$users_permissionsArgs
                    } as Prisma.usersInclude
                } as Prisma.usersFindManyArgs
            ).execute()
        )

        for (const aluno of alunos)
        {
            const check = aluno
                            .users_permissions
                            .find((permission:any) => permission.permission_id === 1 && permission.ppermission.title === 'aluno')
            if(!check) throw new Error('Prisma repository bring user that is not aluno')
        }

        expect(alunos).toBeTruthy()
    })
})