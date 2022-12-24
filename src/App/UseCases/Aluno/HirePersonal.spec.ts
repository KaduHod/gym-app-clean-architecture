import { describe, expect, it } from "vitest";
import HirePersonal from './HirePersonal'
import MysqlPersonalRepository from '../../../Infra/Database/Mysql/PersonalRepository'
import MysqlAlunoRepository from '../../../Infra/Database/Mysql/AlunoRepository'

describe('Hire Personal test', () => {
    const alunoRepo = new MysqlAlunoRepository;
    const personalRepo = new MysqlPersonalRepository;

    it('Should hire personal to aluno', async () => {
        const hirePersonalUseCase = new HirePersonal(
            personalRepo, alunoRepo, 4, 4
        )
        const hireResult = await hirePersonalUseCase.main()
        expect(hireResult).toBeTruthy()
    })
    
})