import { describe, expect, it } from "vitest";
import MysqlPersonalRepository from '../../../Infra/Database/Knex/KnexPersonalRepository'
import MysqlAlunoRepository from "../../../Infra/Database/Knex/KnexAlunoRepository";
import HirePersonal from '../Aluno/HirePersonal'
import AttachAluno from './attachAluno'

describe('Attach personal', async () => {
    const personalRepo = new MysqlPersonalRepository;
    const alunoRepo = new MysqlAlunoRepository;
    const alunoWithoutPersonal = await alunoRepo.getAlunowithoutPersonal()
    const alunoWithoutPersonal2 = alunoWithoutPersonal + 1
    const alunoWithoutPersonal3 = alunoWithoutPersonal + 2
    const alunoWithoutPersonal4 = alunoWithoutPersonal + 3
    
   
    it('Should attach personal to aluno', async () => {
        const attachUseCase = new AttachAluno(
            alunoRepo,
            personalRepo,
            1,
            alunoWithoutPersonal
        )
        
        const attachResult = await attachUseCase.main()

        expect(attachResult).toBeTruthy()
    })

    it('Should throw error when personal doenst exists', async () => {
        
        const attachUseCase = new AttachAluno(
            alunoRepo,
            personalRepo,
            21372184378,
            alunoWithoutPersonal2
        )
        const attachResult = attachUseCase.main()

        await expect(attachResult).rejects.toThrow('Personal not found!')
    })
 
    it('Should throw error when aluno doesnt exists', async () => {
        const attachUseCase = new AttachAluno(
            alunoRepo,
            personalRepo,
            3,
            2131241412
        )
        const attachResult = attachUseCase.main()

        await expect(attachResult).rejects.toThrow('Aluno not found!')
    })

    it('Should hire personal to aluno', async () => { 
        const hirePersonalUseCase = new HirePersonal(
            personalRepo, 
            alunoRepo, 
            alunoWithoutPersonal3, 
            4
        )

        const hireResult = await hirePersonalUseCase.main()
        expect(hireResult).toBeTruthy()
     })
 
    it('Should thow error when personal doesnt exists', async () => {
        const hirePersonalUseCase = new HirePersonal(
            personalRepo, 
            alunoRepo, 
            alunoWithoutPersonal4, 
            43243
        )
        const hireResult = hirePersonalUseCase.main()
        await expect(hireResult).rejects.toThrow('Personal not found!')
    })
 
    it('Should throw error when aluno doesnt exists', async () => {
        const hirePersonalUseCase = new HirePersonal(
            personalRepo, 
            alunoRepo, 
            41323, 
            4
        )
        const hireResult = hirePersonalUseCase.main()
        await expect(hireResult).rejects.toThrow('Record not found!')
    })

    it('Should throw error when aluno already has personal', async () => {
        const hirePersonalUseCase = new HirePersonal(
            personalRepo, 
            alunoRepo, 
            1, 
            4
        )
        const hireResult = hirePersonalUseCase.main()
        await expect(hireResult).rejects.toThrow('Aluno already has personal!')
    })
})