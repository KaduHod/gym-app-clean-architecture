import { Prisma } from "@prisma/client";
import { rejects } from "assert";
import { describe, expect, it } from "vitest";
import PrismaAlunoRepository from "../../../Infra/Database/Prisma/PrismaAlunoRepository";
import AlunoNotFound from "../Errors/AlunoNotFound";
import GetAlunoUseCase from "./GetAluno";

describe('Test get Aluno use case', () => {
    const alunoRepository = new PrismaAlunoRepository();
    it('Should get aluno by id', async () => {
        const useCase = new GetAlunoUseCase(
            alunoRepository, 
            {
                where:{
                    id:101
                },
                include : {
                    users_permissions : {
                        select : {
                            permission_id:true,
                            permission : {
                                select : {
                                    title:true
                                }
                            }
                        }
                    }
                }
            } as Prisma.usersFindManyArgs
        )
        const result = await useCase.execute()
        expect(result.users_permissions[0].permission_id).toEqual(1)
        expect(result).toBeTruthy()
    })
    it('Should trow error when aluno is not found', async () => {
        const useCase = new GetAlunoUseCase(
            alunoRepository, 
            {
                where:{
                    id:1
                },
                include : {
                    users_permissions : {
                        select : {
                            permission_id:true,
                            permission : {
                                select : {
                                    title:true
                                }
                            }
                        }
                    }
                }
            } as Prisma.usersFindManyArgs
        )
        
        await expect(useCase.execute()).rejects.toThrow('Aluno not found!');
        
    })
})