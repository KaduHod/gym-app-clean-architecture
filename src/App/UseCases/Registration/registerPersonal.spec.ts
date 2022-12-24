import { describe, expect, it } from "vitest";
import Personal from "../../../Domain/Entities/Personal";
import { PersonalFactory } from '../../../Domain/Factory/PersonalFactory'
import MysqlUserRepository from '../../../Infra/Database/Mysql/UserRepository';
import MysqlPersonalRepository from '../../../Infra/Database/Mysql/PersonalRepository'
import RegisterPersonal from '../../UseCases/Registration/registerPersonal'
import UserNotFound from '../Errors/UserNotFound'

describe('Register personal', () => {
    const userRepo = new MysqlUserRepository;

    it('Should create instance of personal', async () => {
        const [{id}] = await userRepo.findBy({id:1})
        if(!id) throw new UserNotFound()
        
        const personal = PersonalFactory.create({user_id:id})
        expect(personal).toBeInstanceOf(Personal)
    })
    it('Should save personal', async () => {
        const [{id}] = await userRepo.findBy({id:1})
        if(!id) throw new UserNotFound()
        
        const useCase = new RegisterPersonal(
            new MysqlPersonalRepository,
            {user_id:id}
        )
        const registrationResult = await useCase.main() 
        expect(registrationResult.length).toBeTruthy()
    })
})