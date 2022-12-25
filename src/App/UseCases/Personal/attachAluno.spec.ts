import { describe, expect, it } from "vitest";
import MysqlPersonalRepository from '../../../Infra/Database/Mysql/PersonalRepository'
import MysqlAlunoRepository from "../../../Infra/Database/Mysql/AlunoRepository";
import AttachAluno from './attachAluno'

describe('Attach personal', () => {
    const personalRepo = new MysqlPersonalRepository;
    const alunoRepo = new MysqlAlunoRepository;

    it('Should attach personal to aluno', async () => {
        const attachUseCase = new AttachAluno(
            alunoRepo,
            personalRepo,
            1,
            await alunoRepo.getAlunowithoutPersonal()
        )

        const attachResult = await attachUseCase.main()

        expect(attachResult).toBeTruthy()
    })

    it('Should throw error when personal doenst exists', async () => {
        const attachUseCase = new AttachAluno(
            alunoRepo,
            personalRepo,
            21372184378,
            await alunoRepo.getAlunowithoutPersonal()
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
})