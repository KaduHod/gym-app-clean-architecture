import { Prisma, users } from "@prisma/client";
import { describe, expect, it } from "vitest";
import PrismaAlunoRepository from "./PrismaAlunoRepository";
import { UserFactory } from "../../../Domain/Factory/UserFactory";

describe('Testing PrismaAlunoRepository', () => {
    const alunoRepository = new PrismaAlunoRepository;
    it('Should get all alunos', async () => {
        const alunos = await alunoRepository.findAll({
            include : {
                users_permissions : {
                    include : {
                        permission : true
                    } as Prisma.users_permissionsInclude
                } as Prisma.users$users_permissionsArgs
            } as Prisma.usersInclude 
        } as Prisma.usersFindManyArgs) as any ;

        for(const aluno of alunos)
        {
            const check = aluno.users_permissions.find((permission:any) => {
                return permission.permission_id === 1 && permission.permission.title === 'aluno'
            })
            if(!check){
                console.error({aluno})
                throw new Error('Repository bring aluno without permission of aluno')
            }  
        }
        expect(alunos).toBeTruthy()
    })
    it('Should get all alunos by stats', async () => {
        const aluno = await alunoRepository.findBy({
            include : {
                users_permissions : {
                    include : {
                        permission : true
                    } as Prisma.users_permissionsInclude
                } as Prisma.users$users_permissionsArgs
            } as Prisma.usersInclude,
            where : {
                name : 'Carlos',
                nickname : 'KaduHod2'
            } as Prisma.usersWhereInput
        } as Prisma.usersFindManyArgs, true) as any ;

        const check = aluno.users_permissions.find((permission:any) => {
            return permission.permission_id === 1 && permission.permission.title === 'aluno'
        })

        if(!check){
            console.error({aluno})
            throw new Error('Repository bring aluno without permission of aluno')
        }  
        
        expect(aluno).toBeTruthy()
    })

    it('Should create aluno', async () => {
        const user = UserFactory.createRandom();
        const saveQuery = await alunoRepository.save(user as Prisma.usersCreateInput) as any;
        const check = saveQuery.users_permissions.find((permission:any) => permission.permission_id === 1)
        expect(check).toBeTruthy()
    })

    it('Should  hire personal', async () => {
        const result = await alunoRepository.hirePersonal(101, 99)
        expect(result.aluno_id).toEqual(99)
        expect(result.personal_id).toEqual(101)
    })
})