import { describe, expect, it } from "vitest";
import HirePersonal from './HirePersonal'
import MysqlPersonalRepository from '../../../Infra/Database/Mysql/PersonalRepository'
import MysqlAlunoRepository from '../../../Infra/Database/Mysql/AlunoRepository'


describe('Hire Personal test', () => {
    const alunoRepo = new MysqlAlunoRepository;
    const personalRepo = new MysqlPersonalRepository;

    it('Should hire personal to aluno', async () => { 
        const hirePersonalUseCase = new HirePersonal(
            personalRepo, 
            alunoRepo, 
            await alunoRepo.getAlunowithoutPersonal (), 
            4
        )
        const hireResult = await hirePersonalUseCase.main()
        expect(hireResult).toBeTruthy()
     })
 
    it('Should thow error when personal doesnt exists', async () => {
        const hirePersonalUseCase = new HirePersonal(
            personalRepo, 
            alunoRepo, 
            await alunoRepo.getAlunowithoutPersonal (), 
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
            4, 
            4
        )
        const hireResult = hirePersonalUseCase.main()
        await expect(hireResult).rejects.toThrow('Aluno already has personal!')
    })
    
})