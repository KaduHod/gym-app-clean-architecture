import { describe, expect, it } from "vitest";
import Personal from "../../../Domain/Entities/Personal";
import { PersonalFactory } from '../../../Domain/Factory/PersonalFactory'
import MysqlUserRepository from '../../../Infra/Database/Knex/KnexUserRepository';
import MysqlPersonalRepository from '../../../Infra/Database/Knex/KnexPersonalRepository'
import RegisterPersonal from './registerPersonal'
import UserNotFound from '../Errors/UserNotFound'
import PrismaUserRepository from "../../../Infra/Database/Prisma/PrismaUserRepository";
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import User from "../../../Domain/Entities/User";

describe('Register personal', () => {
    const userRepo = new PrismaUserRepository;
    const personalRepo = new PrismaPersonalRepository;

    it('Should create instance of personal', async () => {
        const user = await userRepo.findBy({where:{id:1}}, true) as User;
        if(!user || !user?.id) throw new UserNotFound()
        const personal = PersonalFactory.create({user_id:user.id})
        expect(personal).toBeInstanceOf(Personal)
    })

    it('Should save personal', async () => {
        const user = await userRepo.findBy({where:{id:1}}, true) as User;
        if(!user || !user?.id) throw new UserNotFound()
        
        const useCase = new RegisterPersonal(
            personalRepo,
            userRepo,
            {user_id:user.id}
        )
        const registrationResult = await useCase.main() 
        expect(registrationResult).toBeTruthy()
    })

    it('Should throw error when user not found', async () => {        
        const useCase = new RegisterPersonal(
            personalRepo,
            userRepo,
            {user_id:213423}
        )
        const registrationResult = useCase.main() 
        await expect(registrationResult).rejects.toThrow('User not found!')
    })
})