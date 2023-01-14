import { describe, expect, it } from "vitest";
import Aluno from "../../../Domain/Entities/Aluno";
import {AlunoFactory} from '../../../Domain/Factory/AlunoFactory'
import MysqlUserRepository from '../../../Infra/Database/Knex/KnexUserRepository'
import MysqlPersonalRepository from '../../../Infra/Database/Knex/KnexPersonalRepository'
import MysqlAlunoRepository from "../../../Infra/Database/Knex/KnexAlunoRepository";
import UserNotFound from '../Errors/UserNotFound'
import PersonalNotFoundError from "../Errors/PersonalNotFound";
import RegisterAlunoUseCase from './registerAluno'
import PrismaUserRepository from "../../../Infra/Database/Prisma/PrismaUserRepository";
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import PrismaAlunoRepository from "../../../Infra/Database/Prisma/PrismaAlunoRepository";


describe('Register Aluno', () => {
    const userRepo = new PrismaUserRepository;
    const personalRepo = new PrismaPersonalRepository;
    const alunoRepo = new PrismaAlunoRepository;

    it('Should create instance of aluno without personal', async () => {
        const user = await userRepo.findByPK(2)
        if(!user || !user.id) throw new UserNotFound()
        
        const aluno = AlunoFactory.create({user_id:user.id})
        expect(aluno).toBeInstanceOf(Aluno)
    })

    it('Should save instance of user without personal', async () => {
        const user = await userRepo.findByPK(2)
        if(!user || !user.id) throw new UserNotFound()
        
        const useCase = new RegisterAlunoUseCase(
            alunoRepo,
            {user_id:user.id}
        )
        const registrationResult = await useCase.main()
        expect(registrationResult).toBeTruthy()
        expect(registrationResult?.personal_id).toBeFalsy()
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
        
        const useCase = new RegisterAlunoUseCase(
            alunoRepo,
            {user_id:user.id, personal_id: personal.id}
        )
        const registrationResult = await useCase.main()
        
        expect(registrationResult).toBeTruthy()
        expect(registrationResult?.personal_id).toBeTruthy()
    })

})