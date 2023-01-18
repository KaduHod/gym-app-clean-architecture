import { expect, describe, it } from 'vitest'
import User from '../../../Domain/Entities/User';
import { TUser } from "../../../Domain/Entities/Entities";
import { UserFactory } from '../../../Domain/Factory/UserFactory'
import MysqlUserRepository from '../../../Infra/Database/Knex/KnexUserRepository';
import RegisterUserUseCase from './resgiterUser'
import UserPrismaRepository from '../../../Infra/Database/Prisma/PrismaUserRepository';

describe('Use case register user', () => {
    const prismaUserRepo = new UserPrismaRepository()
    it('Should create a instance of user', () => {
        const newUser = UserFactory.createRandom()
        expect(newUser).toBeInstanceOf(User)
    })

    it('Should save user with prisma ORM', async () => {
        const newUser = UserFactory.createRandom()
        const useCase = new RegisterUserUseCase(
            prismaUserRepo,
            {...newUser}
        )
        const resgitrationResult = await useCase.main() 
        expect(resgitrationResult).toBeTruthy()
    })
})