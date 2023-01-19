import { Prisma } from "@prisma/client";
import { describe, expect, it } from "vitest";
import User from "../../../Domain/Entities/User";

import { UserFactory } from "../../../Domain/Factory/UserFactory";
import PrismaAlunoRepository from "../../../Infra/Database/Prisma/PrismaAlunoRepository";
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import HirePersonal from '../Aluno/HirePersonal'
import AttachAluno from './attachAluno'

describe('Attach personal', async () => {
    const personalRepo = new PrismaPersonalRepository;
    const alunoRepo = new PrismaAlunoRepository;
    // const alunoWithoutPersonal = await alunoRepo.getAlunowithoutPersonal()
    // const alunoWithoutPersonal2 = alunoWithoutPersonal + 1
    // const alunoWithoutPersonal3 = alunoWithoutPersonal + 2
    // const alunoWithoutPersonal4 = alunoWithoutPersonal + 3

    const alunosAttrs:User[] = []
    while(alunosAttrs.length < 4)
    {
        alunosAttrs.push(UserFactory.createRandom())
    }

    const alunos = await Promise.all(
        alunosAttrs.map( aluno => alunoRepo.save(aluno as Prisma.usersCreateInput) )
    );
    
    it('Should attach personal to aluno', async () => {
        if(!alunos[0] || !alunos[0].id) throw new Error('Error creating testing alunos')

        const attachUseCase = new AttachAluno(
            alunoRepo,
            personalRepo,
            3,
            alunos[0].id
        )
        
        const attachResult = await attachUseCase.main()

        expect(attachResult).toBeTruthy()
    })

    // it('Should throw error when personal doenst exists', async () => {
        // 
        // const attachUseCase = new AttachAluno(
            // alunoRepo,
            // personalRepo,
            // 21372184378,
            // alunoWithoutPersonal2
        // )
        // const attachResult = attachUseCase.main()
// 
        // await expect(attachResult).rejects.toThrow('Personal not found!')
    // })
//  
    // it('Should throw error when aluno doesnt exists', async () => {
        // const attachUseCase = new AttachAluno(
            // alunoRepo,
            // personalRepo,
            // 3,
            // 2131241412
        // )
        // const attachResult = attachUseCase.main()
// 
        // await expect(attachResult).rejects.toThrow('Aluno not found!')
    // })
// 
    // it('Should hire personal to aluno', async () => { 
        // const hirePersonalUseCase = new HirePersonal(
            // personalRepo, 
            // alunoRepo, 
            // alunoWithoutPersonal3, 
            // 4
        // )
// 
        // const hireResult = await hirePersonalUseCase.main()
        // expect(hireResult).toBeTruthy()
    //  })
//  
    // it('Should thow error when personal doesnt exists', async () => {
        // const hirePersonalUseCase = new HirePersonal(
            // personalRepo, 
            // alunoRepo, 
            // alunoWithoutPersonal4, 
            // 43243
        // )
        // const hireResult = hirePersonalUseCase.main()
        // await expect(hireResult).rejects.toThrow('Personal not found!')
    // })
//  
    // it('Should throw error when aluno doesnt exists', async () => {
        // const hirePersonalUseCase = new HirePersonal(
            // personalRepo, 
            // alunoRepo, 
            // 41323, 
            // 4
        // )
        // const hireResult = hirePersonalUseCase.main()
        // await expect(hireResult).rejects.toThrow('Record not found!')
    // })
// 
    // it('Should throw error when aluno already has personal', async () => {
        // const hirePersonalUseCase = new HirePersonal(
            // personalRepo, 
            // alunoRepo, 
            // 1, 
            // 4
        // )
        // const hireResult = hirePersonalUseCase.main()
        // await expect(hireResult).rejects.toThrow('Aluno already has personal!')
    // })
})