import { describe, expect, it } from "vitest";
import Aluno from "../../../Domain/Entities/Aluno";
import {AlunoFactory} from '../../../Domain/Factory/AlunoFactory'
import MysqlUserRepository from '../../../Infra/Database/Mysql/UserRepository'
import MysqlPersonalRepository from '../../../Infra/Database/Mysql/PersonalRepository'
import MysqlAlunoRepository from "../../../Infra/Database/Mysql/AlunoRepository";
import UserNotFound from '../Errors/UserNotFound'
import PersonalNotFoundError from "../Errors/PersonalNotFound";
import RegisterAluno from '../../UseCases/Registration/registerAluno'


describe('Register Aluno', () => {
    const userRepo = new MysqlUserRepository;
    const personalRepo = new MysqlPersonalRepository;
    const alunoRepo = new MysqlAlunoRepository;

    it('Should create instance of aluno without personal', async () => {
        const user = await userRepo.findByPK(2)
        if(!user || !user.id) throw new UserNotFound()
        
        const aluno = AlunoFactory.create({user_id:user.id})
        expect(aluno).toBeInstanceOf(Aluno)
    })

    it('Should save instance of user without personal', async () => {
        const user = await userRepo.findByPK(2)
        if(!user || !user.id) throw new UserNotFound()
        
        const useCase = new RegisterAluno(
            alunoRepo,
            userRepo,
            {user_id:user.id}
        )
        const registrationResult = await useCase.main()
        expect(registrationResult.length).toBeTruthy()
    })

    it('Shoul create instance of aluno with personal', async () => {
        const user = await userRepo.findByPK(3)
        if(!user || !user.id) throw new UserNotFound()

        const personal = await personalRepo.findByPK(1)
        if(!personal || !personal.id){
            throw new PersonalNotFoundError()
        }

        const aluno = AlunoFactory.create({user_id: user.id, personal_id: personal.id})
        expect(aluno).toBeInstanceOf(Aluno)
    })

    it('Should register aluno with personal', async () => {
        const user = await userRepo.findByPK(2)
        if(!user || !user.id) throw new UserNotFound()

        const personal = await personalRepo.findByPK(3)
        if(!personal || !personal.id) throw new PersonalNotFoundError()
        
        const useCase = new RegisterAluno(
            alunoRepo,
            userRepo,
            {user_id:user.id, personal_id: personal.id}
        )
        const registrationResult = await useCase.main()
        expect(registrationResult.length).toBeTruthy()
    })

})