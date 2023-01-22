import { describe, expect, it } from "vitest";
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import GetPersonalUseCase  from './GetPersonal'
import {Prisma} from '@prisma/client'

describe('Should test get Personal test', async () => {
    const repo = new PrismaPersonalRepository;
    it('Should get personal', async () => {
        const result = await (
            new GetPersonalUseCase(
                repo,
                {
                    include:{
                        users_permissions : {
                            include : {
                                permission : true
                            }
                        }
                    },
                    where: {
                        id:23
                    }
                } as Prisma.usersFindManyArgs
            ).main()
        )

        expect(result).toBeTruthy();

        const check = result
                        .users_permissions
                        .filter((permission:any) =>  permission.permission_id = 2);

        expect(check).toBeTruthy();
    })

    it('Should get personal and alunos', async () => {
        const result = await (
            new GetPersonalUseCase(
                repo,
                {
                    where: {
                        id: 1
                    },
                    select: {
                        name:true,
                        id:true,
                        alunos: {
                            select: {
                                aluno: {
                                    select: {
                                        id:true, name:true
                                    } as Prisma.usersSelect
                                } as Prisma.usersArgs
                            } as Prisma.personal_alunoSelect
                        } as Prisma.users$alunosArgs
                    } as Prisma.usersSelect
                } as Prisma.usersFindManyArgs
            ).main()
        )

        expect(result.alunos.length).toBeTruthy()
    })
})